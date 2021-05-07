# QuizIt
QuizIt! Trivia Game

## Welcome!

To run a react development environment for this branch run the following in the root Quizit directory to install all the dependencies:
```
yarn installDeps
```

Make sure you have mongod installed and functioning. Open a 2nd terminal window and run the following to start your mongodb server:
```
mongod
```

To start up your server and react-client, run the following command in the root Quizit directory:
```
yarn start
```

Once the page loads, follow these steps:

1. Register if you don't have a username/password registered
2. Login with your username and password
3. Open the console and see the magic!
    * FYI the game starts 10 seconds after the server is up and running.

![console-preview](./readme/quizit-readme-1.png "console-preview")

Currently, Home.js is properly setting its own state based on the data being sent from the server every second. The next tasks involve rendering these elements in a universal container for all four main components.

The code that makes this happen in Home.js is:
``` Javascript
//Used for yarn start
socket.on('gameState', (msg) => {

  console.log(msg);
  //Sets gameState based on response. Sets timer. Sets questions and correctAnswer when applicable.
  this.setState({timer:msg.timer});
  if(this.state.gameState !== msg.gameState){
    this.setState({gameState:msg.gameState,question:msg.question,correctAnswer:msg.correctAnswer}, ()=>{
      console.log(this.state.question);
      console.log("this.state.gameState changed to "+this.state.gameState);
      console.log("this.state.correctAnswer changed to "+this.state.correctAnswer);
    })
  }
});
```

The four components of gameState are:

1. Pregame
	* Display something, idk. Something about the game. The logo. Kittens.
2. QuestionActive
	* Display the question with the choices selectable.
3. Intermission
	* Display the question with the correct answer in green, and if you got it wrong, the wrong answer in red.
4. GameEnd
	* Display the number of questions you got right along with a leaderboard

Ideally, we want all four of the gameState components to be in the same stylized container, let's call it quizitPlayground, which will always be on the screen regardless of which gameState it is. quizitPlayground does not change between the rounds. Only the components inside quizitPlayground will change. We also want to use react-bootstrap. After we get these four gameState components rendering with their intended functionality, we need to convert register and login into modals.