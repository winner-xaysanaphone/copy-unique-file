
//! sync data to database only 
//! This function will be used in case teller manually made transaction already

const { OutboundCollection, insertOutboundData } = require('../config/DBConnect')
const readAllFilesInDir = require('./readAllfilesInDir')
const customLog = require('./customLog')
const directoryExistsSync = require('./directoryExistsSync')
// const outBound = async (outBoundSource, outBoundDestinationPath) => {
// no copy just sync file to database

const outBoundSyncDataOnly = async ({ source, destination }) => {
    try {
        // const outBoundDestinationPath = process.env.OUTBOUND_DESTINATION
        // const outBoundSource = process.env.OUTBOUND_SOURCE

        const checksource = directoryExistsSync(source)
        const checkDestination = directoryExistsSync(destination)
        if (!checksource) {
            customLog('warn', `Outbound source path does not exist | check this file ${__filename}`)
            throw new Error(`Outbound source path does not exist | check this file ${__filename}`)
        }
        if (!checkDestination) {
            customLog('warn', `Outbound destination path does not exist | check this file ${__filename}`)
            throw new Error(`Outbound destination path does not exist | check this file ${__filename}`)
        }
        const excludedList = await OutboundCollection.find({})
        const files = await readAllFilesInDir(source, excludedList.map(value => value.fileName))
        const data = files.map(({ filePath, fileName }, index) => ({ source: filePath, fileName: fileName }));
        if (data.length) await insertOutboundData(data)
        const message = `Executed function: ${__filename}`
        // customLog('info', message)
        return { message: message, syncedData: data }
        // console.log('sync outbound data to database')
        // customLog('info', `Sync outbound data to database: ${data}`)
    } catch (error) {
        console.log(error)
        customLog('error', error)
        // logger.error('error', error)
        throw error
    }
}


module.exports = outBoundSyncDataOnly