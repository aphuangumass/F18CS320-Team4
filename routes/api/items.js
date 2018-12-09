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
    Item.find({[req.params.type] : req.params.c})
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4)))
});

// @route   GET api/data/items/tenants/:c
// @desc    Get db entries that follow at least one group of c, separated by '-'
// @access  Public
router.get('/tenants/:c', (req, res) => {
    Item.find({"authorized.tenants" : {$in: req.params.c.split('-')}})
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4)))
});

// @route   GET api/data/items/list/:c
// @desc    Get db entries that follow at least one group of c, separated by '-'
// @access  Public
router.get('/list/:c', (req, res) => {
    Item.find({},{[req.params.c]: 1, _id: 0 })
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4))

        // .then(item => { 
        //     const str = req.params.c
        //     // console.log(item[0] + " " + req.params.c)
        //     res.send(
        //         console.log(item.map(x => {
        //         x[str]
        //     })))}
        ).catch(err => console.log(err))
});

// @route   POST api/data
// @desc    Create a Post
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.serialNumberInserv + '-' + new Date(req.body.updated).toISOString().substr(0, 10) + '.json',
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

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public

router.delete('/:id', (req, res) => {
    Item.deleteOne({'serial': req.params.id}, (err, obj) => {
        if (err) throw err;
        res.json({success: true})
    })
});

// @route   GET api/tenants
// @desc    Easter Egg
// @access  Public
router.get('/tenants', (req, res)=> {
    res.set({'Content-Type': 'text/plain; charset=utf-8'}).send("\"snails see the beauty in every inch\" \n \t\t\t-The Format")
})

// @route   GET api/tenants
// @desc    Easter Egg
// @access  Public
router.get('/search', (req, res)=> {
    res.set({'Content-Type': 'text/plain; charset=utf-8'}).send(
        "What happens when two snails get into a fight? \nThey slug it out!\n\n"
        + "Why doesn't McDonald's serve escargot? \nBecause it's not fast food.\n\n"
        + "How do snails get their shells so shiny? \nThey use snail varnish! \n\n"
        + "Where do you find giant snails?\nAt the end of giants fingers! \n\n" 
        + "What does a snail wear to go dancing??\nEscargogo boots.  \n\n"
        + "Why is the snail the strongest animal? \nBecause he carries a house on his back! \n\n"
        + "How do snails make important calls? \nOn shell phones. \n\n "
        + "What happened when Turbo lost his shell? \nHe began to feel sluggish. \n\n"
        + "What did the snail say to the other who had hit him and run off? \nI'll get you next slime! \n\n"
        + "What was the snail doing on the highway? \nAbout one mile a day! \n\n" 
        + "What is the definition of a slug? \nA snail with a housing problem! \n\n" 
        + "What did the snail say as he slipped down the wall? \nHow slime flies! \n\n"
        + "How do you know your kitchen floor is dirty? \nThe snails leave a trail on the floor that reads \"clean me\"! \n\n"
        + "I felt so guilty after I stepped on a snail this morning. \nYou should of seen him, he looked genuinely crushed.")
})


module.exports = router;