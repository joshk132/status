var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");

//root route
router.get("/", function(req, res){
    res.render("index");
});



//root admin route
router.get("/admin", middleware.isLoggedIn, (req, res) => {
    res.render("admin/index");
});






module.exports = router;