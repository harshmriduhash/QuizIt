const axios = require('axios');

const triviaAPI = (params,cb,cb2)=>{
	let url = 'https://opentdb.com/api.php?amount=10&type=multiple';
	if (params){
		if(params.category){
			if(params.category != 0){
				url += '&category='+params.category;
			}
		}
	}
	axios.get(url)
		.then(res=>{
			if(cb){
				cb(res);
			}
		})
		.catch(err=>{
			if(cb2){
				cb2();
			}
			throw err;
		})
}

module.exports = triviaAPI;