var express 	= 	require("express");
var router 		= 	express.Router();
var passport 	= 	require("passport");
var User 		= 	require("../models/user");
var welcomeMessage = 'Welcome to YelpCamp! ';


// Main Landing Page

router.get("/", function(req,res){
	res.render("landing");
});

// ===================
// AUTH ROUTES
// ===================

// Show Register Form
router.get("/register", function(req, res){
	res.render("register");
});

// Handle Sign Up Logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			res.redirect("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", welcomeMessage + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// Show Login Form
router.get("/login", function(req, res){
	res.render("login");
});

// Handle Login Logic
// Same as -- app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
		failureFlash: true
	}
));

// Logout Route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged You Out !");
	res.redirect("/campgrounds");
});


module.exports = router ;