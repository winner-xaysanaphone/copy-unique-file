const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, json, prettyPrint, errors, ms } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const { v4: uuidv4 } = require('uuid');
const currentDate = new Date();

const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed (0 - 11)

// Define custom log format
// const logFormat = printf(({ level, message, timestamp }) => {
//     return `${timestamp} ${level.toUpperCase()} ${message}`;
// });


// Configure the logger
const logger = createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        ms(),
        format((info) => {
            info.traceId = uuidv4(); // Generate UUID here
            return info;
        })(),
        json(),
        printf(info => JSON.stringify(info) + ',')
        // logFormat,
        // prettyPrint(),
    ),
    transports: [
        new DailyRotateFile({
            // filename: 'logs/%Y/%m/application-%Y-%m-%d.log', // Date-based directory structure
            // filename: path.join('logs', '%Y', '%m', 'application-%Y-%m-%d.log'),
            dirname: `logs/${currentYear}/${currentMonth}`,// Root logs directory
            filename: `%DATE%.json`, // Date-based folders in filename
            // datePattern: 'YYYY-MM-DD-HH',  // Log file named by date
            datePattern: 'YYYY-MM-DD',  // Log file named by date
            // datePattern: 'YYYY-MM-DD-HH-mm-ss',
            zippedArchive: false,       // Compressing logs is optional
            maxSize: '50m',             // Limit each log file to 20MB
            maxFiles: '0',               // Retain logs indefinitely
            // format: json()
        })
    ]
    // transports: [
    //     new DailyRotateFile({
    //         // filename: 'logs/%Y/%m/application-%Y-%m-%d.log', // Date-based directory structure
    //         // filename: path.join('logs', '%Y', '%m', 'application-%Y-%m-%d.log'),
    //         dirname: `logs/${currentYear}/${currentMonth}`,// Root logs directory
    //         filename: `%DATE%.json`, // Date-based folders in filename
    //         // datePattern: 'YYYY-MM-DD-HH',  // Log file named by date
    //         datePattern: 'YYYY-MM-DD',  // Log file named by date
    //         // datePattern: 'YYYY-MM-DD-HH-mm-ss',
    //         zippedArchive: false,       // Compressing logs is optional
    //         maxSize: '50m',             // Limit each log file to 20MB
    //         maxFiles: '0',               // Retain logs indefinitely
    //         format: json()
    //     }),
    //     // Error logs
    //     new DailyRotateFile({
    //         dirname: `logs/error/${currentYear}/${currentMonth}`,
    //         filename: `%DATE%.error.json`, // File name includes log type
    //         // datePattern: 'YYYY-MM-DD-HH',
    //         datePattern: 'YYYY-MM-DD',
    //         zippedArchive: false,
    //         maxSize: '50m',
    //         maxFiles: '0',
    //         level: 'error', // Only logs with 'error' level will be written here
    //         format: json()
    //     }),
    // ]
});


// Console output during development
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new transports.Console({
//         format: combine(
//             // format.colorize(),
//             timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//             logFormat,
//             json()
//         )
//     }));
// }

module.exports = logger;
