const express = require('express');
const router = express.Router();

// Data Model
const Item = require('../../models/Items');

// @route   GET api/data
// @desc    Get All Data
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .then(item => res.json(item))
});

// @route   GET api/data/company/id
// @desc    Get All Data
// @access  Public
router.get('/company/:c', (req, res) => {
    Item.find({company: req.params.c})
        .then(item => res.json(item))
});

// @route   POST api/data
// @desc    Create a Post
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.serialNumberInserv + '-' + formatDate(req.body.updated),
        serial: req.body.serialNumberInserv,
        company: req.body.system.companyName,
        model: req.body.system.model,
        fullModel: req.body.system.fullModel,
        osVersion: req.body.system.osVersion,
        totalCapacity: req.body.capacity.total.sizeTiB,
        freeCapacity: req.body.capacity.total.freeTiB,
        updated: req.body.updated,
        authorized: req.body.authorized,
        date: req.body.date,
        content: req.body
    });
    newItem.save().then(item => res.json(item));
});

// Helper method to generate name for the POST api
function formatDate(str) {
    var date = new Date(str), 
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id).then(item => item.remove().then(() => res.json({success: true})))
});

module.exports = router;