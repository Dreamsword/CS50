#include <stdio.h>
#include <cs50.h>

int main(void)
{
    // Get name from user
    string name = get_string("What is your name?\n");

    // Say hello to user
    printf("hello, %s\n", name);
}