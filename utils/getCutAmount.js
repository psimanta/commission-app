/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
const { getWeekNumber } = require('./getWeekNumber');

module.exports.getCutAmount = ({ userId, date, amount, weekData, limit }) => {
    const key = `${userId}_${(new Date(date)).getFullYear()}_${getWeekNumber(date)}`;
    if (!weekData[key] && amount > limit) {
        weekData[key] = amount;
        return amount - limit;
    }
    if (weekData[key] + amount > limit) {
        weekData[key] += amount;
        return amount;
    }
    return 0;
};
