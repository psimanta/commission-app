const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

module.exports.readFile = async (fileName) => {
    try {
        const data = await readFileAsync(fileName, 'utf-8');
        return {
            err: null,
            data: JSON.parse(data),
        };
    } catch (err) {
        return {
            err: err.message,
        };
    }
};
