const mongoose = require('mongoose');

const readJsonFileSync = require('../config').readJsonFileSync;
const config = readJsonFileSync('configs/server.json');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    login: String,
    password: String,
    email: String,
    name: String,
    phone: String,
    owner: Boolean,
    usercheck: Boolean, // checked | unchecked
    adminstate: Boolean, // no | yes
    adminrole: String, // superuser | whitelister | locker | corrector | moderator
    vallets: [{
        type: String
    }]
});

const initUser = function(user) {
    user.name = 'Vasya Pupkin';
    user.phone = '-';
    user.owner = false;
    user.usercheck = false;
    user.adminstate = false;
    user.adminrole = '-';
    user.vallets[0] = '0x0000000000000000000000000000000000000000';
    user.vallets[1] = '0x0000000000000000000000000000000000000000';
    return user;
}


module.exports = mongoose.model('user', userSchema, config['mongo']['dbname']);
module.exports.initUser = initUser;