const axios = require('axios');
const QuestionBackup = require("../models/questionBackup.js");

const populateBackupQuestions = (questionNumber)=>{
	QuestionBackup.count({},(err,count)=>{
		// Counts how many backup questions. If <2000, keep populating the database
		if(count < questionNumber){
		console.log('Currently at '+count+' backup questions.');
		// API call to get the questions
		axios.get('https://opentdb.com/api.php?amount=50&type=multiple')
			.then(res=>{
				const questions = res.data.results;
				questions.forEach(question=>{
					QuestionBackup.findOneOrCreate({question: question.question}, question, (err, result) => {
					});
				})
			})
			.catch(err=>{
				throw err;
			})
			setTimeout(()=>{
				populateBackupQuestions(questionNumber)
			},2500)
		}
		else{
			console.log('Got enough backup questions. '+count+' backup questions.');
		}
	})
}

module.exports = populateBackupQuestions;