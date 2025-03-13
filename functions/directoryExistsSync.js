const fs = require('fs');

module.exports = function directoryExistsSync(path) {
    try {
        fs.accessSync(path, fs.constants.F_OK | fs.constants.R_OK);
        return true;
    } catch (err) {
        return false;
    }
}
