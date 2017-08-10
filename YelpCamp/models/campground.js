var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const connect = mongoose.connect("mongodb://dcoder:123456@ds127153.mlab.com:27153/campsite");

var campgroundSchema = new Schema({

	name         : 	String,
	image        : 	String,
	description  : 	String,
	
	author		 :  {
						id        : {
								       type : mongoose.Schema.Types.ObjectId,
								       ref  : "User"
							         },
						username   : String
					},

	comments     :  [
	                   {
	                   		type : mongoose.Schema.Types.ObjectId,
	                   		ref  : "Comment"
	                   }
	                ]
	
});

module.exports = mongoose.model("Campground", campgroundSchema);

