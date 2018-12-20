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

// @route   GET api/data/tenants/:tenant/items/:type/:id
// @desc    Get db entries have a "type" with an "id"
// @access  Public
router.get('/tenants/:c/searchByKey/:type/:id', (req, res) => {
    Item.find({"authorized.tenants" : {$in: req.params.c.split(',')}, [req.params.type] : req.params.id})
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4)))
});

// @route   GET api/data/tenants/:tenant/items/:type/:id
// @desc    Get db entries have a "type" with an "id"
// @access  Public
router.get('/tenants/:c/search', (req, res) => {
    Item.find({"authorized.tenants" : {$in: req.params.c.split(',')}})
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4)))
});


// @route   GET api/data/tenants/:tenant/items/:type/:id/:page/:pageSize
// @desc    Get db entries have a "type" with an "id" from a page of "page"
// @access  Public
router.get('/tenants/:c/search/:str', (req, res) => {
    Item.find({"authorized.tenants" : {$in: req.params.c.split(',')}, $or: [ 
        ({ $where: RegExp(req.params.str) + ".test(this.serial)" }),
        {company: RegExp(req.params.str, 'i')},
        {model: RegExp(req.params.str, 'i')},
        {fullModel: RegExp(req.params.str, 'i')},
        {osVersion: RegExp(req.params.str, 'i')},
    ]})
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4)))
});

// @route   GET api/data/items/tenants/:c
// @desc    Get db entries that follow at least one group of c, separated by '-'
// @access  Public
router.get('/tenants/:c/count/:str', (req, res) => {
    Item.count({"authorized.tenants" : {$in: req.params.c.split(',')}, $or: [ 
        ({ $where: RegExp(req.params.str) + ".test(this.serial)" }),
        {company: RegExp(req.params.str, 'i')},
        {model: RegExp(req.params.str, 'i')},
        {fullModel: RegExp(req.params.str, 'i')},
        {osVersion: RegExp(req.params.str, 'i')},
    ]})
        .then(item => res.send(item))
});

// @route   GET api/data/items/list/:c
// @desc    Get db entries that follow at least one group of c, separated by '-'
// @access  Public
router.get('/list/:c', (req, res) => {
    Item.find({},{[req.params.c]: 1, _id: 0 })
        .then(item => res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(item, null, 4))
        ).catch(err => console.log(err))
});

// @route   POST api/data
// @desc    Create a Post
// @access  Public
router.post('/', (req, res) => {
    var newItem = new Item({
        name: req.body.serialNumberInserv + '-' + new Date(req.body.updated).toISOString().substr(0, 10) + '.json',
        serial: req.body.serialNumberInserv,
        company: req.body.system.companyName,
        model: req.body.system.model,
        fullModel: req.body.system.fullModel,
        osVersion: req.body.system.osVersion,
        capacity: [req.body.capacity.total.freeTiB, req.body.capacity.total.sizeTiB],
        capacityLeft: Math.floor((1 - req.body.capacity.total.freeTiB / req.body.capacity.total.sizeTiB) * 100),
        updated: req.body.updated,
        authorized: req.body.authorized,
        date: req.body.date,
        content: req.body,
        prev : []  // <<== should we change??
    });
    // serial -> find row with that serial
    // if that row exists, take content.
    // replace all values in found item to NEW posted item from body ^ (including content)
    // make new field "previous": [][], [0][0] date, [0][1] content
    // => "previous" : [][] --- 
    //[0][0] : date, [0][1] : content
    //[1][0] : date, [1][1] : content
    //[2][0] : date, [2][1] : content
    // content: [req.body, (dbfound).content.floor]
    let findFromTable = new Item();
    let prevS = []
    Item.find({serial: req.body.serialNumberInserv}).then(item=> {
        //console.log(item)
        if (item.length != 0) {
            
            if(item[0].prev != null)
                {
                    newItem.prev = item[0].prev     
                }
            newItem.prev.push(item[0].content)  
            // console.log("------------------------")   
            // console.log(newItem)
            Item.deleteOne({'serial': req.body.serialNumberInserv})

            // push prev to prev 
            // remove current item
            // save new item
            //item.udpate({ } )
        }
    }) 
        
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