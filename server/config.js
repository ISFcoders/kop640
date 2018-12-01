const fs = require('fs');
const path = require('path');

const appDir = path.dirname(require.main.filename) + '/';

const readJsonFileSync = function(filepath) {
    const file = fs.readFileSync(appDir + filepath, 'utf-8');
    return JSON.parse(file);
};

module.exports.readJsonFileSync = readJsonFileSync;
