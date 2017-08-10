var express 		= 	require("express"),
	bodyParser 		= 	require("body-parser"),
	mongoose		=	require("mongoose"),
	passport 		=	require("passport"),
	flash 			=	require("connect-flash"),
	LocalStrategy	=	require("passport-local"),
	methodOverride	=	require("method-override"),
	reseedDatabase 	=   false;

// Run On Port 3000
var app = express();
const PORT = 3000;

// Setup DB Url and Session Tokem
var databaseURL = process.env.DATABASEURL || 'mongodb://dcoder:123456@ds127153.mlab.com:27153/campsite';
var sessionSecret = process.env.SESSION_SECRET || 'SessionSecretToken';

// Connect To DB
mongoose.connect(databaseURL);

// All Routes

var commentRoutes 		= 	require("./routes/comments"),
	campgroundRoutes 	= 	require("./routes/campgrounds"),
	indexRoutes 		= 	require("./routes/index"),
	User        	=   require("./models/user.js"),
	seedDB			=	require("./seeds.js");
		

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.set("view engine", "ejs");

// Passport Configuration
app.use(require("express-session")({
	secret: sessionSecret,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Get CurrentUser EveryWhere

app.use(function(req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.currentUser = req.user;
  next();
});


// Seed the database with fresh data
if (reseedDatabase) {
  seedDB();
}

// Getting All The Routes

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// App Running on Specified PORT 3000
// Listener

app.listen(PORT, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', PORT, PORT);
});