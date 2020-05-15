const express = require('express');
const router = express.Router();
//const listControl = require('../../controller/list-Controller');

//
const bcrypt = require('bcryptjs');
//
const config = require('config');
//
const jwt = require('jsonwebtoken');
//
const auth = require('../../middleware/auth')

//list model
const User = require('../../models/user');

//@route POST api/auth
//@desc auth user
//access Public
router.post('/', (req, res, next) => {
    const {email, password } = req.body;

    //simple dieu kien dien pass
    if(!email || !password) {
        return res.status(400).json({msg: 'Please enter all fileds'});
    }

    //Check for user exits
    User.findOne({email})
      .then(user => {
            if(!user)
                return res.status(400).json({msg: 'User does not exits'});

            //Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch)
                    return res.status(400).json({msg: 'Invalid credential'})

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
                })
      })
});

//@route GET api/auth/user
//@desc get user
//access Private
router.get('/user', auth,(req, res)=> {
    User.findById(req.user.id)
       .select('-password')
       .then(user=> res.json(user));
});



module.exports = router;