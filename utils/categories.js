// Count as of 4-16-2018 from https://opentdb.com/api_count_global.php

var categoryNum = [0,9,11,12,14,15,17,18,22,23,31]
var categoriesObj = {
	"0": {
		"category":"All Categories",
		"verified_questions": 3031
	},
	"9": {
		"category":"General Knowledge",
	    "verified_questions": 208
	},
	"11": {
		"category":"Entertainment: Film",
	    "verified_questions": 179
	},
	"12": {
		"category":"Entertainment: Music",
	    "verified_questions": 270
	},
	"14": {
		"category":"Entertainment: Television",
	    "verified_questions": 127
	},
	"15": {
		"category":"Entertainment: Video Games",
	    "verified_questions": 726
	},
	"17": {
		"category":"Science & Nature",
	    "verified_questions": 168
	},
	"18": {
		"category":"Science: Computers",
	    "verified_questions": 131
	},
	"22": {
		"category":"Geography",
	    "verified_questions": 217
	},
	"23": {
		"category":"History",
	    "verified_questions": 227
	},
	"31": {
		"category":"Entertainment: Japanese Anime & Manga",
	    "verified_questions": 138
	}
}

var categoriesArr = [
	{	
		"categoryNum":0,
		"category":"All Categories"
	},
	{
		"categoryNum":9,
		"category":"General Knowledge"
	},
	{
		"categoryNum":11,
		"category":"Entertainment: Film"
	},
	{
		"categoryNum":12,
		"category":"Entertainment: Music"
	},
	{
		"categoryNum":14,
		"category":"Entertainment: Television"
	},
	{
		"categoryNum":15,
		"category":"Entertainment: Video Games"
	},
	{
		"categoryNum":17,
		"category":"Science & Nature"
	},
	{
		"categoryNum":18,
		"category":"Science: Computers"
	},
	{
		"categoryNum":22,
		"category":"Geography"
	},
	{
		"categoryNum":23,
		"category":"History"
	},
	{
		"categoryNum":31,
		"category":"Entertainment: Japanese Anime & Manga"
	}
]

var verifiedQuestions = {
    "overall": {
        "total_num_of_questions": 6076,
        "total_num_of_pending_questions": 1688,
        "total_num_of_verified_questions": 3031,
        "total_num_of_rejected_questions": 1357
    },
    "categories": {
        "9": {
        	"category":"General Knowledge",
            "verified_questions": 208,
        },
        "10": {
        	"category":"Entertainment: Books",
            "verified_questions": 69,
        },
        "11": {
        	"category":"Entertainment: Film",
            "verified_questions": 179,
        },
        "12": {
        	"category":"Entertainment: Music",
            "verified_questions": 270,
        },
        "13": {
        	"category":"Entertainment: Musicals & Theatres",
            "verified_questions": 22,
        },
        "14": {
        	"category":"Entertainment: Television",
            "verified_questions": 127,
        },
        "15": {
        	"category":"Entertainment: Video Games",
            "verified_questions": 726,
        },
        "16": {
        	"category":"Entertainment: Board Games",
            "verified_questions": 45,
        },
        "17": {
        	"category":"Science & Nature",
            "verified_questions": 168,
        },
        "18": {
        	"category":"Science: Computers",
            "verified_questions": 131,
        },
        "19": {
        	"category":"Science: Mathematics",
            "verified_questions": 41,
        },
        "20": {
        	"category":"Mythology",
            "verified_questions": 42,
        },
        "21": {
        	"category":"Sports",
            "verified_questions": 75,
        },
        "22": {
        	"category":"Geography",
            "verified_questions": 217,
        },
        "23": {
        	"category":"History",
            "verified_questions": 227,
        },
        "24": {
        	"category":"Politics",
            "verified_questions": 47,
        },
        "25": {
        	"category":"Art",
            "verified_questions": 20,
        },
        "26": {
        	"category":"Celebrities",
            "verified_questions": 42,
        },
        "27": {
        	"category":"Animals",
            "verified_questions": 54,
        },
        "28": {
        	"category":"Vehicles",
            "verified_questions": 64,
        },
        "29": {
        	"category":"Entertainment: Comics",
            "verified_questions": 34,
        },
        "30": {
        	"category":"Science: Gadgets",
            "verified_questions": 18,
        },
        "31": {
        	"category":"Entertainment: Japanese Anime & Manga",
            "verified_questions": 138,
        },
        "32": {
        	"category":"Entertainment: Cartoon & Animations",
            "verified_questions": 67,
        }
    }
}

module.exports = {categoriesArr,categoriesObj};