const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.admin = catchAsync(async (req, res, next) => {
    console.log(req.user.id);
    if(req.user.admin === true) {
        next();
    } else {
      return next(
         new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    next();
}); 