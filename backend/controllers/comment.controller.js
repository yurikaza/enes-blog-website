const User = require("../models/auth.model");
const Comment = require("../models/comment.model");
const ReplyComment = require("../models/replyComment.model");

exports.createComment = async function (req, res, next) {
  const { comment } = req.body;
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const dateData = `${mm}/${dd}/${yyyy}`;

  const user = await User.findById(req.user.id);
  console.log(user);

  const postComment = await Comment.create({
    userID: req.user.id,
    postID: req.params.id,
    userName: user.name,
    comment,
    date: dateData,
  });

  res.status(201).json({
    status: "success",
    data: {
      post: postComment,
      users: user
    },
  });
};

exports.replyComment = async function (req, res, next) {
  const { comment } = req.body;
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  const postComment = await ReplyComment.create({
    userID: req.user.id,
    postID: req.params.id,
    commentID: req.params.comment,
    comment,
    date: today,
  });

  res.status(201).json({
    status: "success",
    data: {
      post: postComment,
    },
  });
};