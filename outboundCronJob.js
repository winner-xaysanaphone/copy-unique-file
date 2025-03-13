import customLog from './functions/customLog.js'
import scheduler from './libs/node-cron.js'
import dotenv from 'dotenv';
import { connectToDatabase, OutboundCollection } from './config/DBConnect.js'
import copyUniqueFilesInDir from './functions/copyUniqueFilesInDir.js';
import { fileURLToPath } from 'url';
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();


await connectToDatabase()

customLog('info', {
    action: 'START',
    start: __filename,
    environment: process.env.NODE_ENV,
    source: process.env.OUTBOUND_SOURCE,
    destination: process.env.OUTBOUND_DESTINATION,
})


export async function outboundMain() {
    try {
        // console.log("Start: ", new Date())
        const source = process.env.OUTBOUND_SOURCE
        const destination = process.env.OUTBOUND_DESTINATION
        const type = 'outbound'
        const collection = OutboundCollection
        // console.log('Environment:', process.env.NODE_ENV)
        // console.log('Check ENV source: ', process.env.ENV_SOURCE)
        // console.log('OUTBOUND SOURCE: ', process.env.OUTBOUND_SOURCE)
        // console.log('OUTBOUND DESTINATION:', process.env.OUTBOUND_DESTINATION)
        // outBound()
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
// outboundMain()
scheduler(outboundMain)