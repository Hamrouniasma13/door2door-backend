const express = require("express");
var cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const Socket = require("./api/socket");
const mongoose = require("mongoose")
// start server
const app = express();
const server = http.createServer(app);

// socket listening on port 5002
server.listen(5002);
const io = socketIo(server);
const socket = Socket.getInstance(io);

// connect to mongo database
const url = "mongodb+srv://HAMROUNI:1234**1234@cluster0-yhvkr.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, function (err, db) {
    if (err) {
        console.log('Failed to connect to DB with error -- Retrying in 10 seconds', {err});
        setTimeout(() => connectToDB(), 10000);
    } else {
        console.log('DB connected successfully ' + url);
    }
});

const vehicleRouter = require("./api/vehicle");
var apiRouter = express.Router();
var bodyParser = require("body-parser");

apiRouter.get("/", (req, res) => {
    res.json({message: "Backend API"});
});

app.use(bodyParser.json()); // Send JSON responses
app.use(bodyParser.urlencoded({extended: true})); // Parses urlencoded bodies
app.use("/", apiRouter);
app.use("/vehicles", vehicleRouter);
app.use(cors({origin: true, credentials: true}));

module.exports = app;
