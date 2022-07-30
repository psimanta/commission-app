/* eslint-disable no-undef */
const { createTransaction } = require('../transaction');
const { readFile } = require('../utils/readFile');

const outputs = [
    '0.06',
    '0.90',
    '87.00',
    '3.00',
    '0.30',
    '0.30',
    '5.00',
    '0.00',
    '0.00',
];

test('Read file and test output!', async () => {
    const weekData = {};
    const res = await readFile('input.json');
    res.data.forEach((item, i) => {
        const transaction = createTransaction({ transaction: item });
        expect(transaction.getCommision({ weekData })).toBe(outputs[i]);
    });
});
