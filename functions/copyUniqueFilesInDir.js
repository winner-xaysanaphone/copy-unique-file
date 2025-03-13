const { OutboundCollection, insertOutboundData } = require('../config/DBConnect')
const copyFileAsync = require('./copyFileAsync')
const readAllFilesInDir = require('./readAllfilesInDir')
const path = require('path')
const customLog = require('./customLog')
const directoryExistsSync = require('./directoryExistsSync')





const copyUniqueFilesInDir = async ({ source, destination, type, collection }) => {
    try {
        // const destination = process.env.OUTBOUND_DESTINATION
        // const source = process.env.OUTBOUND_SOURCE
        // console.log('check source: ',source)
        if (!source) throw Error('source is required')
        if (!destination) throw Error('destination is required')
        if (!type) throw Error('type is required')
        if (!collection) throw Error('collection is required')

        const checksource = directoryExistsSync(source)
        const checkDestination = directoryExistsSync(destination)
        if (!checksource) return customLog('warn', 'source path does not exist')
        if (!checkDestination) return customLog('warn', 'destination path does not exist')

        // const excludedList = await OutboundCollection.find({})
        const excludedList = await collection.find({})
        // console.log('ExcludedList: ', excludedList, '\n')
        const files = await readAllFilesInDir(source, excludedList.map(value => value.fileName))
        // console.log("To copy files: ", files, '\n')
        const copied = files.map(({ filePath, fileName }, index) => {
            copyFileAsync(filePath, path.join(destination, fileName))
            // customLog('info', `${type} - Copied file from source : ${path.join(destination, fileName)}`)
            customLog('info', {
                action: 'COPIED & SAVE UNIQUE FILES FROM SOURCE',
                // source: path.join(destination, fileName),
                file: filePath,
                index: index,
                type: type
            })
            return { source: filePath, fileName: fileName }
        });
        // console.log(copied)
        let copiedCount = copied.length
        // customLog('info', `Total ${type} copied: ${copiedCount || 0}`)
        // customLog('info', `Executed function: ${__filename}`)
        // customLog('info', `Copied array: ${JSON.stringify(copied.map(value => value.source))}`)
        // if (copied.length) await insertOutboundData(copied)
        if (copied.length) await collection.insertMany(copied)
        // customLog('info', `Inserted ${copied.length} documents into ${collection.db.name}.${collection.collection.name}`)
        customLog('info', {
            action: 'TOTAL COPIED UNIQUE FILES',
            totalRecord: copiedCount,
            dbName: collection.db.name,
            collectionName: collection.collection.name
        })
        const message = {
            action: 'END EXECUTED FUNCTION',
            file: __filename
        }
        customLog('info', message)
        return { message: message, copiedUniquedfilesInDir: copied }
    } catch (error) {
        console.log(error)
        customLog('error', error)
    }
}

module.exports = copyUniqueFilesInDir