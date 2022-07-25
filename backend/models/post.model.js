const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  headline: {
    type: String,
    required: [true, "Please provide a headline"],
  },
  content: [{
    type: String,
  }],
  category: {
    type: String,
    default: "none",
  },
  whatchCount: {
    type: Number,
  },
  date: {
   type: String 
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
