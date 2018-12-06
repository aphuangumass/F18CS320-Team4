const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    name: String,
    serial: {
        type: Number,
        required: true
    },
    company: String,
    model: String,
    fullModel: {
        type: String,
        required: true
    },
    osVersion: String,
    totalCapacity: Number,
    freeCapacity: Number,
    updated: Date,
    authorized: JSON,
    date: Date,
    content: JSON
});

module.exports = Item = mongoose.model('items', ItemSchema);