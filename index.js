// All required functions here:

const inquirer = require("inquirer")
const axios = require("axios");
const fs = require("fs")
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
require("dotenv").config();

// use inquirer to write prompts for username and fav color
inquirer
    .prompt([
        {
            type: "input",
            message: "What is your Github username?",
            name: "name"
        },
        {
            type: "list",
            message: "What is your favorite color?",
            name: "color",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ]
        }
        // using the data from inquirer, pass that through a new function
    ]).then(function ({ name, color }) {
        // create queryUrl for axios call
        const queryUrl = `https://api.github.com/users/${name}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
        // axios call
        axios
            .get(queryUrl)
            .then(function (res) {
                // console.log(res.data)

                // create object with all needed variables for user data, including color choice from inquirer
                const userProfile = {
                    colorChoice: color,
                    userImage: res.data.avatar_url,
                    name: res.data.name,
                    userLocation: res.data.location,
                    gitHubProfile: res.data.html_url,
                    blog: res.data.blog,
                    bio: res.data.bio,
                    publicRepos: res.data.public_repos,
                    followers: res.data.followers,
                    stars: res.data.starred_url.length,
                    following: res.data.following
                }
                    // Use userProfile to populate variables in the html
                    .then(function ({ userProfile }) {
                        const html = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <title>Document</title>
                                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                            </head>
                            <body>
                            <div class="container">
                                <div class="jumbotron">
                                    <h1 class="display-4">${userProfile.name}</h1>
                                    <p class="lead">${userProfile.userLocation}</p>
                                    <hr class="my-4">
                                    <p>${userProfile.bio}</p>
                                    <a class="btn btn-primary btn-lg" href="#" role="button">${userProfile.blog}</a>
                                    <a class="btn btn-primary btn-lg" href="#" role="button">${userProfile.followers}</a>
                                </div>
                            </div>
                            </body>
                            </html>`
                        writeFileAsync("index.html", html).then(function () {
                            console.log("Successfully wrote to index.html file");
                        });

                    })
            })


    })








