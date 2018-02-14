var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");

//models
var Status = require("../models/status");


//root admin route
router.get("/", middleware.isLoggedIn, (req, res) => {
    res.render("admin/index");
});

router.get("/status/new", middleware.isLoggedIn, (req, res) => {
    res.render("admin/new");
});


router.post("/status/new", middleware.isLoggedIn, (req, res) => {
    var type = req.body.type;
    var message = req.body.message;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newStatus = {type:type, message:message, author:author};
    Status.create(newStatus, function(err, newlyCreated){
        if(err){
            throw(err);
        } else {
            //redirect back to new status page
            console.log(newlyCreated);
            res.redirect("/admin/status/new");
        }
    });
});




module.exports = router;