const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const packageJson = require("../package.json");

const FILE_HEADERS = `
/*!
* NumberToArabicWords (https://mahmoudshahin1111.github.io/numbers-to-arabic-words/)
* Copyright ${new Date(
  Date.now()
).getFullYear()} The NumberToArabicWords Authors (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/contributors)
* Licensed under MIT (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/blob/master/LICENSE)
*/
`;

function execute() {
  try {
    console.log("Building .... 🙄");
    execSync("npx webpack");
    const indexPath = path.join(
      __dirname,
      "../",
      packageJson.buildPath,
      "index.js"
    );
    const indexFileContent = fs.readFileSync(indexPath, "utf8");
    fs.writeFileSync(indexPath, FILE_HEADERS + "\n" + indexFileContent);
    console.log("Builded");
  } catch (e) {
    console.log("Build Fails");
  }
}

execute();
