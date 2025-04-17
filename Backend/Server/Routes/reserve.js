const express = require('express');
const Reserve = require('../../Model/Reserve');
const router = express.Router();


// find user reserves
router.get('/user/:id', (req, res) => {
    Reserve.getAllUserReserves(req.params.id, function (err, reserves) {
        if (err) throw err;
        console.log(reserves);
        res.send(reserves);
    });
});

// find reserves for room
router.get('/room/:id', (req, res) => {
    Reserve.getAllRoomReserves(req.params.id, function (err, reserves) {
        if (err) throw err;
        console.log(reserves);
        res.send(reserves);
    });
});

// register reserve
router.post('/', (req, res) => {
    let reserve = new Reserve({
        entranceDate: req.body.entranceDate,
        exitDate: req.body.exitDate,
        userID: req.body.userID,
        roomID: req.body.roomID,
    });

    Reserve.createReserve(reserve, function (err, reserve) {
        if (err) throw err;
        console.log(reserve);
        res.send(201, "Successfully reserved!");
    })
});


module.exports = router;