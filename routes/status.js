var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var Status = require("../models/status");

var moment = require('moment');
moment().format();

//root route
router.get("/", function(req, res){
        Status.find({}, function(err, allStatuses){
       if(err){
           console.log(err);
       } else {
           
          var diff = new Array();
           var i = 0;
           while(i < allStatuses.length){
               diff[i] = moment(allStatuses[i].date).fromNow();
               i++;
           }
          
          res.render("index", {status:allStatuses, difference:diff});
       }
    });
});








module.exports = router;