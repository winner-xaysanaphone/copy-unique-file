const mongoose = require('mongoose')
const CustomerLog = require('../functions/customLog')


// Connection URI
// const uri = 'mongodb://localhost:27017/synchronisefile';
// const uri = process.env.MONGO_URI

// Define schemas and models for each collection
const inboundSchema = new mongoose.Schema({
    fileName: String, // encrypted file
    source: String,
    // basefile: String, // plain file name
    destination: String
},
    { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);
const outboundSchema = new mongoose.Schema({
    fileName: String,
    source: String,
    // basefile: String, // plain file name
    destination: String
},
    { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

const InboundCollection = mongoose.model('inbound', inboundSchema, 'V2A_Inbound'); // Inbound
const OutboundCollection = mongoose.model('outbound', outboundSchema, 'A2V_Outbound'); // Outbound




// Connect to MongoDB
// async function connectToDatabase(uri) {
async function connectToDatabase() {
    try {
        const uri = process.env.MONGO_URI
        // console.log(uri)
        await mongoose.connect(uri);
        const trace = {
            action: "CONNECTED TO DB",
            dbName: mongoose.connection.name,
            dbHost: mongoose.connection.host,
            dbPort: mongoose.connection.port
        }
        CustomerLog('info', trace)


        // console.log("Connected to MongoDB: ", new Date());
        // console.log("Connected to MongoDB");
        /* logger.info("Connected to MongoDB")
        logger.info('test') */
    } catch (error) {
        console.error("Database connection error:", error);
        customLog('error', ("Database connection error: ", error))
        throw error;
    }
}


// const insertInboundData = async (fileName, source) => {

// dataArr =[{ fileName, source }]
const insertInboundData = async (dataArr) => {
    try {
        // const data = new InboundCollection({ fileName: fileName, source: source })
        // console.log(dataArr)
        const result = await InboundCollection.insertMany(dataArr)
        // const result = await data.save()
        console.log('inserted data to DB: ', result)
    } catch (error) {
        console.log(error)
        customLog('error', `Error Executed function: $ { __filename }`)
        customLog('error', error)
    }
    // finally {
    //     // Disconnect from MongoDB
    //     await mongoose.disconnect();
    //     console.log("Disconnected from MongoDB");
    // }
}


const insertOutboundData = async (dataArr) => {
    // const insertOutboundData = async (fileName, source) => {
    try {
        /* const data = new OutboundCollection({ fileName: fileName, source: source })
         const result = await data.save() */
        // console.log(dataArr)
        const result = await OutboundCollection.insertMany(dataArr)
        // console.log('\n inserted data to DB: ', result)
        // console.log(result)
    } catch (error) {
        customLog('error', `Error Executed function: $ { __filename }`)
        customLog('error', error)
    }
    // finally {
    //     // Disconnect from MongoDB
    //     await mongoose.disconnect();
    //     console.log("Disconnected from MongoDB");
    // }
}


module.exports = {
    connectToDatabase,
    insertInboundData,
    insertOutboundData,
    InboundCollection,
    OutboundCollection
    /* outboundSchema,
    inboundSchema */
}


// example


// Main function to run the operations
// async function main() {
//   try {
//     await connectToDatabase();

// Insert data into collection1
//     await insertIntoCollection1({ name: "Alice", age: 28, occupation: "Data Scientist" });

// Insert data into collection2
//     await insertIntoCollection2({ name: "Bob", age: 34, occupation: "Developer" });
//   } catch (error) {
//     console.error("Error in main function:", error);
//   } finally {
// Disconnect from MongoDB
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
//   }
// }

// // Execute main function
// main();