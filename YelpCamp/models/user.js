var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose"),
	Schema = mongoose.Schema;

const connect = mongoose.connect("mongodb://dcoder:123456@ds127153.mlab.com:27153/campsite");

var userSchema = new Schema({

	username : String,
	password : String
	
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

