import API from "./API";

const isLoggedIn = (callback) => {
	console.log("AuthCheck");
	if(localStorage.getItem('jwt')){
		API.checkLoggedIn(localStorage.getItem('jwt'))
			.then(res=>{
				console.log(res);
				if(callback){
					callback(res);
				}
				return true;
				// return res;
			})
			.catch(err=>{
				console.log(err);
				return false;
			});
	}
	else{
		console.log('false');
		return false;
	}
}

// const isLoggedIn = (callback,callback2) => {
// 	console.log("AuthCheck");
// 	if(localStorage.getItem('jwt')){
// 		API.checkLoggedIn(localStorage.getItem('jwt'))
// 			.then(res=>{
// 				console.log(res);
// 				callback(res);
// 			})
// 			.catch(err=>{
// 				return(false)
// 			});
// 	}
// 	else{
// 		console.log('not logged in');
// 		callback2()
// 		return(false)
// 	}
// }

export default isLoggedIn;