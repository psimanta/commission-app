/* eslint-disable no-nested-ternary */
const fs = require('fs');
const { promisify } = require('util');
const commissionData = require('./lib/config');

const readFileAsync = promisify(fs.readFile);

const printCommisions = async () => {
    try {
        const data = await readFileAsync(process.argv[2], 'utf-8');
        const inputs = JSON.parse(data);
        inputs.forEach((item) => {
            const amount = item?.operation?.amount || 0;
            if (item.type === 'cash_in') {
                const max = commissionData[item.type][item.user_type].max.amount;
                const commission = (amount * commissionData[item.type][item.user_type].percents) / 100;
                process.stdout.write(`${commission <= max ? commission : max}\n`);
            }
            if (item.type === 'cash_out') {
                const limit = commissionData[item.type][item.user_type].week_limit.amount;
                const min = commissionData[item.type][item.user_type].min.amount;
                const cutAmount = limit ? (amount >= limit ? amount - limit : 0) : amount;
                const commission = (cutAmount * commissionData[item.type][item.user_type].percents) / 100;
                process.stdout.write(`${commission < min ? min : commission}\n`);
            }
        });
    } catch (err) {
        process.stdout.write(err.message);
    }
};

printCommisions();
