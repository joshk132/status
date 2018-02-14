var mongoose = require("mongoose");

var statusSchema = new mongoose.Schema({
   type: String,
   message: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Status", statusSchema);