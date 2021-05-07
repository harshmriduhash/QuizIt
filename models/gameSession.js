const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    id: {
        type: String
    },
    users: {
        type: Array
    },
    questions: {
        type: Array
    },
    scores: {
        type: Array
    },
    numQuestions: {
        type: Number
    },
    difficulty: {
        type: String
    },
    type: {
        type: String
    }
});

const GameSessionSchema = new mongoose.Schema({
    users: {
        type: Array
    },
    currentGame: {
        type: Object
    },
    id: {
        type: String
    },
    type: {
        type: String
    },
    games: [GameSchema]
});

const Session = module.exports = mongoose.model('Session', GameSessionSchema);