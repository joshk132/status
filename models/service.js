var mongoose = require("mongoose");

var serviceSchema = new mongoose.Schema({
   service: String,
   state: { type: String, default: 'Operational' },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Service", serviceSchema);