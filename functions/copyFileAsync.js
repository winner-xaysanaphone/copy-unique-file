const fs = require('fs').promises;
const customLog = require('./customLog')

async function copyFileAsync(source, destination) {
    try {
        // Copy and overwrite if file exists
        await fs.copyFile(source, destination);
        // customLog('info', `copy file from \n source: ${source} \n destination: ${destination}`)
    } catch (err) {
        customLog('error', `Error Executed function: ${__filename}`)
        customLog('error', err)
        console.error('Error copying file:', err);
    }
}

// Usage
// copyFile('./source.txt', './destination.txt');

module.exports = copyFileAsync