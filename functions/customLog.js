const logger = require('../config/log.config')
const customLog = (level = 'info', msg) => {
    // if (consoleMessage === '') consoleMessage = logMessage
    console.log(msg)
    logger.log(level, msg)
}

module.exports = customLog

// const { loggerOutward, loggerInward, logger } = require('../config/log.config')

// const inwardLog = (level = 'info', msg) => {
//     // if (consoleMessage === '') consoleMessage = logMessage
//     // console.log(msg)
//     loggerInward.log(level, msg)
// }

// const outwardLog = (level = 'info', msg) => {
//     // if (consoleMessage === '') consoleMessage = logMessage
//     // console.log(msg)
//     loggerOutward.log(level, msg)
// }


// const log = (level = 'info', msg) => {
//     // if (consoleMessage === '') consoleMessage = logMessage
//     // console.log(msg)
//     logger.log(level, msg)
// }
// module.exports = { inwardLog, outwardLog, log }