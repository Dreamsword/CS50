from cs50 import get_float

cash = get_float("Change owed: ")

while cash < 0:
    cash = get_float("Change owed: ")
else:
    #convert the dollar amount to cents
    cents = round(cash * 100);
    coins = 0;

    # check the amount of coins needed from the denomination 25, 10, 5, 1
    while cents >= 25:
        coins += 1
        cents -= 25

    while cents >= 10:
        coins += 1
        cents -= 10

    while cents >= 5:
        coins += 1
        cents -= 5

    while cents >= 1:
        coins += 1
        cents -= 1

    #show the amount of coins needed
    print(coins);