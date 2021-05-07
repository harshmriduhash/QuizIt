const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    id: {
        type: String
    },
    users: {
        type: Array
    },
    questions: {
        type: Object
    },
    score: {
        type: Object
    },
    numQuestions: {
        type: Number
    },
    category: {
        type: Number
    },
    difficulty: {
        type: String
    },
    type: {
        type: String
    }
});

const Game = module.exports = mongoose.model('Game', GameSchema);