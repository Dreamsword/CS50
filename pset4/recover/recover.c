#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

typedef uint8_t BYTE;

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        fprintf(stderr, "Usage: ./recover image\n");
        return 1;
    }

    // Filename
    char *file = argv[1];

    // Open the file
    FILE *raw_data = fopen(file, "r");

    if (raw_data == NULL)
    {
        fprintf(stderr, "Could not open %s.\n", file);
        return 1;
    }

    // Create buffer array
    BYTE buffer[512];

    // Start filename counter
    int counter = 0;

    //Create image pointer
    FILE *img;

    // Check if we've found a jpeg yet or not
    int jpg_found = 0;

    // Store the image name
    char filename[8];

    while (fread(buffer, sizeof(buffer), 1, raw_data) == 1)
    {
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            if (jpg_found == 1)
            {
                fclose(img);
            }
            else
            {
                jpg_found = 1;
            }

            // Set the filename
            sprintf(filename, "%03i.jpg", counter++);

            // Open new file
            img = fopen(filename, "w");

            if (img == NULL)
            {
                return 1;
            }

            // Write the file
            fwrite(buffer, sizeof(buffer), 1, img);
        }
        else if (jpg_found)
        {
            fwrite(buffer, sizeof(buffer), 1, img);
        }
    }

    fclose(img);
    fclose(raw_data);

    //success
    return 0;
}
