const express = require("express");
const http = require('http');
const socketIO = require('socket.io');
const triviaCall = require('./triviaCall/triviaCall');

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const PORT = process.env.PORT || 3001;
const app = express();

// Trivia Call
// triviaCall((response) => {console.log(response.data.results);});

// Import the game manager
const GameManager = require('./src/gameManager');
// For forcing 1 session or MVP
var sessionCount = 0;

// Create server instance
const server = http.createServer(app);

// Create our socket using the instance of the server
const io = socketIO(server);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/quizit"
);

mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

// Populates backup questions. If there are 2000 backup questions, it does not populate anymore
const populateBackupQuestions = require('./utils/populateBackupQuestions.js');
populateBackupQuestions(200);

const users = require('./routes/users');

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static("client/build"));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

gameManager = new GameManager(io);
gameManager.createSession('master');

// Server side socket.io event configuration
io.on('connection', function(socket) {

  console.log('a user connected');

  socket.broadcast.emit('connection', 'a user connected')

  socket.on('disconnect', function() {
    console.log('user disconnected');
    socket.broadcast.emit('connection', 'a user disconnected')
  });

  // socket.on('testSend', function(msg) {
  //   console.log(msg);
  // });

  // Logs people in and joins room 'master'
  socket.on('loggedIn', function(params){
    // console.log("User just logged in!!!");
    socket.join(params.room);
    gameManager.addUser(params.user,params.room);
  });

  // Joins a socket room
  socket.on('room', function(params){
    socket.join(params.room);
  });

  // Receives answers from react client
  socket.on('answer', function(answerObj){
    // Call some function to do stuff in gameManager -> gameSession -> game
    gameManager.handleAnswer(answerObj)
  });

  socket.on('vote', function(voteObj){
    // Call some function to do stuff in gameManager -> gameSession -> game
    gameManager.handleVote(voteObj)
  });

  socket.on('chatSend', function(chatObj) {
    console.log(chatObj.user.name + ": " + chatObj.msg);
    socket.broadcast.emit('chatReceive', chatObj);
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`)
});