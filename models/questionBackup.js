const mongoose = require('mongoose');

const QuestionBackupSchema = new mongoose.Schema({
    category: {
        type: String
    },
    type: {
        type: String
    },
    difficulty: {
        type: String
    },
    question: {
        type: String
    },
    correct_answer: {
        type: String
    },
    incorrect_answers: {
        type: Array
    }
});

QuestionBackupSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc, callback) {
  const self = this;
  self.findOne(condition, (err, result) => {
    return result 
      ? callback(err, result)
      : self.create(doc, (err, result) => {
        return callback(err, result);
      });
  });
};

const QuestionBackup = module.exports = mongoose.model('QuestionBackup', QuestionBackupSchema);