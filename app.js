/* eslint-disable linebreak-style */
const fs = require('fs');

console.log(process.argv[2]);

fs.readFile(process.argv[2], 'utf-8', (err, data) => {
    if (err) console.log(err);
    console.log(JSON.parse(data));
});
