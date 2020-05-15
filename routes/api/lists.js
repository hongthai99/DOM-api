const express = require('express');
const router = express.Router();
//const listControl = require('../../controller/list-Controller');

//list model
const List = require('../../models/list');
// auth req
const auth = require('../../middleware/auth');



//@route GET api/list
//@desc get all list need to do
//access Public
router.get('/', (req, res, next) => {
    List.find()
    .sort({date: 0})
    .then(lists => res.json(lists));
});

//@route POST /postlist
//@desc post all list need do it
//@access Private
router.post('/', auth, (req, res, next) => {
    const name = req.body.name;
    //const desc = req.body.descrition;
    const newlist = new List({
        name: name,
        //descrition: desc,
    });
    newlist.save()
    .then(list => res.json(list))    
    .catch(err => console.log(err))
});


//@route DEl /api/list/:id
//@desc delele any list
//@access Private
router.delete('/:id',auth, (req, res, next) => {
    List.findById(req.params.id)
    .then(list => list.remove().then(()=>res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});


module.exports = router;