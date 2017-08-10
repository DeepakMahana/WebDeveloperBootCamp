var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data   =  [
				{	name: "Cloud's Rest", 
					image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
					description: "Rest In Heaven"
				},
				{	name: "Desert Mesa", 
					image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
					description: "Play In Sand"
				},
				{	name: "Canyon Floor", 
					image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
					description: "Enjoy The Scene"
				},
				{	name: "Grand Climb", 
					image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
					description: "Sleep In Heaven"
				}
];

function seedDB(){

	// Remove All CampGrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("Removed CampGrounds");

			// Remove All Comments
			Comment.remove({}, function(err){
			if(err){
				console.log(err);
			} else {

				console.log("Removed Comments");

				//Add a few campgrounds
				//inside the remove function because if it's outside, Javascript is asynchronus
				//and doesn't guarantee what order code will be run

				data.forEach(function(seed){

					Campground.create(seed, function(err, campground){
						if(err){
							console.log(err);
						} else {
							console.log("Added A CampGround");

							// Create a Comment
							Comment.create(
							{
								comment : "This place is Great !",
								author  : "Deepak"
							},	function(err, comment){
								if(err){
									console.log(err);
								}else{
									campground.comments.push(comment);
									campground.save();
									console.log("Created New Comment");
									}
								});
							}
						});
					});
				}
			});
		}	
	});
}

module.exports = seedDB;