const { errorHandle, validationError } = require("../../lib");
const { User, Review, Order, OrderDetail } = require("../../models");
const bcrypt = require("bcryptjs");
const { Types } = require("mongoose");
class ProfileController {
  show = async (req, res, next) => {
    res.send(req.user);
  };

  update = async (req, res, next) => {
    try {
      const { name, phone, address } = req.body;

      await User.findByIdAndUpdate(req.uid, { name, phone, address });

      res.send({
        message: "Profile updated Successfully",
      });
    } catch (error) {
      return errorHandle(error, next);
    }
  };

  updatePassword = async (req, res, next) => {
    try {
      let { oldPassword, newPassword, confirmPassword } = req.body;
      const user = await User.findById(req.uid).select("+password");

      if (bcrypt.compareSync(oldPassword, user.password)) {
        if (newPassword === confirmPassword) {
          const hash = bcrypt.hashSync(newPassword);
          await User.findByIdAndUpdate(req.uid, { password: hash });

          res.send({
            message: "Password updated successfully",
          });
        } else {
          return validationError(next, {
            password: "The new password is not confirmed",
          });
        }
      } else {
        return validationError(next, {
          password: "The old password is incorrect",
        });
      }
    } catch (error) {
      return errorHandle(error, next);
    }
  };

  reviews = async (req, res, next) => {
    try {
      let reviews = await Review.aggregate()
        .match({ userId: new Types.ObjectId(req.uid) })
        .lookup({
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        });

      for (let i in reviews) {
        reviews[i].product = reviews[i].product[0];
      }
      res.send(reviews);
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  orders = async (req, res, next) => {
    try {
      let orders = await Order.aggregate().match({
        userId: new Types.ObjectId(req.uid),
      });

      for (let i in orders) {
        orders[i].details = await OrderDetail.aggregate()
          .match({ orderId: orders[i]._id })
          .lookup({
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          });
        for (let j in orders[i].details) {
          orders[i].details[j].product = orders[i].details[j].product[0];
        }
      }
      res.send(orders);
    } catch (error) {
      return errorHandle(error, next);
    }
  };
}

module.exports = new ProfileController();
