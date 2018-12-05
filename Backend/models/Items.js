const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    name: String,
    serial: {
        type: Number,
        default: 00000
       },
    company: String,
    model: String,
    fullModel: String,
    osVersion: String,
    totalCapacity: Number,
    freeCapacity: Number,
    updated: Date,
    authorized: JSON,
    date: Date,
    content: JSON
});

module.exports = Item = mongoose.model('items', ItemSchema);