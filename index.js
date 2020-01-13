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
                // data for each color user can select
                const colors = {
                    green: {
                        wrapperBackground: "#E6E1C3",
                        headerBackground: "#C1C72C",
                        headerColor: "black",
                        photoBorderColor: "#black"
                    },
                    blue: {
                        wrapperBackground: "#5F64D3",
                        headerBackground: "#26175A",
                        headerColor: "white",
                        photoBorderColor: "#73448C"
                    },
                    pink: {
                        wrapperBackground: "#879CDF",
                        headerBackground: "#FF8374",
                        headerColor: "white",
                        photoBorderColor: "#FEE24C"
                    },
                    red: {
                        wrapperBackground: "#DE9967",
                        headerBackground: "#870603",
                        headerColor: "white",
                        photoBorderColor: "white"
                    }
                };
                // Use userProfile to populate variables in the html

                const html = `<!DOCTYPE html>
                <html lang="en">
                   <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                      <title>Document</title>
                      <style>
                          @page {
                            margin: 0;
                          }
                         *,
                         *::after,
                         *::before {
                         box-sizing: border-box;
                         }
                         html, body {
                         padding: 0;
                         margin: 0;
                         }
                         html, body, .wrapper {
                         height: 100%;
                         }
                         .wrapper {
                         background-color: ${colors[userProfile.colorChoice].wrapperBackground};
                         padding-top: 100px;
                         }
                         body {
                         background-color: white;
                         -webkit-print-color-adjust: exact !important;
                         font-family: 'Cabin', sans-serif;
                         }
                         main {
                         background-color: #E9EDEE;
                         height: auto;
                         padding-top: 30px;
                         }
                         h1, h2, h3, h4, h5, h6 {
                         font-family: 'BioRhyme', serif;
                         margin: 0;
                         }
                         h1 {
                         font-size: 3em;
                         }
                         h2 {
                         font-size: 2.5em;
                         }
                         h3 {
                         font-size: 2em;
                         }
                         h4 {
                         font-size: 1.5em;
                         }
                         h5 {
                         font-size: 1.3em;
                         }
                         h6 {
                         font-size: 1.2em;
                         }
                         .photo-header {
                         position: relative;
                         margin: 0 auto;
                         margin-bottom: -50px;
                         display: flex;
                         justify-content: center;
                         flex-wrap: wrap;
                         background-color: ${colors[userProfile.colorChoice].headerBackground};
                         color: ${colors[userProfile.colorChoice].headerColor};
                         padding: 10px;
                         width: 95%;
                         border-radius: 6px;
                         }
                         .photo-header img {
                         width: 250px;
                         height: 250px;
                         border-radius: 50%;
                         object-fit: cover;
                         margin-top: -75px;
                         border: 6px solid ${colors[userProfile.colorChoice].photoBorderColor};
                         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                         }
                         .photo-header h1, .photo-header h2 {
                         width: 100%;
                         text-align: center;
                         }
                         .photo-header h1 {
                         margin-top: 10px;
                         }
                         .links-nav {
                         width: 100%;
                         text-align: center;
                         padding: 20px 0;
                         font-size: 1.1em;
                         }
                         .nav-link {
                         display: inline-block;
                         margin: 5px 10px;
                         }
                         .workExp-date {
                         font-style: italic;
                         font-size: .7em;
                         text-align: right;
                         margin-top: 10px;
                         }
                         .container {
                         padding: 50px;
                         padding-left: 100px;
                         padding-right: 100px;
                         }
                
                         .row {
                           display: flex;
                           flex-wrap: wrap;
                           justify-content: center;
                           margin-top: 20px;
                           margin-bottom: 20px;
                         }
                
                         .card {
                           padding: 20px;
                           border-radius: 6px;
                           background-color: ${colors[userProfile.colorChoice].headerBackground};
                           color: ${colors[userProfile.colorChoice].headerColor};
                           margin: 20px;
                         }
                         
                         .col {
                         flex: 1;
                         text-align: center;
                         }
                
                         a, a:hover {
                         text-decoration: none;
                         color: inherit;
                         font-weight: bold;
                         }
                
                         @media print { 
                          body { 
                            zoom: .75; 
                          } 
                         }
                      </style>
                    </head>
                    <body>
                    <div class="container wrapper">
                    <div class="photo-header ">
                      <!-- Profile image -->
                        <img src="${userProfile.userImage}" alt="">
                        </div>
                        <div class="col wrapper">
                        <!-- User name -->
                        <h1>${userProfile.name}</h1>
                        <div class="row">
                        <!-- Link to User location via Google Maps -->
                        <a class="card" href='https://www.google.com/maps/place/'${userProfile.userLocation}'>${userProfile.userLocation}</a>
                        <!-- Link to User GitHub profile -->
                        <a class="card" href='${userProfile.gitHubProfile}'>My GitHub Profile</a>
                        <!-- Link to User blog -->
                        <a class="card" href='${userProfile.blog}'>My Blog</a>
                        </div>
                        <!-- User bio -->
                        <h3>${userProfile.bio}</h3>
                        <div class="row">
                        <!-- Number of public repositories -->
                        <h4 class="card">Number of public repositories: ${userProfile.publicRepos}</h4>
                        <!-- Number of followers -->
                        <h4 class="card">Number of followers: ${userProfile.followers}</h4>
                        </div >
                        <div class="row">
                        <!-- Number of GitHub stars -->
                        <h4 class="card">Number of GitHub stars: ${userProfile.stars}</h4>
                        <!-- Number of users following -->
                        <h4 class="card">Number of users following: ${userProfile.following}</h4>
                        </div>
                        </div>
                      </div>
                    </body>

</html>`
                writeFileAsync("index.html", html).then(function () {
                    console.log("Successfully wrote to index.html file");
                });


            })


    })


