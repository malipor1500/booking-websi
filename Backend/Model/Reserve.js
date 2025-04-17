let mongoose = require('mongoose');
const url = require('./Constants').URL;

mongoose.connect(url);

// Reserve Schema
let reserveSchema = mongoose.Schema({
    entranceDate: {
        type: Date
    },
    exitDate: {
        type: Date
    },
    roomID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Room'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }
});

var Reserve = module.exports = mongoose.model('Reserve', reserveSchema);

module.exports.getReserveById = function (id, callback) {
    Reserve.findById(id, callback);
};

module.exports.getAllUserReserves = function (userID, callback) {
    let query = {userID: userID};
    Reserve.find(query, callback);
};

module.exports.getAllRoomReserves = function (roomID, callback) {
    let query = {roomID: roomID};
    Reserve.find(query, callback);
};

module.exports.getAllHotelReserves = function (hotelID, callback) {
    let query = {hotelID: hotelID};
    Reserve.find(query, callback);
};

module.exports.createReserve = function (newReserve, callback) {
    newReserve.save(callback);
};