# Reservation and Booking Management Website
This repository contains a website developed for booking hotels, flights, tours, etc. In addition, 
it includes a booking management section designed for hotel managers to add information and pictures
of the hotel. The backend of the website under the `Backend` directory is developed using [NodeJS](https://nodejs.org/en/), and the frontend 
under the `Frontend` directory is developed using [VueJS](https://vuejs.org/). For the database, we used [MongoDB](https://www.mongodb.com/)
to store customer information, hotel information, and reservation information. Here I'm going to explain how to run 
the website on Ubuntu. You can find similar commands to run the website on an arbitrary OS.

## Database
For installing MongoDB on your computer, please follow this [link](https://www.mongodb.com/docs/manual/installation/). 
After installing MongoDB, you should run it so that the server can access it for reading and storing data. 
To run MongoDB on linux, run the following code:
```
$ sudo systemctl start mongod
```
If you receive an error similar to the following when starting MongoDB:
```
Failed to start mongod.service: Unit mongod.service not found.
```
Run the following command first:
```
$ sudo systemctl daemon-reload
```
After running MongoDB, verify that it has started successfully by running the following command:
```
$ sudo systemctl status mongod
```
You can stop the MongoDB process by issuing the following command:
```
$ sudo systemctl stop mongod
```
And then you can restart it by issuing the following command:
```
$ sudo systemctl restart mongod
```

## Backend
In order to run the server, you should first have version 8 of NodeJS installed. The best way to do that is to use 
`nvm` (Node Version Manager). For installing `nvm` please follow the information on its [GitHub repository](https://github.com/nvm-sh/nvm).
After installing `nvm`, run the following command to use `node` version 8 if you have installed `nvm` for the first time:
```
$ nvm install 8 
Now using node v8.17.0 (npm v6.13.4)
```
If you have already installed `node` v8 using `nvm`, then run the following command to use `node` version 8:
```
$ nvm use 8
Now using node v8.17.0 (npm v6.13.4)
```
Check whether you have the right `NodeJS` loaded by issuing the following command:
```
$ node -v
v8.17.0
```
Then go to the `Backend` directory and run the following command to install the required dependencies.
```
$ npm install 
```
and then in order to run the server, issue the following command:
```
$ npm run dev
```
If you have installed everything successfully, then the server would listen on port 5000:
```
server is listening on port 5000!
```
## Frontend
The frontend is developed using `VueJS`. You should use `node` version 8 for the frontend as well. After running `$ nvm use 8`, go to the `Frontend`
directory and run the following command to install the required dependencies:
```
$ npm install 
```
Then run 
```
$ npm run dev
```
to run the frontend. If all the steps were successful, you should see the frontend of the website running on http://localhost:8080/.

### Using the website
To see different parts, you should sign in first, or if you haven't registered yet, you should signup. 
Also, if you have logged in as the admin, you can see features like adding and updating hotel information. 
The admin role should be defined by the server's admin in the database.

