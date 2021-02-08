from cs50 import SQL
from sys import argv


def main():
    # Check if the file is called correctly
    if len(argv) != 2:
        print("Usage: python roster.py house")
    else:
        house = argv[1]
        # Set connection to database
        db = SQL("sqlite:///students.db")

        result = db.execute("SELECT * FROM students WHERE house = ? ORDER BY last, first", house)

        # Format result for display
        for row in result:
            if row["middle"] == None:
                print(f"{row['first']} {row['last']}, born {row['birth']}", sep=",")
            else:
                print(f"{row['first']} {row['middle']} {row['last']}, born {row['birth']}", sep=",")


main()
