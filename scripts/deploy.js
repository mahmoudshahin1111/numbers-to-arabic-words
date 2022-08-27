const packageJson = require('../package.json');
const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');
function execute(){
    console.log("Deploying ... 🎉");
    const packageJsonVersionSections = packageJson.version.split('.');
    packageJson.version = `${packageJsonVersionSections[0]}.${packageJsonVersionSections[1]}.${parseInt(packageJsonVersionSections[2],10) + 1}`;
     fs.writeFileSync(path.join(__dirname,'../','package.json'),JSON.stringify(packageJson));
    execSync("npm publish");
    console.log("Deployed");
}


execute();