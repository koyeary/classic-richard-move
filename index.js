const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const Octokat = require('octokat');
//const template = require('./template.js');


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

 async function init() {
  try {
    const answers = await promptUser();
    const username = answers.username;
    const password = answers.password;
    const myRepo = answers.repo;
    const md = generateMD(answers);
    
    await commitREADME(md, username, password, myRepo);
    await writeFileAsync("README.md", md);
    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  } 
 }
init();
  
    function commitREADME(md, username, password, myRepo) {
      
        const octo = new Octokat ({
        username: username,
        password: password
      })
      const repo = octo.repos(username, myRepo);
    
      let b = new Buffer.from(md);
      let str = b.toString("base64");


      repo.contents('README.md').fetch() 
      .then((info) => { 
        const sha = info.sha;
         const config = {
          message: 'Updating README.md File',
          content: str,
          encoding: "base64",
          sha: sha
        }
        repo.contents('README.md').add(config)
        .then((info) => {
          console.log('README.md file updated in git repo', myRepo, '. New sha is ', info.commit.sha) 
        }).then(null, (err) => console.error(err));
      })
    }
    