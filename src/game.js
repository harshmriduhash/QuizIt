const axios = require('axios');
const omit = require('../utils/myOmit.js');
const shuffle = require('../utils/shuffle.js');
const Session = require('../models/gameSession');
const categoriesArr = require('../utils/categories.js').categoriesArr;
const User = require('../models/user');

// You can adjust your own testing timer settings in utils/timerSettings.js
// Uncomment this one for production timerSettings. Make sure to comment out testing.
const timerSettings = require('../utils/timerSettings.js').production;

// Uncomment this one for testing timerSettings. Make sure to comment out production.
// const timerSettings = require('../utils/timerSettings.js').testing;

function Game (questions, users, settings, io, newGame){

    // Game Data Variables Go Here
    this.gameData = {
        // id of game
        _id: undefined,
        // id of Session for updating Session.games
        sessionId: undefined,
        // The settings from the API call
        category: settings.category,
        difficulty: settings.difficulty,
        type: settings.type,
        // Users who have played in the current game
        users: users,
        // Timer for tracking countdowns for questions or to next question
        timer: timerSettings.preGame,
        // Questions for the current game. Called for the current API.
        questions: questions,
        // Total number of questions
        totalQuestions: questions.length,
        // The current question
        currentQuestion: undefined,
        // Current question to be sent to client.
        questionToBeSent: undefined,

        questionNum: -1,
        // Current Answer 
        correctAnswer: undefined,
        // Game state variable for tracking PreGame, QuestionActive, Intermission, or GameEnd
        gameState: 'pregame',
        // Client Answers for rendering on front-end
        clientAnswers: [],
        // Scores object for holding all final scores
        scores: [],

        votingCategories:[],

        votingCategoriesObj:{},
        // Socket object for sending to client.
        socketObj: {
            users:[],
            question:{},
            correctAnswer:"",
            gameState:"pregame",
            timer:10,
            totalQuestions:0,
            questionNum:0,
            category: "",
            votingCategories:[]
        },
        categoryVotes: []
    };
    
    this.initializeGame = () => {
        // Start pregame countdown to first question
        // this.gameData.gameState = 'pregame';
        this.gameData.currentQuestion = this.gameData.questions[this.gameData.questionNum];
        // this.gameData.clientAnswers = this.randomizeAnswers();
        this.setUserScoreObjs();
        this.gameData.votingCategories = shuffle(categoriesArr).slice(0,3);
        this.gameData.votingCategories.forEach(votingObj=>{
            this.gameData.votingCategoriesObj[votingObj.categoryNum] = votingObj;
            this.gameData.votingCategoriesObj[votingObj.categoryNum].votes = 0;
        })
        // console.log(this.gameData.votingCategories);
        // console.log(this.gameData.votingCategoriesObj);
        this.tickInterval();
    };

    // Method that transitions to the next game state phase (Question to Intermission, etc.)
    this.gameLoopStep = () => {
        switch(this.gameData.gameState) {
            case 'pregame':
                // addGame(this.gameData._id);
                this.resetTimer(timerSettings.questionActive);
                this.gameData.gameState = 'questionActive';
                this.nextQuestion();
                console.log('Question Number: '+this.gameData.questionNum+1);
                this.tickInterval();
                break;
            case 'questionActive':
                this.resetTimer(timerSettings.intermission);
                this.gameData.gameState = 'intermission';
                this.gameData.correctAnswer = this.gameData.currentQuestion.correct_answer;
                console.log('Intermission');
                // setTimeout(()=>{
                //     this.calculateScores();    
                // },timerSettings.ping)
                this.tickInterval();
                break;
            case 'intermission':
                if (this.gameData.totalQuestions == this.gameData.questionNum+1) {
                    this.calculateScores(); 
                    this.resetTimer(timerSettings.gameEnd);
                    this.gameData.gameState = 'gameEnd';
                    console.log('Game End!');
                    this.removeIdleScores();
                    this.tickInterval();
                    break;
                } else {
                    this.calculateScores();
                    this.resetTimer(timerSettings.questionActive);
                    this.gameData.gameState = 'questionActive';
                    this.gameData.correctAnswer = undefined;
                    this.nextQuestion();
                    console.log('Question Number: '+(parseInt(this.gameData.questionNum)+1));
                    this.tickInterval();
                    break;
                } 
            case 'gameEnd':
                this.tickInterval();
                this.gameData.gameState = 'voting';
                console.log('Voting start!');
                this.resetTimer(timerSettings.voting);
                break; 
            case 'voting':
                this.resetTimer(timerSettings.loading);
                this.gameData.gameState = 'loading'
                console.log('loading');
                this.tickInterval();
                break;
            case 'loading':
                clearInterval(this.tick);
                const APIParams = {
                    category:this.calculateCategory()
                }
                this.saveGame(newGame,APIParams);
                break;
        }
    }
    // Game tick variable for storing our interval
    this.tick = undefined;
    // Clears interval and resets it
    this.tickInterval = () => {
        clearInterval(this.tick);
        // Lowered handleTick for testing purposes
        this.tick = setInterval(this.handleTick, timerSettings.tickInterval);
    }
    // Acts on the interval tick. Updates client on tick. Calls gameLoopStep() if timer < 0.
    this.handleTick = () => {
        this.gameData.socketObj = {
            users:this.gameData.users,
            question:this.gameData.questionToBeSent,
            correctAnswer:this.gameData.correctAnswer,
            gameState:this.gameData.gameState,
            timer:this.gameData.timer,
            totalQuestions:this.gameData.totalQuestions,
            questionNum:this.gameData.questionNum+1,
            scores:this.gameData.scores,
            category: this.gameData.category,
            votingCategories: this.gameData.votingCategories
        }
        this.gameData.timer--;
        io.sockets.to('master').emit('gameState', this.gameData.socketObj);
        // moved this here so it will still tick at 0 and reset at 0 instead of having a 1 second delay
        if (this.gameData.timer < 0) {
            this.gameLoopStep();
        }
    }

    // General methods go here
    // Sets up the next question
    this.nextQuestion = () => {
        // Function for setting the next current Question goes here.
        this.gameData.questionNum++;
        this.gameData.currentQuestion = questions[this.gameData.questionNum];
        this.gameData.questionToBeSent = omit(this.gameData.currentQuestion, "correct_answer");
        this.gameData.questionToBeSent = omit(this.gameData.questionToBeSent, "incorrect_answers");
        this.gameData.questionToBeSent.answers = this.randomizeAnswers();
        this.gameData.category = this.gameData.currentQuestion.category;
    }

    // Method or randomizing the answers and generating the client-facing question object.
    this.randomizeAnswers = () => {
        // Create temporary array to store our answers before shuffling
        let answers = [];
        // Push the correct answer
        answers.push(this.gameData.currentQuestion.correct_answer);
        // Concatenate the array of incorrect answers
        answers = answers.concat(this.gameData.currentQuestion.incorrect_answers);
        // Shuffle the array
        shuffle(answers);
        
        return answers;
    }
    // Resets the game timer
    this.resetTimer = (time) => {
        this.gameData.timer = time;
    }
    // Saves the game document to the database and returns the MongoDB Object ID
    this.saveGame = (cb,APIParams) => {
        // gameObj for cultivating mongoDB games object
        const gameObj = {
            users:this.gameData.users,
            questions:this.gameData.questions,
            // Dummy scores data. Will be set to this.gameData.scoress
            scores:this.gameData.scores,
            numQuestions: this.gameData.numQuestions,
            difficulty: this.gameData.difficulty,
            type: this.gameData.type
        }

        // Mongoose query for updating a subdocument
        Session.findOneAndUpdate({
            "_id": this.sessionId, 
            "games._id": this._id
        },
        {
            "$set": {
                "games.$":gameObj
            }
        }).then(res=>{
            // initializes newGame
            if(cb){
                cb(APIParams);
            }
        })
    }

    this.addUser = (user)=>{
        this.gameData.users.push[user];
        // console.log(this.gameData.users);
        const scoreObj = {
            username:user.username,
            score:0,
            id:user.id,
            answered:false
        }
        this.gameData.scores.push(scoreObj);
    }

    this.setUserScoreObjs = ()=>{
        const users = this.gameData.users
        if(users){
            const tempScores = [];
            users.forEach(data=>{
                const scoreObj = {
                    username:data.username,
                    score:0,
                    id:data.id,
                    answered:false
                }
                tempScores.push(scoreObj);
            })
            this.gameData.scores = tempScores;
        }
    }

    this.calculateScores = ()=>{
        console.log('CALCULATING SCORES');
        if(this.gameData.clientAnswers.length > 0){
            this.gameData.clientAnswers.forEach(clientAnswer=>{
                if(clientAnswer.answered === true){
                    if(clientAnswer.answer === this.gameData.correctAnswer){
                        this.gameData.scores.forEach(score=>{
                            if(clientAnswer.id === score.id){
                                score.score++;
                                console.log(score.username+' got one right!');
                                User.findOne({_id:clientAnswer.id}).then(res=>{
                                    if(res.stats){
                                        console.log(res);
                                        res.stats.answered++;
                                        res.stats.correct++;
                                        res.markModified('stats');
                                        console.log(res);
                                        res.save(function(err){
                                            if (err) throw err;
                                        });
                                    }
                                    else{
                                        res.stats = {
                                            answered:1,
                                            correct:1
                                        }
                                        res.markModified('stats');
                                        res.save(function(err){
                                            if (err) throw err;
                                        });
                                    }
                                })
                                clientAnswer.answered = false;
                            }
                        })
                    }
                    else{
                        console.log(clientAnswer.username+' WRONG!');
                        User.findOne({_id:clientAnswer.id}).then(res=>{
                            if(res.stats){
                                console.log(res);
                                res.stats.answered++;
                                res.markModified('stats');
                                res.save(function(err){
                                    if (err) throw err;
                                });
                            }
                            else{
                                res.stats = {
                                    answered:1,
                                    correct:0
                                }
                                res.markModified('stats');
                                res.save(err=>{
                                    if (err) throw err;
                                })
                            }
                        })
                        clientAnswer.answered = false;
                    }
                }
            })
        }
    }

    this.removeIdleScores = ()=>{
        console.log('KEEPING ALL NON-IDLE PLAYERS IN SCORES');
        const tempScores = []
        this.gameData.clientAnswers.forEach(clientAnswer=>{
            this.gameData.scores.forEach(score=>{
                if(clientAnswer.id === score.id){
                    tempScores.push(score);
                }
            })
        })
        this.gameData.scores = tempScores;
    }

    this.handleAnswer = (answerObj)=>{
        if(this.gameData.clientAnswers.length>0){
            for(var i = 0; i<this.gameData.clientAnswers.length; i++){
                if(this.gameData.clientAnswers[i].id === answerObj.id){
                    this.gameData.clientAnswers[i] = answerObj;
                    break;
                }
                else if(i === this.gameData.clientAnswers.length-1){
                    this.gameData.clientAnswers.push(answerObj);
                }
            }
        }
        else{
            this.gameData.clientAnswers.push(answerObj);
            // console.log('CLIENTANSWERS');
            // console.log(this.gameData.clientAnswers);
        }
    }

    this.handleVote = (voteObj)=>{
            if(this.gameData.categoryVotes.length>0){
                for(var i = 0; i<this.gameData.categoryVotes.length; i++){
                    if(this.gameData.categoryVotes[i].id === voteObj.id){
                        this.gameData.categoryVotes[i] = voteObj;
                        // console.log(this.gameData.categoryVotes);
                        break;
                    }
                    else if(i === this.gameData.categoryVotes.length-1){
                        this.gameData.categoryVotes.push(voteObj);
                        // console.log(this.gameData.categoryVotes);
                    }
                }
            }
            else{
                this.gameData.categoryVotes.push(voteObj);
                // console.log(this.gameData.categoryVotes);
            }
    }

    this.calculateCategory = ()=>{
        console.log('Calculating category');
        if(this.gameData.categoryVotes.length > 0){
            this.gameData.categoryVotes.forEach(vote=>{
                this.gameData.votingCategoriesObj[vote.categoryNum].votes++;
            })
            var sortable = [];
            for (var key in this.gameData.votingCategoriesObj) {
                sortable.push(this.gameData.votingCategoriesObj[key]);
            }
            sortable.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));
            console.log('Returning Category '+sortable[0].categoryNum);
            return sortable[0].categoryNum;
        }
        else{
            console.log('Returning Category 0');
            return 0;
        }
    };
}

module.exports = Game;