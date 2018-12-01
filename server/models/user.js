const mongoose = require('mongoose');

const readJsonFileSync = require('../config').readJsonFileSync;
const config = readJsonFileSync('configs/server.json');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String
});

module.exports = mongoose.model('user', userSchema, config['mongo']['dbname']);
