// function generateFilename(msgType,  ) {
function generateFileName() {
    // Generate the current timestamp in YYYYMMDDHHmmss format
    const now = new Date();
    const timestamp = now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0') +
        '_' +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0') +
        String(now.getSeconds()).padStart(2, '0');

    // Generate a random 32-character hexadecimal string
    const randomHex = [...Array(32)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');

    // Combine to create the filename
    return `${timestamp}_${randomHex}.txt`;
}

module.exports = generateFileName
console.log(generateFileName());