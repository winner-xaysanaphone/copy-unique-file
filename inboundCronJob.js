import inBound from './functions/inbound.js'
import customLog from './functions/customLog.js'
import scheduler from './libs/node-cron.js'
import dotenv from 'dotenv';
import { connectToDatabase, InboundCollection } from './config/DBConnect.js'
import { fileURLToPath } from 'url';
import copyUniqueFilesInDir from './functions/copyUniqueFilesInDir.js';
const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();


await connectToDatabase()

customLog('info', {
    action: 'START',
    start: __filename,
    environment: process.env.NODE_ENV,
    source: process.env.INBOUND_SOURCE,
    destination: process.env.INBOUND_DESTINATION
})

export async function inboundMain() {
    try {
        const source = process.env.INBOUND_SOURCE
        const destination = process.env.INBOUND_DESTINATION
        const type = 'inbound'
        const collection = InboundCollection

        // console.log('Environment:', process.env.NODE_ENV)
        // console.log('Check ENV source: ', process.env.ENV_SOURCE)
        // console.log('INBOUND SOURCE: ', process.env.INBOUND_SOURCE)
        // console.log('INBOUND DESTINATION:', process.env.INBOUND_DESTINATION)
        // console.log('Check ENV source: ', process.env.ENV_SOURCE)
        // inBound()
        await copyUniqueFilesInDir({ source: source, destination: destination, type: type, collection: collection })
        const message = {
            action: 'END EXECUTED FUNCTION',
            file: __filename
        }
        customLog('info', message)
    } catch (error) {
        console.log(error)
        customLog('error', error)
    }
}

// inboundMain()
scheduler(inboundMain)

// console.log('------------------------------------')
// console.log('check ENV variables', process.env.INBOUND_DESTINATION)
// console.log('check ENV variables', process.env.INBOUND_SOURCE)
// inboundMain()