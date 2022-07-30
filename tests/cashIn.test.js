/* eslint-disable no-undef */
const { createTransaction } = require('../transaction');

describe('Test Cash In (All type of User):', () => {
    it('It should return cash in commission:', () => {
        const input1 = {
            date: '2016-01-05',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_in',
            operation: {
                amount: 200.00,
                currency: 'EUR',
            },
        };

        const input2 = {
            date: '2016-01-10',
            user_id: 2,
            user_type: 'juridical',
            type: 'cash_in',
            operation: {
                amount: 1000000.00,
                currency: 'EUR',
            },
        };

        const transaction1 = createTransaction({ transaction: input1 });
        const transaction2 = createTransaction({ transaction: input2 });
        expect(transaction1.getCommision({ weekData: {} })).toBe('0.06');
        expect(transaction2.getCommision({ weekData: {} })).toBe('5.00');
    });
});
