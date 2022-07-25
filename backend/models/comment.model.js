var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  userID: {
    type: String
  },
  postID: {
    type: String
  },
  userName: {
    type: String
  },
  comment: {
    type: String
  },
  date: {
    type: String 
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;