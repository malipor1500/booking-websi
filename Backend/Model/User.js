let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

const url = require('./Constants').URL;

mongoose.connect(url);
let db = mongoose.connection;

// User Schema
let userSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    role:{
        type: String
    }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
    let query = {email: email};
    User.findOne(query, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        callback(null, isMatch)
    });
};

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
