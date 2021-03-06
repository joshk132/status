var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");

//models
var Status = require("../models/status"),
    Service = require("../models/service");


//root admin route
router.get("/", middleware.isLoggedIn, (req, res) => {
    res.render("admin/index");
});

router.get("/status/new", middleware.isLoggedIn, (req, res) => {
    Service.find({"author.id":req.user.id}, function(err, allService) {
        if(err){
            console.log(err);
        }
        res.render("admin/new", {services: allService});
    });
    
});


router.post("/status/new", middleware.isLoggedIn, (req, res) => {
    var type = req.body.type;
    var service = req.body.service;
    var message = req.body.message;
    var date = Date.now();
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newStatus = {type:type, service:service, message:message, author:author, date:date};
    // var newStatus = {type:type, message:message, author:author};
    Status.create(newStatus, function(err, newlyCreated){
        if(err){
            throw(err);
        } else {
            //redirect back to new status page
            res.redirect("/admin/status/new");
        }
    });
    
});

router.get("/service/new", middleware.isLoggedIn, (req, res) => {
    res.render("admin/serviceNew");
});

router.post("/service/new", middleware.isLoggedIn, (req, res) => {
    var service = req.body.service;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newService = {service:service, author:author};
    Service.create(newService, function(err, newlyCreated){
        if(err){
            throw(err);
        } else {
            //redirect back to new service page
            res.redirect("/admin/service/new");
        }
    });
    
});

router.get("/service/update", middleware.isLoggedIn, (req, res) => {
    Service.find({}, (err, allServices) => {
        if(err) console.log(err);
        res.render("admin/serviceUpdate", {services:allServices});
    });
});

  
/*router.put("/service/update", middleware.isLoggedIn, (req, res) => {
    Service.findById(req.body.requestID, function(err, service) {
        if (err) return (err);
        service.state = req.body.state;
        service.save(function(err) {
            if (err) return (err);
        });
    });
});*/ 


router.put("/service/update", middleware.isLoggedIn, (req, res) => {
    Service.findByIdAndUpdate(req.body.serviceID, req.body.service, function(err, updatedCampground){
       if(err){
           res.redirect("/admin/service/update");
       } else {
           //redirect somewhere(show page)
           res.redirect("/admin/");
       }
    });
});


module.exports = router;