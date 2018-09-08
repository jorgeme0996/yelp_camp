var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/register", function(req, res){
    res.render("users/register")
});

// Post to create a new user!!!!!!
router.post("/register", function(req, res){
    var newUser = new User({username:req.body.username});
        newPassword = req.body.password;
    User.register(newUser, newPassword, function(err, user){
        if(err){
           console.log(err);
           return res.render("register") 
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campground")
        });
    });
});

router.get("/login", function(req,res){
    res.render("users/login", {currentUser: req.user})
});

// Logica para que se hagan Log in 
router.post("/login", passport.authenticate("local" ,
    {
        successRedirect:"/campground",
        failureRedirect:"/login"

    }) ,function(req, res){
    
});

// middleware to check if is loggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

// Logica para que se hagan Log out 
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/login")
});


module.exports = router;