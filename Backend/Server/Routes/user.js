const express = require('express');
const User = require('../../Model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

process.env.SECRET_KEY = 'secret-key';


// login users
router.post('/login', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    User.getUserByEmail(req.body.email, function (err, user) {
        if (err) res.send("Error: " + err);
        else {
            if (!user) {
                res.send(404, "Error: User not found");
            } else {
                User.comparePassword(req.body.password, user.password, function (err, isMatch) {
                    if (err) res.send(err);
                    else {
                        if (isMatch) {
                            const payload = {
                                _id: user._id,
                                email: user.email,
                                phone: user.phone,
                                role: user.role
                            };
                            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                                expiresIn: 1440
                            });
                            res.send(token)
                        } else {
                            res.send(400, "Error: Password is incorrect");
                        }
                    }
                })
            }
        }
    })
});

// register users
router.post('/register', (req, res) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        role: 'common'
    });
    User.findOne({email: req.body.email}).then(existedUser => {
        if (!existedUser) {
            User.createUser(user, function (err, user) {
                if (err) res.send('Error: ' + err);
                else {
                    res.json({status: user.email + " registered!"});
                }
            })
        } else {
            res.send(400, "User already exists!");
        }
    }).catch(err => {
        res.send(400, 'Error: ' + err)
    });
});

// register users
router.put('/edit/:id', (req, res) => {
    console.log("Editing....");

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            User.update({_id: req.params.id}, {
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                role: req.body.role
            }).then(user => {
                res.status(200).send(user)
            }).catch(err => {
                res.status(500).send(err)
            });
        });
    });
});

module.exports = router;