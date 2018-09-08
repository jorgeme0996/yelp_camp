var express = require("express");
var router = express.Router();
var Campground     = require("../models/campgroud");
var Comment        = require("../models/commets");
var User           = require("../models/user");
var middleware = require("../middleware")

router.get("/campground/:id/comments/new", middleware.isLoggedIn, function(req, res){
    var id = req.params.id
    Campground.findById(id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            //console.log(campground)
            res.render("comments/new", {campground: campground});
        }
    })
    
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
    var id = req.params.id
    Campground.findById(id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campground/" + id)
                }
            });
        }
    })
});

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwner, function(req, res){
    var campgroundId = req.params.id;
    console.log(campgroundId);
    Comment.findById(req.params.comment_id, function(err, founComment){
        if(err){
           res.redirect("back") 
        } else {
            res.render("comments/edit", {campgroundId: campgroundId, comment:founComment});   
        }
    });
    
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwner, function(req, res){
    var id = req.params.comment_id;
    var data = req.body.comment;
    console.log(data);
    console.log(id);
    Comment.findByIdAndUpdate(id, data, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campground/" + req.params.id);
            console.log(updatedComment);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campground/" + req.params.id);
        }
    })
});


module.exports = router;