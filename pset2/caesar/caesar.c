#include <stdio.h>
#include <cs50.h>
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

bool valid_key(string key);
string encrypted_message(string text, string argv);

int main(int argc, string argv[])
{
    // Check if command line input is not more than 2 and int's only
    if (argc == 2 && valid_key(argv[1]))
    {
        // Get text to encrypt
        string plaintext = get_string("plaintext: ");
        // Send text to be encrypted
        string ciphertext = encrypted_message(plaintext, argv[1]);
        printf("ciphertext: %s\n", ciphertext);
    }
    else
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }
}

bool valid_key(string key)
{
    for (int i = 0, len = strlen(key); i < len; i++)
    {
        // If not just numbers, fail
        if (!isdigit(key[i]))
        {
            return false;
        }
    }
    return true;
}

string encrypted_message(string text, string argv)
{
    int key = atoi(argv);
    int c = 0;
    for (int i = 0, len = strlen(text); i < len; i++)
    {
        // Only encrypt letters, not punctuation
        if (islower(text[i]))
        {
            // Take the ascii of the char minus the first small letter,
            // do the conversion and add it back to retain the case
            c = (text[i] - 97 + key) % 26 + 97;
            text[i] = c;
        }
        else if (isupper(text[i]))
        {
            // Take the ascii of the char minus the first small letter,
            // do the conversion and add it back to retain the case
            c = (text[i] - 65 + key) % 26 + 65;
            text[i] = c;
        }
    }
    return text;
}