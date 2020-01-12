const inquirer = require("inquirer")
const axios = require("axios");
const generateHTML = require("./generateHTML")

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
            name: "colors",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ]
        }
    ]).then(function ({ name }) {
        const queryUrl = `https://api.github.com/users/${name}`;

        axios
            .get(queryUrl)
            .then(function (res) {

                const userProfile = {
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
                console.log(userProfile)
                // generateHTML();


            })
    })


// function writeToFile(fileName, data) {

// }

// function init() {
// }
// init();

