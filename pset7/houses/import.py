from cs50 import SQL
from sys import argv
import csv


def main():
    # Check if the file is called correctly
    if len(argv) != 2:
        print("Usage: python import.py characters.csv")
    else:
        data = argv[1]
        # Set connection to database
        db = SQL("sqlite:///students.db")

        # Open CSV file
        with open(data, "r") as people:
            # Create DictReader
            reader = csv.DictReader(people)

            for row in reader:
                house = row["house"]
                birth = row["birth"]
                name_list = row["name"].split()
                if len(name_list) == 3:
                    firstname = name_list[0]
                    middle_name = name_list[1]
                    lastname = name_list[2]
                else:
                    firstname = name_list[0]
                    middle_name = 'NULL'
                    lastname = name_list[1]

                # Insert Rows
                if middle_name == 'NULL':
                    db.execute("INSERT INTO students (first, middle, last, house, birth) VALUES(?, ?, ?, ?, ?)",
                               firstname, None, lastname, house, birth)
                else:
                    db.execute("INSERT INTO students (first, middle, last, house, birth) VALUES(?, ?, ?, ?, ?)",
                               firstname, middle_name, lastname, house, birth)


main()
