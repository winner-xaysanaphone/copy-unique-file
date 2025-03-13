const { insertInboundData, InboundCollection } = require('../config/DBConnect')
const copyFileAsync = require('./copyFileAsync')
const readAllFilesInDir = require('./readAllfilesInDir')
const path = require('path')
const customLog = require('./customLog')
const directoryExistsSync = require('./directoryExistsSync')

// const inBound = async (source, destination) => {
// const source = process.env.INBOUND_SOURCE
// console.log(process.env)
// console.log(source)
// const inBound = async (destination) => {
const inBound = async ({source, destination}) => {
    try {
        // const destination = process.env.INBOUND_DESTINATION
        // const source = process.env.INBOUND_SOURCE
        // console.log(source)
        const checksource = directoryExistsSync(source)
        const checkDestination = directoryExistsSync(destination)
        if (!checksource) return customLog('warn', `Inbound source path does not exist | check this file ${__filename}`)
        if (!checkDestination) return customLog('warn', `Inbound destination path does not exist | check this file ${__filename}`)
        const excludedList = await InboundCollection.find({})
        // console.log('ExcludedList: ', excludedList, '\n')
        const files = await readAllFilesInDir(source, excludedList.map(value => value.fileName))
        // console.log("To copy files: ", files, '\n')
        const copied = files.map(({ filePath, fileName }, index) => {
            copyFileAsync(filePath, path.join(destination, fileName))
            customLog('info', `inbound - Copied  files:', ${path.join(destination, fileName)}`)
            // await insertInboundData([{ fileName, filePath }]) // save copied data to database
            // return { filePath, fileName }
            return { source: filePath, fileName: fileName }
        });

        let copiedCount = copied.length
        customLog('info', `Total inbound copied: ${copiedCount || 0}`)
        customLog('info', `Executed function: ${__filename}`)
        customLog('info', `Copied array: ${JSON.stringify(copied.map(value => value.source))}`)
        if (copied.length) await insertInboundData(copied)

    } catch (error) {
        console.log(error)
        customLog('error', error)
    }
}

module.exports = inBound