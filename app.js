const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const printCommisions = async () => {
    try {
        const data = await readFileAsync(process.argv[2], 'utf-8');
        const inputs = JSON.parse(data);
        inputs.forEach((item) => {
            if (item.type === 'cash_in') {
                const amount = item?.operation?.amount || 0;
                const commission = (amount * 0.03) / 100;
                process.stdout.write(`${commission <= 5.00 ? commission : 5.00}\n`);
            }
        });
    } catch (err) {
        process.stdout.write(err.message);
    }
};

printCommisions();
