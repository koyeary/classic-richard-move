const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

let answerArr = [];

inquirer
  .prompt([
    {
    message: "Enter your GitHub username:",
    name: "username"
  },
  {
    type: "input",
    name: "title",
    message: "Enter the title of your project:"
  }, 
  {
    type: "input",
    name: "description",
    message: "Enter a project description:"
  },
  {
    type: "input",
    name: "installation",
    message: "Installation Instructions:"
  },
  {
    type: "input",
    name: "usage",
    message: "Usage Instructions:"
  },
  {
    type: "input",
    name: "license",
    message: "License:"
  },
  {
    type: "input",
    name: "contributors",
    message: "Contributors:"
  },
  {
    type: "input",
    name: "tests",
    message: "Tests:"
  },
  {
    type: "input",
    name: "questions",
    message: "Questions:"
  } 
])
  .then(answers => {
    console.log(answers.username + ", " + answers.title);
    answerArr.push(answers);
    console.log(answerArr);
  }
  );
    
    /* 
    function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
      fs.appendFile("repos.txt", "title", function(err) {
        if (err) {
          throw err
        }
        
        console.log("success");
      })
    });
  }); */

