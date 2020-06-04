const fs = require('fs');
//const axios = require('axios');
const inquirer = require('inquirer');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer
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
    type: "checkbox",
    name: "license",
    message: "Select a license: ",
    choices: [
      'MIT', 
      'GNU GPLv3',
      'Apache 2.0',
      'ISC',
      'Other'
    ]
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
}

function generateMD(answers) {
  return `
  # ${answers.title}

  ${answers.description}

  ## Installation 
  
  ${answers.installation}

  ## Usage
  
  ${answers.usage}

  ## License 
  
  ${answers.license}

  ## Contributors 
  
  ${answers.contributors}

  ## Tests 
  
  ${answers.tests}

  ## Questions 
  
  ${answers.questions}`
}

async function init() {
  try {
    const answers = await promptUser();

    const md = generateMD(answers);

    await writeFileAsync("test.txt", md);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}


init();

 
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

