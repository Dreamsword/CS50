// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#include "dictionary.h"

#define HASHTABLE_SIZE 1000

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Set the size of the Hashtable.
node *hashtable[HASHTABLE_SIZE];

unsigned int num_words = 0;
bool loaded_dict = false;

// Hashes word to a number
unsigned int hash(const char *word)
{
    int hash = 0;
    int n;
    // Assign each letter a number.
    for (int i = 0; word[i] != '\0'; i++)
    {
        if (isalpha(word[i]))
        {
            n = word[i] - 'a' + 1;
        }
        else
        {
            n = 27;
        }

        hash = ((hash << 3) + n) % HASHTABLE_SIZE;
    }
    return hash;
}

// Returns true if word is in dictionary else false
bool check(const char *word)
{
    char check_word[strlen(word)];
    strcpy(check_word, word);
    // Check each letter in the word and make it lowercase
    for (int i = 0; check_word[i] != '\0'; i++)
    {
        check_word[i] = tolower(check_word[i]);
    }

    int index = hash(check_word);
    // The word is in the table, compare it with the one that was typed
    if (hashtable[index] != NULL)
    {
        for (node *nodeptr = hashtable[index]; nodeptr != NULL; nodeptr = nodeptr->next)
        {
            if (strcmp(nodeptr->word, check_word) == 0)
            {
                return true;
            }
        }
    }
    return false;
}

// Loads dictionary into memory, returning true if successful else false
bool load(const char *dictionary)
{
    FILE *infile = fopen(dictionary, "r");
    // The file is empty, fail.
    if (infile == NULL)
    {
        return false;
    }

    for (int i = 0; i < HASHTABLE_SIZE; i++)
    {
        hashtable[i] = NULL;
    }

    char word[LENGTH + 1];
    node *new_nodeptr;
    // Take each word and load it into memory
    while (fscanf(infile, "%s", word) != EOF)
    {
        num_words++;
        do
        {
            new_nodeptr = malloc(sizeof(node));
            if (new_nodeptr == NULL)
            {
                free(new_nodeptr);
            }
        }
        while (new_nodeptr == NULL);

        // Copy the word into the node;
        strcpy(new_nodeptr->word, word);
        int index = hash(word);
        new_nodeptr->next = hashtable[index];
        hashtable[index] = new_nodeptr;
    }
    fclose(infile);
    loaded_dict = true;

    return true;
}

// Returns number of words in dictionary if loaded else 0 if not yet loaded
unsigned int size(void)
{
    if (!loaded_dict)
    {
        return 0;
    }
    return num_words;
}

// Unloads dictionary from memory, returning true if successful else false
bool unload(void)
{
    // Dictionary not loaded, fail.
    if (!loaded_dict)
    {
        return false;
    }

    // Go through each node an remove it from memory.
    for (int i = 0; i < HASHTABLE_SIZE; i++)
    {
        if (hashtable[i] != NULL)
        {
            node *ptr = hashtable[i];
            while (ptr != NULL)
            {
                node *predptr = ptr;
                ptr = ptr->next;
                free(predptr);
            }
        }
    }
    return true;
}
