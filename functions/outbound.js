const { OutboundCollection, insertOutboundData } = require('../config/DBConnect')
const copyFileAsync = require('./copyFileAsync')
const readAllFilesInDir = require('./readAllfilesInDir')
const path = require('path')
const customLog = require('./customLog')
const logger = require('../config/log.config')
const directoryExistsSync = require('./directoryExistsSync')

// const outBound = async (source, destination) => {



const outBound = async ({source, destination}) => {
    try {
        // const destination = process.env.OUTBOUND_DESTINATION
        // const source = process.env.OUTBOUND_SOURCE

        const checksource = directoryExistsSync(source)
        const checkDestination = directoryExistsSync(destination)
        if (!checksource) return customLog('warn', 'source path does not exist')
        if (!checkDestination) return customLog('warn', 'destination path does not exist')

        const excludedList = await OutboundCollection.find({})
        // console.log('ExcludedList: ', excludedList, '\n')
        const files = await readAllFilesInDir(source, excludedList.map(value => value.fileName))
        // console.log("To copy files: ", files, '\n')
        const copied = files.map(({ filePath, fileName }, index) => {
            copyFileAsync(filePath, path.join(destination, fileName))
            customLog('info', `outbound - Copied  files:', ${path.join(destination, fileName)}`)
            return { source: filePath, fileName: fileName }
        });
        // console.log(copied)
        let copiedCount = copied.length
        customLog('info', `Total outward copied: ${copiedCount || 0}`)
        customLog('info', `Executed function: ${__filename}`)
        customLog('info', `Copied array: ${JSON.stringify(copied.map(value => value.source))}`)
        if (copied.length) await insertOutboundData(copied)
    } catch (error) {
        console.log(error)
        customLog('error', error)
    }
}

module.exports = outBound