import pm2 from 'pm2'

// Function to start PM2 processes with a configuration file
export function startPM2WithConfig(configFilePath) {
    return new Promise((resolve, reject) => {
        // Connect to PM2
        pm2.connect((err) => {
            if (err) {
                console.error('Error connecting to PM2:', err);
                return reject(err);
            }

            // Start the PM2 process using the config file
            pm2.start(configFilePath, (err, apps) => {
                if (err) {
                    console.error('Error starting PM2 process:', err);
                    pm2.disconnect(); // Disconnect on error
                    return reject(err);
                }

                console.log('PM2 started successfully with config file:', configFilePath);
                // console.log('Processes started:', apps);

                // Disconnect from PM2
                pm2.disconnect();
                resolve(apps);
            });
        });
    });
}



// Function to stop a PM2 process by its name or id
export function stopPM2Process(processNameOrId) {
    return new Promise((resolve, reject) => {
        pm2.connect((err) => {
            if (err) {
                console.error('Error connecting to PM2:', err);
                return reject(err);
            }

            pm2.stop(processNameOrId, (err, apps) => {
                if (err) {
                    console.error('Error stopping PM2 process:', err);
                    pm2.disconnect(); // Disconnect on error
                    return reject(err);
                }

                console.log(`PM2 process ${processNameOrId} stopped successfully.`);
                pm2.disconnect();
                resolve(apps);
            });
        });
    });
}


// Example Usage:
// Stop a process by name or id
// stopPM2Process('my-app')
//     .then((apps) => console.log('Process stopped:', apps))
//     .catch((err) => console.error('Error:', err));


// Function to restart a PM2 process by its name or id
export function restartPM2Process(processNameOrId) {
    return new Promise((resolve, reject) => {
        pm2.connect((err) => {
            if (err) {
                console.error('Error connecting to PM2:', err);
                return reject(err);
            }

            pm2.restart(processNameOrId, (err, apps) => {
                if (err) {
                    console.error('Error restarting PM2 process:', err);
                    pm2.disconnect(); // Disconnect on error
                    return reject(err);
                }

                console.log(`PM2 process ${processNameOrId} restarted successfully.`);
                pm2.disconnect();
                resolve(apps);
            });
        });
    });
}
// Restart a process by name or id
// restartPM2Process('my-app')
//     .then((apps) => console.log('Process restarted:', apps))
//     .catch((err) => console.error('Error:', err));




// Function to reload a PM2 process by its name or id
export function reloadPM2Process(processNameOrId) {
    return new Promise((resolve, reject) => {
        pm2.connect((err) => {
            if (err) {
                console.error('Error connecting to PM2:', err);
                return reject(err);
            }

            pm2.reload(processNameOrId, (err, apps) => {
                if (err) {
                    console.error('Error reloading PM2 process:', err);
                    pm2.disconnect(); // Disconnect on error
                    return reject(err);
                }

                console.log(`PM2 process ${processNameOrId} reloaded successfully.`);
                pm2.disconnect();
                resolve(apps);
            });
        });
    });
}

// // Reload a process by name or id
// reloadPM2Process('my-app')
//     .then((apps) => console.log('Process reloaded:', apps))
//     .catch((err) => console.error('Error:', err));


// Function to stream real-time logs and events for a specific process, without timeout
export function streamPm2Logs(processName) {
    return new Promise((resolve, reject) => {
        // To accumulate log messages
        let logMessages = '';

        pm2.launchBus((err, bus) => {
            if (err) {
                reject(`Error connecting to PM2 Event Bus: ${err.message}`);
                return;
            }

            console.log(`Streaming real-time logs and events for process: ${processName}\n`);

            // Get current timestamp
            const getTimestamp = () => new Date().toISOString();

            // Listen for stdout logs
            bus.on('log:out', (data) => {
                if (data.process.name === processName) {
                    logMessages += `[${getTimestamp()}] [${data.process.name}] STDOUT: ${data.data}\n`;
                    console.log(`[${data.process.name}] STDOUT: ${data.data}`); // Real-time logging
                }
            });

            // Listen for stderr logs
            bus.on('log:err', (data) => {
                if (data.process.name === processName) {
                    logMessages += `[${getTimestamp()}] [${data.process.name}] STDERR: ${data.data}\n`;
                    console.error(`[${data.process.name}] STDERR: ${data.data}`); // Real-time logging
                }
            });

            // Listen for exceptions (errors that cause a process to crash or behave unexpectedly)
            bus.on('process:exception', (data) => {
                if (data.process.name === processName) {
                    logMessages += `[${getTimestamp()}] [${data.process.name}] EXCEPTION: ${JSON.stringify(data.data, null, 2)}\n`;
                }
            });

            // Listen for restarts (process being restarted by PM2)
            bus.on('process:restart', (data) => {
                if (data.process.name === processName) {
                    logMessages += `[${getTimestamp()}] [${data.process.name}] RESTARTED (id: ${data.process.pm_id})\n`;
                }
            });

            // Listen for process going online (successful start)
            bus.on('process:online', (data) => {
                if (data.process.name === processName) {
                    logMessages += `[${getTimestamp()}] [${data.process.name}] ONLINE (id: ${data.process.pm_id})\n`;
                }
            });

            // Listen for process exit (process exiting)
            bus.on('process:exit', (data) => {
                if (data.process.name === processName) {
                    logMessages += `[${getTimestamp()}] [${data.process.name}] EXITED (id: ${data.process.pm_id}, status: ${data.exitCode})\n`;
                }
            });

            // Return the log data (you can choose to resolve or call this explicitly from elsewhere)
            // For example, resolving here would be a one-time thing, so you may want to return the data later.
            // The function does not resolve here, keeping the process running indefinitely.
            resolve(logMessages);  // This may be resolved or called based on your need elsewhere.

        });
    });
}

// // Example usage:
// streamPm2Logs('my-app') // Replace 'my-app' with your process name
//     .then((logResult) => {
//         // This will resolve immediately with empty logs, so better to use it in another function to stop collecting.
//         console.log(logResult);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });