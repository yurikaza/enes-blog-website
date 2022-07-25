var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  passwordConfirm: {
    type: String
  },
  Location: [{
    type: String
  }],
  admin: {
    type: Boolean
  }
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogPost = new Schema({
  images: {
    type: String
  },
  text: {
    type: String
  },
  Date: {
    type: Date
  }
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var comment = new Schema({
  userID: {
    type: String
  },
  comment: {
    type: String
  },
  date: {
    type: Date
  }
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentReply = new Schema({
  commentId: {
    type: String
  },
  userId: {
    type: String
  },
  comment: {
    type: String
  },
  date: {
    type: Date
  }
});
