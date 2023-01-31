# Green-Screened
~ By Snehil Kumar

>Key out your green screen  
>Find a Screenshot in ss/ directory

## About this project
This is a static front-end only Web App.  
This app removes a specific color from an image and  
returns a transparent PNG image.  

## Recommended control flow in the App:  
1. Upload an image  
2. Provide a range of colors to remove  
3. Click on the "Edit" button to start  
the legendary process of "Editing"  
4. Now, we can save it to our local machine  
by clicking the Download button.  

## Pre-requisite knowledge
An image consists of pixels.  
Each pixel consists of 4 parts.  

They are, Red, Green, Blue and Alpha (for  
transparency).  

These are the color components of the pixel  
and are represented by numbers from 0 to 255.  

0 means darkest and 255 means lightest color.  

There are other ways to represent colors, like,  
RGBA (Red, Green, Blue ans Alpha),  
HSLA (Hue, Saturation, Lightness, Alpha),  
HEX (Hexadecimal representation), etc.  

## How it works
The web app takes an image as input.  
The web app creates a new empty image of the  
same dimensions.  

The web app also takes a range of numbers  
representing colors as input.  

Then, it iterates over each and every pixel  
of the image.  

In every iteration, it checks for a condition.  
The condition is, if current pixel color value  
is between or not the range of color values  
provided by the user.  

If the current color value is in between the  
provided range, we leave that corresponding spot  
in the blank image.  
Empty image is by default transparent, because  
the color values are all 0.  
Hence, that spot becomes transparent in the  
final image.  

If the current color value is out of the provided  
range, we copy the color values in the original  
image to the newly created image.  
Hence, that spot becomes a duplicate of the oiginal  
image.  

Finally, we get an output image with the spots or  
colors removed for the provided range and rest all  
areas remaining the same.  

## Challenges and Solutions
Pixel Density of different devices are different.  
This posed a problem for me.  
I do not know the exact reason, but things did not  
go as planned.  

The final image came out to be of different dimensions.  
Sometimes, the final image was very light in color.  
Sometimes, the final image consisted of 4 copies of  
the original image.  
That meant a lot of mess.  

Hence, I used a function in p5.JS library to set the  
pixel density of the client to 1, as it was in the  
olden days (20 years back), when there were no High  
Resolution Displays and there were no problems of  
pixel density.  

## Web App is Live!
https://snehil002.github.io/Green-Screened

## Used Skills:
HTML, CSS, JS and p5.js javascript library.

## Bibliography:
The Coding Train YouTube channel:  
https://www.youtube.com/c/TheCodingTrain

p5.js website:  
https://p5js.org/