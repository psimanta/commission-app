const moment = require('moment');

moment.updateLocale('en', {
    week: {
        dow: 1, // Monday is the first day of the week.
    },
});

module.exports.getWeekNumber = (date) => moment(date).week();
