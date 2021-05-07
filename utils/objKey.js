// Sent from react during login to join 'master' socket room, gameSession's users array, and game's users array
var loginObj = {
	name:"Poop",
	username:"Poop",
	id:"someMongoUserID",
	email:"poop@poop.com"
}

// UserObj
var user = {
	name:"Poop",
	username:"Poop",
	id:"someMongoUserID",
	email:"poop@poop.com",
	stats:{
		answered:10,
		correct:5
	}	
}

// Individual player score object stored in scores array for game.js.
var scoresObj = {
	id:"someMongoUserID",
	name:"user.name",
	score:5
}

// openTrivia's question object. plugged in as an array containing 10'ish of these question objects
var question = {
	category:"Entertainment: Film",
	type: "multiple",
	difficulty: "medium",
	question: "What is the name of the robot in the 1951 science fiction film classic &#039;The Day the Earth Stood Still&#039;?",
	correct_answer: "Gort",
	incorrect_answers: [
		"Robby",
		"Colossus",
		"Box"
	]
}

// reformatted object for game.currentQuestion
var currentQuestion = {
	category:"Entertainment: Film",
	type: "multiple",
	difficulty: "medium",
	question: "What is the name of the robot in the 1951 science fiction film classic &#039;The Day the Earth Stood Still&#039;?",
	answers: [
		"Robby",
		"Colossus",
		"Box",
		"Gort"
	]
}

// Object sent from socket every second.
var socketObj = {
	users:[loginObj,loginObj],
	question:currentQuestion,
	correctAnswer:"Gort",
	gameState:"pregame",
	timer:10,
	totalQuestions:10,
	questionNum:0,
	scores:[scoresObj,scoresObj]
}

// Sent from react to game.js when a player clicks on an answer.
var answerObj = {
	id: "someMongoUserID",
	name: "user.name",
	answer: "user's selected answer",
	questionNum: 5,
	timer: 3,
	room: "master", //Will be "master" until multiple rooms
	answered: true
}