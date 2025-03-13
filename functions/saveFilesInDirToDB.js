//! sync data to database only 


const customLog = require("./customLog")
const directoryExistsSync = require("./directoryExistsSync")
const readAllFilesInDir = require("./readAllfilesInDir")

//! This function will be used in case teller manually made transaction already

const saveFilesInDirToDB = async ({ dir, collection }) => {
    try {
        // const inboundDestinationPath = process.env.INBOUND_DESTINATION
        // const inboundSource = process.env.INBOUND_SOURCE
        // console.log(inboundSource)
        const checksource = directoryExistsSync(dir)
        // console.log(checksource)
        // console.log(dir)
        if (!checksource) {
            customLog('warn', `dir does not exist | check this file ${__filename}`)
            throw new Error(`dir does not exist | check this file ${__filename}`)
        }

        // const excludedList = await InboundCollection.find({})
        const excludedList = await collection.find({})
        const files = await readAllFilesInDir(dir, excludedList.map(value => value.fileName))
        const uniqueFiles = files.map(({ filePath, fileName }, index) => {
            // customLog('info', `${type} - save file from source to DB: ${filePath}}`)
            // customLog('info', `ACTION = READ & SAVE FILE IN DIR TO DATABASE ; DIR = ${dir} ; FILENAME = ${filePath} ; index = ${index}`)

            customLog('info', {
                action: 'READ & SAVE UNIQUE FILE IN DIR TO DATABASE',
                dir: dir,
                file: filePath,
                index: index,
            })
            return { source: filePath, fileName: fileName }
        });
        if (uniqueFiles) await collection.insertMany(uniqueFiles)
        customLog('info', {
            action: 'SAVE TOTAL RECORD',
            totalRecord: data.length,
            dbName: collection.db.name,
            collectionName: collection.collection.name
        })
        const message = {
            action: 'EXECUTE FILE',
            file: __filename
        }
        customLog('info', message)
        return { message: message, fileInDir: data }
    } catch (error) {
        console.log(error)
        customLog('error', error)
        throw error
    }
}

module.exports = saveFilesInDirToDB