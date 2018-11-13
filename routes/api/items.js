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

// @route   POST api/data
// @desc    Create a Post
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        serial: req.body.serialNumberInserv,
        company: req.body.system.companyName,
        model: req.body.system.model,
        date: req.body.date,
        content: req.body
    });
    newItem.save().then(item => res.json(item));
});

module.exports = router;