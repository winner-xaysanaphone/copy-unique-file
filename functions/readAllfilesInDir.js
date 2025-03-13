const fs = require('node:fs')
const path = require('path');


function readAllFilesInDir(dir, exclusionList = []) {
    return fs.readdirSync(dir)
        .map(fileName => path.join(dir, fileName))  // Create full file path
        .filter(filePath => fs.lstatSync(filePath).isFile())  // Keep only files
        .filter(filePath => {
            // console.log(path.basename(filePath), " ", !exclusionList.includes(path.basename(filePath))) //?debug
            return !exclusionList.includes(path.basename(filePath))
        }) // Exclude files from the exclusion list
        .map(filePath => {
            const fileName = path.basename(filePath)
            // insertInboundData(filename, filePath)
            return { filePath, fileName }
        });  // Extract only the file name
}


module.exports = readAllFilesInDir