const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


// Routes
hotels = require('./Routes/hotel');
users = require('./Routes/user');
reserves = require('./Routes/reserve');
rooms = require('./Routes/room');


app.use('/hotels', hotels);
app.use('/user', users);
app.use('/reserve', reserves);
app.use('/rooms', rooms);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`server is listening on port ${port}!`)});