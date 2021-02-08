#include <stdio.h>
#include <cs50.h>
#include <math.h>
#include <ctype.h>

int count_letters(string text);
int count_words(string text);
int count_sentences(string text);
// Send the letter, word and sentence count to grade the level of text
void grade_level(int letters, int words, int sentences);

int main(void)
{
    // Get text from user
    string text = get_string("Text: ");

    int letters = count_letters(text);
    int words = count_words(text) + 1;
    int sentences = count_sentences(text);
    grade_level(letters, words, sentences);
}

int count_letters(string text)
{
    int letters = 0;
    int i = 0;
    // Count number of characters up until '\0'
    while (text[i] != '\0')
    {
        // count letters
        if (isalpha(text[i]))
        {
            letters++;
        }

        i++;
    }
    return letters;
}

int count_words(string text)
{
    int words = 0;
    int i = 0;
    // Count number of characters up until '\0'
    while (text[i] != '\0')
    {
        // Count words
        if (isblank(text[i]))
        {
            words++;
        }

        i++;
    }
    return words;
}

int count_sentences(string text)
{
    int sentences = 0;
    int i = 0;
    // Count number of characters up until '\0'
    while (text[i] != '\0')
    {
        // Count sentences ending in (?, ! & .)
        if (text[i] == 63 || text[i] == 33 || text[i] == 46)
        {
            sentences++;
        }

        i++;
    }
    return sentences;
}

void grade_level(int letters, int words, int sentences)
{
    // Get the average number of letters per 100 words in the text
    float L = ((float) letters / (float) words) * 100;
    // Get the average number of sentences per 100 words in the text.
    float S = ((float) sentences / (float) words) * 100;
    // Coleman-Liau index
    int index = round(0.0588 * L - 0.296 * S - 15.8);

    if (index < 1)
    {
        printf("Before Grade 1\n");
    }
    else if (index >= 16)
    {
        printf("Grade 16+\n");
    }
    else
    {
        printf("Grade %i\n", index);
    }

}