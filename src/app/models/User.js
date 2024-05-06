const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
    type: {type: String, require: true}
}
,
{
    timestamps: true,
});

module.exports = mongoose.model('User', User);