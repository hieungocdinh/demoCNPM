const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanPackage = new Schema({
    ID: { type: String, required: true , unique: true},
    name: { type: String, required: true },
    type: { type: String, required: true },
    rule: { type: String, required: true },
    interestRate: {type: Number, require: true},
    maximumMoney: {type: Number, require: true},
    maximumTime: {type: Number, require: true},
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('LoanPackage', LoanPackage);