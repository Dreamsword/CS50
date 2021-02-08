#include <stdio.h>
#include <cs50.h>

void print(char charecter, int number);

int main(void)
{
    int height;

    do
    {
        // Waits for user to input number
        height = get_int("Height: ");
    }
    // Keep asking till a number is entered between 1 and 8 inclusive
    while (height < 1 || height > 8);

    for (int i = 0; i < height; i++)
    {
        // prints the spaces at beginning dependant on size
        print(' ', height - 1 - i);
        // print the first piramid
        print('#', i + 1);
        // print the middle gap
        print(' ', 2);
        // print the right piramid
        print('#', i + 1);
        printf("\n");
    }
}

void print(char charecter, int number)
{
    for (int j = 0; j < number; j++)
    {
        printf("%c", charecter);
    }
}