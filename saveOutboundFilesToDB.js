import { connectToDatabase, OutboundCollection } from "./config/DBConnect.js";
import saveFilesInDirToDB from "./functions/saveFilesInDirToDB.js";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import customLog from "./functions/customLog.js";

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();

async function saveOutboundFilesToDB() {
    await connectToDatabase()
    customLog('info', `START ${__filename}`)
    customLog('info', `Environment: ${process.env.NODE_ENV}`)
    customLog('info', `OUTBOUND SOURCE: ${process.env.OUTBOUND_SOURCE}`)
    const collection = OutboundCollection
    const dir = process.env.OUTBOUND_SOURCE
    await saveFilesInDirToDB({ dir: dir, collection: collection })
    const message = {
        action: 'END EXECUTED FUNCTION',
        file: __filename
    }
    customLog('info', message)
}

saveOutboundFilesToDB()