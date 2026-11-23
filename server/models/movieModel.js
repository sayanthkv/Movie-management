const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  moviename: { type: String, required: true },
  directorname: { type: String, required: true },
  movieyear: { type: String, required: true },
  genrename: { type: String, required: true },
  isfav : {type:Boolean,default:false}
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);