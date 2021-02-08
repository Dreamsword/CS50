import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

# Make sure API key is set
if not os.environ.get("API_KEY"):
    raise RuntimeError("API_KEY not set")


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    user_info = db.execute("SELECT cash, username FROM users WHERE id = :id", id=session["user_id"])
    shares = db.execute("SELECT symbol, (SUM(shares) - (SELECT CASE WHEN SUM(shares) IS NOT NULL THEN SUM(shares) ELSE 0 END FROM shares WHERE user_id = :id AND type = :sell)) as total_shares, price FROM shares WHERE user_id = :id AND type = :buy GROUP BY symbol",
                        id=session["user_id"],
                        sell="sell",
                        buy="buy")
    current_price = {}
    username = user_info[0]["username"]
    value = 0

    for share in shares:
        current_price[share["symbol"]] = lookup(share["symbol"])
        current_price[share["price"]] = share["price"]
        value = value + (current_price[share["symbol"]]["price"] * share["total_shares"])

    remaining_cash = user_info[0]["cash"]
    grand_total = float(remaining_cash) + float(value)

    return render_template("index.html", current_price=current_price, shares=shares, remaining_cash=remaining_cash, username=username, grand_total=grand_total)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "GET":
        return render_template("buy.html")
    else:
        price = lookup(request.form.get("symbol"))

        # Check if a valid symbol was entered.
        if not price:
            return apology("Invalid Symbol.", 400)

        # Get available cash from DB.
        cash_result = db.execute("SELECT cash FROM users WHERE id = :id", id=session["user_id"])

        cash = cash_result[0]["cash"]
        price_per_share = price["price"]
        num_shares = request.form.get("shares")

        # Total price of requested shares
        total = float(price_per_share) * float(num_shares)

        if total > cash:
            return apology("Insufficient Funds.")

        # Now save the transaction
        new_cash = cash - total
        db.execute("UPDATE users SET cash = :new WHERE id = :id", new=new_cash, id=session["user_id"])
        db.execute("INSERT INTO shares (symbol, price, user_id, shares) VALUES(:symbol, :price, :id, :shares)",
                   symbol=request.form.get("symbol"),
                   price=price_per_share,
                   id=session["user_id"],
                   shares=num_shares)

        flash("Shares Bought.")
        return redirect("/")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    history = db.execute("SELECT symbol, price, date, shares, type FROM shares WHERE user_id = :id ORDER BY date ASC", id=session["user_id"])

    return render_template("history.html", history=history)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username",
                          username=request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    if request.method == "GET":
        return render_template("quote.html")
    else:
        price = lookup(request.form.get("symbol"))

        # Check if a valid symbol was entered.
        if not price:
            return apology("Invalid Symbol.", 400)

        return render_template("quoted.html", quote=price)


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "GET":
        return render_template("register.html")
    else:
        username = request.form.get("username")
        password = request.form.get("password")
        confirmed = request.form.get("confirmation")

        if not username:
            return apology("You must provide a username.", 403)
        if password != confirmed:
            return apology("Passwords do not match.", 403)

        # Check if usernmae already exists.
        duplicate = db.execute("SELECT * FROM users WHERE username = :username",
                          username=username)
        if duplicate:
            return apology("Username Already Exists.", 403)
        else:
            hash = generate_password_hash(request.form.get("password"))
            db.execute("INSERT INTO users (username, hash) VALUES (:username, :password)", username=username, password=hash)

            # Display success message.
            flash("User Registered.")
            return redirect("/")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    if request.method == "GET":
        shares = db.execute("SELECT symbol, SUM(shares) as total_shares FROM shares where user_id = :id GROUP BY symbol", id=session["user_id"])
        return render_template("sell.html", shares=shares)
    else:
        price = lookup(request.form.get("symbol"))
        symbol = request.form.get("symbol")
        num_shares = int(request.form.get("shares"))

        # Check if a valid symbol was entered.
        if not price:
            return apology("Invalid Symbol.", 400)

        # Validate quantity of shares.
        shares = db.execute("SELECT symbol, (SUM(shares) - (SELECT SUM(shares) from shares where user_id = :id and type = :sell)) as total_shares, price FROM shares where user_id = :id AND type = :buy GROUP BY symbol",
                        id=session["user_id"],
                        sell="sell",
                        buy="buy")

        if len(shares) != 1 or shares[0]["total_shares"] < num_shares :
            return apology("Insufficient Owned Shares", 400)

        total_value = price["price"] * num_shares

        # Remove share from account and credit the available cash
        db.execute("INSERT INTO shares (symbol, price, user_id, shares, type) VALUES(:symbol, :price, :id, :shares, :type)",
                   symbol=request.form.get("symbol"),
                   price=total_value,
                   id=session["user_id"],
                   shares=num_shares,
                   type="sell")
        db.execute("UPDATE users SET cash = cash + :total_value WHERE id = :id", total_value=total_value, id=session["user_id"])

        flash("Shares Sold.")
        return redirect("/")


@app.route("/password", methods=["GET", "POST"])
@login_required
def change_password():
    """Change current password"""
    if request.method == "GET":
        return render_template("password.html")
    else:
        current_password = request.form.get("current_password")

        # Validate current password
        user_hash = db.execute("SELECT hash FROM users WHERE id = :id", id=session["user_id"])
        if not check_password_hash(user_hash[0]["hash"], current_password):
            return apology("Current Password Incorrect", 400)

        new_hash = generate_password_hash(request.form.get("new_password"))
        db.execute("UPDATE users SET hash = :new WHERE id = :id", id=session["user_id"], new=new_hash)

        flash("Password Changed.")

        return redirect("/")

def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
