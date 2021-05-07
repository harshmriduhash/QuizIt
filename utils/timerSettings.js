// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.
// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.
const timerSettings={
	production:{
		preGame:5, // sets initial timer for preGame phase
		intermission:5, // sets timer for intermission phase
		gameEnd:10, // sets timer for gameEnd phase
		questionActive:10, // sets timer for questionActive phase
		voting:10,
		loading:3,
		tickInterval:1000, // sets the timer tick interval
		// ping:4000 // sets ping comparing answers
	},
	testing:{
		preGame:2, // sets initial timer for preGame phase
		intermission:2, // sets timer for intermission phase
		gameEnd:20, // sets timer for gameEnd phase
		questionActive:2, // sets timer for questionActive phase
		voting:2,
		loading:2,
		tickInterval:500, // sets the timer tick interval
		// ping:750 // sets ping comparing answers
	}
}
// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.
// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.

module.exports = timerSettings;