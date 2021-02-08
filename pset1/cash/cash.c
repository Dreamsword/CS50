#include <stdio.h>
#include <cs50.h>
#include <math.h>

int main(void)
{
    float cash;

    do
    {
        // Get change owed from user
        cash = get_float("Change owed: ");
    }
    while (cash < 0);

    // convert the dollar amount to cents
    int cents = round(cash * 100);
    int coins = 0;

    // check the amount of coins needed from the denomination 25, 10, 5, 1
    while (cents >= 25)
    {
        coins++;
        cents -= 25;
    }

    while (cents >= 10)
    {
        coins++;
        cents -= 10;
    }

    while (cents >= 5)
    {
        coins++;
        cents -= 5;
    }

    while (cents >= 1)
    {
        coins++;
        cents -= 1;
    }

    // show the amount of coins needed
    printf("%i", coins);
}