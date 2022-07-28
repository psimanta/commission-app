const fs = require('fs');
const { promisify } = require('util');
const { createTransaction } = require('./transaction');

const readFileAsync = promisify(fs.readFile);

const printCommisions = async () => {
    const weekData = {};
    try {
        const data = await readFileAsync(process.argv[2], 'utf-8');
        const inputs = JSON.parse(data);
        inputs.forEach((item) => {
            const transaction = createTransaction({ transaction: item });
            process.stdout.write(transaction.getCommision({ weekData }));
        });
    } catch (err) {
        process.stdout.write(err.message);
    }
};

printCommisions();
