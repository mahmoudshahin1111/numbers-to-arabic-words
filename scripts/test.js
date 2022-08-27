const {execSync} = require('child_process');

function execute(){
    console.log("Testing ... 🧐");
    execSync("npx jest");
    console.log("Tested");
}


execute();