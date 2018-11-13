const express = require('express');
const router = express.Router();

// Data Model
const Data = require('../../models/Data');

// @route   GET api/data
// @desc    Get All Data
// @access  Public
router.get('/', (req, res) => {
    res.send('hi')
    // Data.find()
    //     .then(data => res.send(data.toString))
});

// @route   POST api/data
// @desc    Create a Post
// @access  Public
// router.post('/', (req, res) => {
//     const newData = new Data({
//         serial: req.body.bodyserialNumberInserv,
//         company: req.body.system.companyName,
//         model: req.body.system.model,
//         date: req.body.date
//         content: req.body
//     });
//     newData.save().then(data => res.json(data));
// });

module.exports = router;