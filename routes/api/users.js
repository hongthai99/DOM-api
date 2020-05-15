const express = require('express');
const router = express.Router();
//const listControl = require('../../controller/list-Controller');

//
const bcrypt = require('bcryptjs');
//
const config = require('config');
const jwt = require('jsonwebtoken');

//list model
const User = require('../../models/user');

//@route POST api/users
//@desc post user
//access Public
router.post('/', (req, res, next) => {
    const {name, email, password } = req.body;

    //simple dieu kien dien pass
    if(!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fileds'});
    }

    //Check for user exits
    User.findOne({email})
      .then(user => {
            if(user)
                return res.status(400).json({msg: 'User already exits'});
            const newUser = new User ({
                name, 
                email,
                password
            });

            //create satl and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign({
                                id: user.id
                            },
                            config.get('jwtSecret'),
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                            )
                            
                        });
                })
            })
      })
});

//@route POST /postlist
//@desc post all list need do it
//@access 
//router.post('/', (req, res, next) => {
//    const name = req.body.name;
//    //const desc = req.body.descrition;
//    const newlist = new List({
//        name: name,
//        //descrition: desc,
//    });
//    newlist.save()
//    .then(list => res.json(list))    
//    .catch(err => console.log(err))
//});


//@route DEl /api/list/:id
//@desc del any list
//@access 
//router.delete('/:id', (req, res, next) => {
//    List.findById(req.params.id)
//    .then(list => list.remove().then(()=>res.json({success: true})))
//    .catch(err => res.status(404).json({success: false}));
//});


module.exports = router;