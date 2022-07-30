const { createTransaction } = require('./transaction');
const { readFile } = require('./utils/readFile');

const getCommisions = async (inputs) => {
    const weekData = {};
    inputs.forEach((item) => {
        const transaction = createTransaction({ transaction: item });
        process.stdout.write(`${transaction.getCommision({ weekData })}\n`);
    });
};

const generateOutput = async () => {
    const res = await readFile(process.argv[2]);
    if (res.err) process.stdout.write(`${res.err}\n`);
    getCommisions(res.data);
};

generateOutput();
