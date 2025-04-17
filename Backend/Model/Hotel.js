let mongoose = require('mongoose');
const url = require('./Constants').URL;

mongoose.connect(url);
let db = mongoose.connection;

// Hotel Schema
let hotelSchema = mongoose.Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    facilities: {
        type: Array
    },
    warnings: {
        type: String
    },
    images: {
        type: Array
    }
});

var Hotel = module.exports = mongoose.model('Hotel', hotelSchema);

module.exports.getHotelById = function (id, callback) {
    Hotel.findById(id, callback);
};

module.exports.getHotelsPerCity = function (city, callback) {
    Hotel.find({city: city}, callback);
};

module.exports.getAllHotels = function (callback) {
    Hotel.find({}, callback);
};

module.exports.createHotel = function (newHotel, callback) {
    newHotel.save(callback);
};