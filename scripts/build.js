const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const packageJson = require('../package.json')

const FILE_HEADERS = `
/*!
* NumberToArabicWords (https://mahmoudshahin1111.github.io/numbers-to-arabic-words/)
* Copyright ${new Date(
    Date.now()
).getFullYear()} The NumberToArabicWords Authors (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/contributors)
* Licensed under MIT (https://github.com/mahmoudshahin1111/numbers-to-arabic-words/blob/master/LICENSE)
*/
`

function execute() {
    try {
        console.log('Building .... 🙄')
        execSync('npm run build:prebuild')
        const buildedFilesPaths = [
            path.join(__dirname, '../', packageJson.buildPath, 'index.js'),
            path.join(__dirname, '../', packageJson.buildPath, 'index-node.js'),
        ]
        buildedFilesPaths.forEach((filePath) => {
            appendHeader(filePath)
        })

        console.log('Builded')
    } catch (e) {
        console.log('Build Fails')
    }
}

function appendHeader(filePath) {
    const indexFileContent = fs.readFileSync(filePath, 'utf8')
    fs.writeFileSync(filePath, FILE_HEADERS + '\n' + indexFileContent)
    execSync(`npx prettier ${filePath} --write`)
}

execute()
