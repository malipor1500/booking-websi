let mongoose = require('mongoose');
const url = require('./Constants').URL;

mongoose.connect(url);

// Room Schema
let roomSchema = mongoose.Schema({
    hotelID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Hotel'
    },
    name: {
        type: String
    },
    breakfast: {
        type: Boolean
    },
    adults: {
        type: Number
    },
    children: {
        type: Number
    }

});

var Room = module.exports = mongoose.model('Room', roomSchema);

module.exports.getRoomById = function (id, callback) {
    Room.findById(id, callback);
};

module.exports.getAllRoomsForHotel = function (hotelID, callback) {
    let query = {hotelID: hotelID};
    Room.find(query, callback);
};

module.exports.createRoom = function (newRoom, callback) {
    newRoom.save(callback);
};