
//! sync data to database only 
//! This function will be used in case teller manually made transaction already


const { insertInboundData, InboundCollection } = require('../config/DBConnect')
const readAllFilesInDir = require('./readAllfilesInDir')
const customLog = require('./customLog')
const directoryExistsSync = require('./directoryExistsSync')


const inBoundSyncDataOnly = async () => {
    try {
        const inboundDestinationPath = process.env.INBOUND_DESTINATION
        const inboundSource = process.env.INBOUND_SOURCE
        console.log(inboundSource)
        const checksource = directoryExistsSync(inboundSource)
        const checkDestination = directoryExistsSync(inboundDestinationPath)
        if (!checksource) {
            customLog('warn', `Inbound source path does not exist | check this file ${__filename}`)
            throw new Error(`Inbound source path does not exist | check this file ${__filename}`)
        }
        if (!checkDestination) {
            customLog('warn', `Inbound destination path does not exist | check this file ${__filename}`)
            throw new Error(`Inbound destination path does not exist | check this file ${__filename}`)
        }
        const excludedList = await InboundCollection.find({})
        const files = await readAllFilesInDir(inboundSource, excludedList.map(value => value.fileName))
        const data = files.map(({ filePath, fileName }, index) => {
            return { source: filePath, fileName: fileName }
        });
        if (data) await insertInboundData(data)
        const message = `Executed function: ${__filename}`
        // customLog('info', message)
        return { message: message, syncedData: data }
    } catch (error) {
        console.log(error)
        customLog('error', error)
        throw error
    }
}

module.exports = inBoundSyncDataOnly