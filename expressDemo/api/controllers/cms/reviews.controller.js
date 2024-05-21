const { errorHandle, notFoundError } = require("../../lib");
const { Review } = require("../../models");
const { Types } = require("mongoose");
class ReviewController {
  index = async (_req, res, next) => {
    try {
      let reviews = await Review.aggregate()
        .lookup({
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        })
        .lookup({
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        });

      for (let i in reviews) {
        reviews[i].product = reviews[i].product[0];
        reviews[i].user = reviews[i].user[0];
      }
      res.send(reviews);
    } catch (error) {
      return errorHandle(error, next);
    }
  };


  destroy = async (req, res, next) => {
    try {
      let reviews = await Review.findById(req.params.id);
      if (reviews) {
        await Review.findByIdAndDelete(req.params.id);
        res.send({
          message: "Reviews deleted Successfully",
          status: 204,
        });
      } else {
        return notFoundError("Reviews", next);
      }
    } catch (error) {
      return errorHandle(error, next);
    }
  };
}

module.exports = new ReviewController();
