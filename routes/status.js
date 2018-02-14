var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var Status = require("../models/status");

//root route
router.get("/", function(req, res){
    Status.find({}, function(err, allStatuses){
       if(err){
           console.log(err);
       } else {
          res.render("index",{statuses:allStatuses});
       }
    });
});








module.exports = router;