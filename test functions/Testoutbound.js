import outBound from '../functions/outbound.js'
import customLog from '../functions/customLog.js'
import scheduler from '../libs/node-cron.js'
import dotenv from 'dotenv';
import { connectToDatabase, InboundCollection, insertInboundData } from '../config/DBConnect.js'
dotenv.config();



export async function outbound() {
    try {
        // console.log("Start: ", new Date())
        customLog('info', `Check ENV source: ${process.env.ENV_SOURCE}`)
        customLog('info', `Environment: ${process.env.NODE_ENV}`)
        customLog('info', `OUTBOUND SOURCE: ${process.env.OUTBOUND_SOURCE}`)
        customLog('info', `OUTBOUND DESTINATION: ${process.env.OUTBOUND_DESTINATION}`)
        console.log('Environment:', process.env.NODE_ENV)
        console.log('Check ENV source: ', process.env.ENV_SOURCE)
        console.log('OUTBOUND SOURCE: ', process.env.OUTBOUND_SOURCE)
        console.log('OUTBOUND DESTINATION:', process.env.OUTBOUND_DESTINATION)
        await connectToDatabase()
        outBound()
    } catch (error) {
        console.log(error)
        customLog('error', error)
    }
}

outbound()