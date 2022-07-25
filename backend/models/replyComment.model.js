var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replyCommentSchema = new Schema({
  userID: {
    type: String
  },
  commentID: {
    type: String
  },
  postID: {
    type: String
  },
  comment: {
    type: String
  },
  date: {
    type: String 
  }
});

const ReplyComment = mongoose.model("ReplyComment", replyCommentSchema);

module.exports = ReplyComment;