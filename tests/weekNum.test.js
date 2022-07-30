/* eslint-disable no-undef */
const { getWeekNumber } = require('../utils/getWeekNumber');

describe('Get Week Number function: ', () => {
    it('It should give the n-th of week of a year', () => {
        expect(getWeekNumber('2022-01-03')).toEqual(2);
        expect(getWeekNumber('2022-01-01')).toEqual(1);
        expect(getWeekNumber('2022-01-09')).toEqual(2);
        expect(getWeekNumber('2022-01-10')).toEqual(3);
    });
});
