const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const DataSchema = new Schema({
    serial: Number,
    company: String,
    model: String,
    date: Date,
    content: JSON
});

module.exports = Data = mongoose.model('data', DataSchema);