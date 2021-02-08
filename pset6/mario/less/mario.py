from cs50 import get_int

# get height from user
height = get_int("Height: ")

# make sure height is positive and not more than 8
while height < 1 or height > 8:
    height = get_int("Height: ")
else:
    i = 1
    for i in range(height):
        print((height - 1 - i) * " ", end="")
        print((i + 1) * "#")
