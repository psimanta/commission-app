/* eslint-disable class-methods-use-this */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
const commissionData = require('./lib/user.config');

class Transaction {
    constructor(transaction) {
        this.type = transaction.type;
        this.userType = transaction.user_type;
        this.amount = transaction?.operation?.amount || 0;
    }

    getCommision() {
        let commission = 0.00;
        switch (this.type) {
            case 'cash_in':
                const max = commissionData[this.type][this.userType].max.amount;
                commission = (this.amount * commissionData[this.type][this.userType].percents) / 100;
                return `${this.getRoundedValue(commission <= max ? commission : max)}\n`;
            case 'cash_out':
                const limit = commissionData[this.type][this.userType].week_limit.amount;
                const min = commissionData[this.type][this.userType].min.amount;
                const cutAmount = limit ? (this.amount >= limit ? this.amount - limit : 0) : this.amount;
                commission = (cutAmount * commissionData[this.type][this.userType].percents) / 100;
                return `${this.getRoundedValue(commission < min ? min : commission)}\n`;
            default:
                return commission;
        }
    }

    getRoundedValue(value) {
        return value.toFixed(2);
    }
}

module.exports.createTransaction = ({ transaction }) => new Transaction(transaction);
