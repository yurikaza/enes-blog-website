const Like = require("../models/like.model");
const Post = require("../models/post.model");
const { Web3Storage, File } = require('web3.storage');
const Comment = require("../models/comment.model");
const User = require("../models/auth.model");
const AppError = require("../utils/appError");

exports.createPost = async function (req, res, next) {
  console.log(req.user);
  if(req.user.admin === true) {
  const { headline, content, category } = req.body;
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = `${mm}/${dd}/${yyyy}`;

  const post = await Post.create({
    headline,
    content,
    category,
    whatchCount: 0,
    date: today,
  });

  res.status(201).json({
    status: "success",
    data: {
      post,
    },
  });
  } else {
      return next(
         new AppError("You are not logged in! Please log in to get access.", 401)
      );
  }
};

exports.likePost = async function (req, res, next) {
  const user = await User.findById(req.user.id);

  const findLike = await Like.find({
    postId: req.params.id,
    clientId: req.user.id,
    clientName: user.name,
    like: 1,
  })

  console.log(findLike.length);

  if(findLike.length > 0) {
    new AppError("you alredy like this post", 401)
  } else {
  const like = await Like.create({
      postId: req.params.id,
      clientId: req.user.id,
      clientName: user.name,
      like: 1,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: like,
    },
  });
  }

};

exports.watchPost = async function (req, res, next) {
  const video = await Post.findById(req.params.id);
  const likes = await Like.find({
    postId: video.id,
  }).exec();
  const comment = await Comment.find({
    postID: video.id,
  }).exec();

  await Post.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { whatchCount: 1 }
      },
      { new: true } //to return the new document
  );

  res.status(200).json({
    status: "success",
    data: {
        video,
        comment,
        likes,
    },
  });
};

exports.getAll = async function (req, res, next) {
  const post = await Post.find({});

  res.status(200).json({
    status: "success",
    data: {
        post,
    },
  });
};



exports.sendImage = async function (req, res, next) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlCOTMzOTU5NjMxMTkwMjdBODFkZUUwOTlhODQxNEIxMDA3YzkxZTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDM4NzY2NTY0NTgsIm5hbWUiOiJhcGkifQ.Wt_lXKV_LBhiwJqLrc-9iqKNMrtilPB8dVnrgS9ZPd4"; 
  const client = new Web3Storage({ token });

  const files = [new File([req.files.myFile.data], req.files.myFile.name)];
  console.log(files);

  const cid = await client.put(files);
  console.log(cid);

  const Sendres = await client.get(cid);
  const filesInfo = await Sendres.files();

  for (const file of filesInfo) {
      const fileSize = file.size / 1000000;
      const image = `https://${cid}.ipfs.dweb.link/${file.name}`;

      res.status(200).json({
        status: "succesful",
        data: {
          image,
        },
      });
  }
} 