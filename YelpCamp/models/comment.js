var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const connect = mongoose.connect("mongodb://dcoder:123456@ds127153.mlab.com:27153/campsite");

var commentSchema = new Schema({

	comment : String,
	author	: {
				id: {
						type : mongoose.Schema.Types.ObjectId,
						ref  : "User"
				    },
				username: String
			  }
	
});

module.exports = mongoose.model("Comment", commentSchema);

