const express = require('express');
const Room = require('../../Model/Room');
const Reserve = require('../../Model/Reserve');
const Hotel = require('../../Model/Hotel');
const router = express.Router();


// find room for hotel
router.post('/hotel/:id', async (req, res) => {
    Room.getAllRoomsForHotel(req.params.id, async function (err, rooms) {
        if (err) throw err;
        let entrance = new Date(req.body.entranceDate);
        let exit = new Date(req.body.exitDate);
        let adults = req.body.numAdults;
        let children = req.body.numChildren;

        let finalRooms = [];
        for (let i = 0; i < rooms.length; i++) {
            Reserve.getAllRoomReserves(rooms[i]._id, await function (err, reserves) {
                let flag = true;
                if (!(adults === rooms[i].adults && children === rooms[i].children)) {
                    console.log(finalRooms);
                    if (i + 1 === rooms.length) {
                        res.send(finalRooms);
                    }
                    return
                }
                for (let j = 0; j < reserves.length; j++) {
                    if ((reserves[j].entranceDate.getTime() <= entrance.getTime() && entrance.getTime() <= reserves[j].exitDate.getTime()) ||
                        (reserves[j].entranceDate.getTime() <= exit.getTime() && exit.getTime() <= reserves[j].exitDate.getTime())) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    console.log("Fuck reserves");
                    finalRooms.push(rooms[i])
                }
                if (i + 1 === rooms.length) {
                    res.send(finalRooms);
                }
            });
        }
    })
});

// find room by id
router.get('/:id', async (req, res) => {
    Room.getRoomById(req.params.id, function (err, room) {
        if (err) throw err;
        res.send(room);
    })
});

// add room
// TODO: check if the hotel exists
router.post('/', (req, res) => {
    let room = new Room({
        hotelID: req.body.hotelID,
        name: req.body.name,
        breakfast: req.body.breakfast,
        adults: req.body.adults,
        children: req.body.children
    });

    Hotel.getHotelById(room.hotelID, function (err, hotel) {
        if (err) throw err;
        if (!hotel) {
            res.send(404, 'hotel not found!');
            return
        }
        Room.createRoom(room, function (err, room) {
            if (err) throw err;
            console.log('adding room to db ...');
            console.log(room);
            res.send(201, "Room added");
        })

    });
});


module.exports = router;