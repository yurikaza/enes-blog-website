const User = require("../models/auth.model");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("you are not login", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.publicProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("you are not login", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});