var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    session = require('express-session'),
    MongoStore = require('connect-mongo')({ session: session }),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User        = require("./models/user");

    
//requiring routes
var authRoutes = require("./routes/auth");
var statusRoutes = require("./routes/status");
var adminRoutes = require("./routes/admin");
    
mongoose.connect("mongodb://localhost/status");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
// set session
app.use(session({
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 * 60 // 1 hour
  },
  secret: "Josh Kirby Master of No Code",
  store: new MongoStore({
    url: "mongodb://localhost/status",
    auto_reconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", authRoutes);
app.use("/", statusRoutes);
app.use("/admin", adminRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Status Server Running");
});