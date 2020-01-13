# Developer-Profile-Generator

## Desciption
Create a command-line application that dynamically generates a PDF profile from a GitHub username. 

## Goals

When the user types in the following command: "node index.js", the following text appears:
![Alt text](screenshot_1.jpg?raw=true "Terminal Screenshot")

* **Name**  - Asks for the user's GitHub username.
* **Color** - Asks for user's favorite color.

Using that data, the application will then create an HTML page using the color scheme chosen by the user and the following information:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

The HTML file will look like this when finished:

![Alt text](screenshot_2.jpg?raw=true "HTML Screenshot")

## Complications

During the process of making this profile generator application, I did run into some problems: 

* Formatting the HTML correctly - Because the CSS was not written by me, I had to use lots of trial and error to create the HTML. I got close to the example, but was unable to get it completely correct.
* Converting the file from HTML to PDF - I was unable to use electron to correctly convert the file. This will be something I will look to add in the future.

## Credits and Thanks

Since my own GitHub profile was lacking, I decided to use someone else's to test and show as an example. So thanks to Leonid Bugaev for being my model for this project.