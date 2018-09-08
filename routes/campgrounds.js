var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgroud");
var middleware = require("../middleware")

router.post("/campground", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    var newCamp = {name: name, imagenes: image, description: description, author: author};
    Campground.create(newCamp, function(err, newlyCamp){
        if(err){
            console.log(err)
        } else {
            res.redirect("/campground");
        }  
    });  
});

router.get("/campground", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
});

router.get("/campground/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new", {currentUser: req.user})
});

router.get("/campground/:id", function(req, res){
    var id = req.params.id
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Algo salio mal buscando un Campamento")
        } else{
            res.render("campgrounds/show",{foundCampground:foundCampground});
        }
    }); 
});

// Edit Campground 
router.get("/campground/:id/edit", middleware.checkCampgroundOwner, function(req, res){
    var id = req.params.id
    Campground.findById(id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground}); 
    });  
});

// UPDATE CAMPGROUND ROUTE
router.put("/campground/:id", middleware.checkCampgroundOwner, function(req, res){
    var id = req.params.id;
    var dataUpdated = req.body.data;
    Campground.findByIdAndUpdate(id, dataUpdated, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           console.log(updatedCampground)
           res.redirect("/campground/" + id);
       }
    });
});

//Destroy Campground
router.delete("/campground/:id", middleware.checkCampgroundOwner, function(req, res){
    var id = req.params.id;
    Campground.findByIdAndRemove(id, function(err){
        if(err){
            res.redirect("/campground");
        } else {
            res.redirect("/campground");
        }
    });
});


module.exports = router;