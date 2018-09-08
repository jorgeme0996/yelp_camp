var     express        = require("express"),
        app            = express(),
        bodyParser     = require("body-parser"),
        mongoose       = require("mongoose"),
        passport       = require("passport"),
        LocalStrategy  = require("passport-local"),
        methodOverride = require("method-override"),
        Campground     = require("./models/campgroud"),
        Comment        = require("./models/commets"),
        User           = require("./models/user"),
        port           = 4000,
        flash          = require("connect-flash"),
        seedDB         = require("./seeds");

var commetRoutes        = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index")

//seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true }); // Conectas a la base de datos
app.use(bodyParser.urlencoded({extended:true})); // configuras el paser
app.set("view engine", "ejs"); // configuras las vistas de ejs
app.use(express.static(__dirname + "/public")); // configuras las stylesheets
app.use(methodOverride("_method"));

// PASSPORT CONFIG ///////////////////////////////////////////
app.use(require("express-session")({
    secret: "Payton es la mejor",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
////////////////////////////////////////////////////////////

app.use(flash());

app.use(function(req,res,next){ // Es un middleware que pasa el dato del usuario 
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get("/", function(req, res){
    res.render("landing", {currentUser: req.user});
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commetRoutes);


app.listen(port, function(){
    console.log("Servidor en el puerto: " + port);
});