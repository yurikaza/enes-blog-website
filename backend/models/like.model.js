const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  postId: String,
  clientId: String,
  clientName: String,
  like: Number,
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
