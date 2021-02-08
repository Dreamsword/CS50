from sys import argv
import csv
import re


def main():
    # Check if the file is called correctly
    if len(argv) != 3:
        print("Usage: python dna.py data.csv sequence.txt")
    else:
        data = argv[1]
        seq_src = argv[2]

        # Create array to store str count
        index = []
        new = []

        # Open txt file
        with open(seq_src, "r") as sequance:
            dna = sequance.read()

        # Open CSV file
        with open(data, "r") as peopleCSV:
            readCSV = list(csv.reader(peopleCSV, delimiter=','))
            readCSV[0].remove('name')

            # Count STR's in the sequance
            for seq in readCSV[0]:
                longest = max(re.findall('((?:' + re.escape(seq) + ')*)', dna), key=len)
                string = longest.count(seq)
                index.append(string)

            # Check who the dna belongs to
            count = ''.join(str(x) for x in index)
            for rows in readCSV[1:]:
                row = ''.join(rows[1:])
                if row == count:
                    print(rows[0])
                    found = 'true'
                    break
                else:
                    found = 'false'

            if found != 'true':
                print("No Match")


main()