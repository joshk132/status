var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");

//models
var Status = require("../models/status");

//root route
router.get("/", function(req, res){
    res.render("index");
});



//root admin route
router.get("/admin", middleware.isLoggedIn, (req, res) => {
    res.render("admin/index");
});

router.post("/new", middleware.isLoggedIn, (req, res) => {
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
            res.redirect("/admin/status/new");
        }
    });
});




module.exports = router;