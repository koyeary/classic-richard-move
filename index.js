const fs = require('fs');
//const axios = require('axios');
const inquirer = require('inquirer');
const util = require('util');
const Octokat = require('octokat');


const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

function promptUser() {
  return inquirer
    .prompt([
      {
        name: "username",
        message: "Enter your GitHub username:"

      },
      {
        type: "password",
        name: "password",
        message: "Enter your GitHub password:"
      },
      {
        message: "Enter the name of the the project's GitHub repo:",
        name: "repo"
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
        message: "License:",
      },
      {
        type: "input",
        name: "contributing",
        message: "Contributing:"
      },
      {
        type: "input",
        name: "tests",
        message: "Tests:"
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
  
  Released under the ${answers.license} license.

  ## Contributing 
  
  ${answers.contributing}

  ## Tests 
  
  ${answers.tests}`

}

/* async function init() {
  try {
    const answers = await promptUser();

    const md = generateMD(answers);

    await writeFileAsync("test.txt", md);
    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}
 */

//init();
gitHub();

   
    function gitHub() {

        const octo = new Octokat ({
        username: "koyeary",
        password: "y3@Ry19520817"
      })
      const repo = octo.repos('koyeary', 'classic-richard-move');
      let b = new Buffer("here's some words");
      let s = b.toString("base64");
     // const README = readFileAsync('README.md', 'base64');

      repo.contents('README.md').fetch() 
      .then((info) => { 
        const sha = info.sha;
         const config = {
          message: 'Updating README.md File',
          content: s,
          encoding: "base64",
          sha: sha
        }
        repo.contents('README.md').add(config)
        .then((info) => {
          console.log('File Updated. New sha is ', info.commit.sha) 
        }).then(null, (err) => console.error(err));
      })
    }
    