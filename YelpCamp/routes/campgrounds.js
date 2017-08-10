var express 		= 	require("express");
var router 			= 	express.Router({mergeParams:true});
var Campground 		= 	require("../models/campground");
var middleware 		= 	require('../middleware');

// ===================
// CAMPGROUNDS ROUTES
// ===================

// GET 

router.get("/", function(req,res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
		}
	});
});

// POST

router.post("/", middleware.isLoggedIn , function(req,res){

	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;

	var author		  = {	id: req.user._id,
							username: req.user.username
						};

	var newCampground = {	name: name, 
							image: image, 
							description: description,
							author: author
						};

	Campground.create(newCampground, function(err, newCampground){
		if(err){
			req.flash('error', 'Campground could not be created');
			res.redirect('back');
		}else{
			req.flash('success', 'Campground was added');
			res.redirect("/campgrounds/" + newCampground._id);
		}
	});
});

// GET FORM TO CREATE NEW

router.get("/new", middleware.isLoggedIn , function(req,res){
	res.render("campgrounds/new");
});

// GET CAMPGROUNDS WRT TO ID AND SHOW MORE DETAILS

router.get("/:id", function(req,res){

	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			req.flash('error', 'Campground was not found');
        	res.redirect('back');
		}else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});


// EDIT CAMPGROUND ROUTE

router.get("/edit", middleware.checkCampgroundOwnership ,function(req, res){

	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
        	req.flash('error', 'Campground was not found');
        	res.redirect('back');
      	} else {
        	res.render('campgrounds/edit', {campground: foundCampgrnd});
      }
    });
});

// FIND CAMPGROUND AND EDIT

router.put("/:id", middleware.checkCampgroundOwnership ,function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			req.flash('error', 'Campground was not found');
          	res.redirect('back');
		} else {
			req.flash('success', 'Campground was updated');
          	res.redirect('/campgrounds/' + req.params.campground_id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership ,function(res , req){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			req.flash('error', 'Campground was not found');
        	res.redirect('back');
		} else {
			req.flash('error', 'Campground was deleted');
        	res.redirect('/campgrounds');
		}
	});
});


module.exports = router;