const express = require('express');
const multer = require('multer');
const Hotel = require('../../Model/Hotel');
const path = require('path');
const fileSystem = require('fs');
const uniqueFilename = require('unique-filename');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        let filename = uniqueFilename('', file.fieldname);
        cb(null, filename);
    }
});

var upload = multer({storage: storage});

const router = express.Router();

// get hotels
router.get('/:city', (req, res) => {
    Hotel.getHotelsPerCity(req.params.city, function (err, hotels) {
        if (err) res.send(404);
        console.log(hotels);
        res.send(hotels)
    });

});

// get hotels domestic
router.get('/worldwide/domestic', (req, res) => {
    res.status(200).send(['isfahan', 'tehran', 'mashhad', 'shiraz', 'tabriz']);
});

// get hotels international
router.get('/worldwide/international', (req, res) => {
    res.status(200).send(['istanbul', 'paris', 'dubai', 'tbilisi', 'ankara', 'baku']);
});

// find by id
router.get('/hotel/:id', (req, res) => {
    Hotel.getHotelById(req.params.id, function (err, hotel) {
        if (err) res.send(404);
        res.send(hotel)
    })
});

router.get('/image/:id', (req, res) => {
    console.log("send file ...");
    let filePath = path.join(__dirname, '../../public/uploads/' + req.params.id);
    let stat = fileSystem.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': stat.size
    });
    let readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
});

// post hotels
router.post('/hotel', upload.array('files', 6), (req, res, next) => {
    console.log('################################################');
    console.log('adding hotel to the db');
    console.log(req.body);
    console.log(req.files);

    let reqHotel = JSON.parse(req.body.hotel);

    let images = [];
    req.files.map(k => {
        images.push(k.filename);
    });

    let hotel = new Hotel({
        name: reqHotel.name,
        city: reqHotel.city,
        address: reqHotel.address,
        facilities: reqHotel.facilities,
        warnings: reqHotel.warnings,
        images: images
    });

    Hotel.createHotel(hotel, function (err, hotel) {
        if (err) throw err;
        console.log(hotel);
        res.send(201);
    });
});


module.exports = router;