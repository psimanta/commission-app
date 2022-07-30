const { getWeekNumber } = require('./getWeekNumber');

module.exports.getCutAmount = ({ userId, date, amount, weekData, limit }) => {
    const key = `${userId}_${(new Date(date)).getFullYear()}_${getWeekNumber(date)}`;

    // first cash out of a week and the amount is greater than the limit
    if (!weekData[key] && amount > limit) {
        weekData[key] = amount;
        return amount - limit;
    }

    if (weekData[key]) {
        if (weekData[key] <= limit && weekData[key] + amount > limit) {
            weekData[key] += amount;
            return weekData[key] - limit;
        }
        // already crossed the limit
        return amount;
    }
    return 0;
};
