const cron = require('node-cron');




const scheduler = (task) => {
    // Schedule a task to run every minute
    // agenda.every('*/1 8-18 * * 1-5', 'weekday task');
    // cron.schedule('* * * * *', async () => {
    // const scheduleStr = '*/1 8-18 * * 1-5'
    const scheduleStr = '*/1 * * * *'
    cron.schedule(scheduleStr, async () => {
        // console.log('Start scheduler: ', new Date());
        await task()
        // console.log('End scheduler: ', new Date());
    });
}

module.exports = scheduler