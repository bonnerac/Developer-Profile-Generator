const inquirer = require("inquirer")

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
    ]).then(function (response) {
        console.log(response)

    })


const questions = [

];

function writeToFile(fileName, data) {

}

function init() {
}
init();

