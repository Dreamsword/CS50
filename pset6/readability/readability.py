from cs50 import get_string


def main():
    # Get text from user
    text = get_string("Text: ")

    letters = count_letters(text)
    words = count_words(text) + 1
    sentences = count_sentences(text)
    grade_level(letters, words, sentences)


def count_letters(text):
    letters = 0
    i = 0
    # Count number of characters
    while (i < len(text)):
        # count letters
        if text[i].isalpha():
            letters += 1
        i += 1
    return letters


def count_words(text):
    words = 0
    i = 0
    # Count number of characters
    while (i < len(text)):
        # Count words
        if text[i].isspace():
            words += 1
        i += 1
    return words


def count_sentences(text):
    sentences = 0
    i = 0
    # Count number of characters
    while (i < len(text)):
        # Count sentences ending in (?, ! & .)
        if text[i] == '?' or text[i] == '!' or text[i] == '.':
            sentences += 1
        i += 1
    return sentences


def grade_level(letters, words, sentences):
    # Get the average number of letters per 100 words in the text
    L = letters / words * 100
    # Get the average number of sentences per 100 words in the text.
    S = sentences / words * 100
    # Coleman-Liau index
    index = round(0.0588 * L - 0.296 * S - 15.8)

    if index < 1:
        print("Before Grade 1")
    elif index >= 16:
        print("Grade 16+")
    else:
        print(f"Grade {index}")


main()