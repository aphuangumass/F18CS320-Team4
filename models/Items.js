const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    serial: Number,
    company: String,
    model: String,
    date: Date,
    content: JSON
});

module.exports = Item = mongoose.model('item', ItemSchema);