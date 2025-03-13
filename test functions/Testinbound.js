import inBound from '../functions/inbound.js'
import customLog from '../functions/customLog.js'
import scheduler from '../libs/node-cron.js'
import dotenv from 'dotenv';
import { connectToDatabase, InboundCollection, insertInboundData } from '../config/DBConnect.js'
dotenv.config();



export async function inbound() {
    try {
        // console.log("Start: ",inbound new Date())
        /*      console.log('check ENV variables', process.env.INBOUND_DESTINATION)
             console.log('check ENV variables', process.env.INBOUND_SOURCE)
             if (process.env.LOADED_FROM_ENV_FILE) {
                 console.log("Environment variables loaded from .env");
             } else {
                 console.log("Environment variables likely set by PM2 or other sources");
             } */
        customLog('info', `Check ENV source: ${process.env.ENV_SOURCE}`)
        customLog('info', `Environment: ${process.env.NODE_ENV}`)
        customLog('info', `INBOUND SOURCE: ${process.env.INBOUND_SOURCE}`)
        customLog('info', `INBOUND DESTINATION: ${process.env.INBOUND_DESTINATION}`)
        console.log('Environment:', process.env.NODE_ENV)
        console.log('Check ENV source: ', process.env.ENV_SOURCE)
        console.log('INBOUND SOURCE: ', process.env.INBOUND_SOURCE)
        console.log('INBOUND DESTINATION:', process.env.INBOUND_DESTINATION)
        console.log('Check ENV source: ', process.env.ENV_SOURCE)
        await connectToDatabase()
        inBound()
    } catch (error) {
        console.log(error)
        customLog('error')
    }
}

inbound()
