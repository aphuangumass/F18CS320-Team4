const express = require('express');
const router = express.Router();

// Data Model
const Item = require('../../models/Items');

// @route   GET api/data
// @desc    Get All Data
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4)))
});

// @route   GET api/data/items/:type/:c
// @desc    Get db entries have a "type" with an "id"
// @access  Public
router.get('/search/:type/:c', (req, res) => {
    console.log(req.params.type);
    Item.find({[req.params.type] : req.params.c})
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4)))
});

// @route   GET api/data/items/tenants/:c
// @desc    Get tenants with "c" id
// @access  Public
router.get('/tenants/:c', (req, res) => {
    Item.find({"authorized.tenants" : {$in: req.params.c.split('-')}})
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4)))
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
    Item.deleteOne({'serial': req.params.id}, (err, obj) => {
        if (err) throw err;
        res.json({success: true})
    })
});

module.exports = router;