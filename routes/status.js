var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var Status = require("../models/status");
var Service = require("../models/service");

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
        Service.find({}, (err, allServices) => {
            if(err) console.log(err);
            var systems = true;
            var e = 0;
            while (e < allServices.length){
                if(allServices[e].state == 'Outage') {
                    systems = false;
                } 
                e++;
            }
            if (systems == true){
                systems = "All systems operational";
            } else if (systems == false){
                systems = "We are experiencing some outages at the moment";
            }
            res.render("index", {status:allStatuses, difference:diff, services:allServices, systems:systems});
        });
        
          
          
       }
    });
    
});








module.exports = router;