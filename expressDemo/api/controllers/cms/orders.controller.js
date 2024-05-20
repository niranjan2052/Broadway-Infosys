const { errorHandle, validationError, notFoundError } = require("../../lib");
const { Order, OrderDetail } = require("../../models");
const { Types } = require("mongoose");
class OrderController {
  index = async (_req, res, next) => {
    try {
      let orders = await Order.aggregate().lookup({
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      });
      for (let i in orders) {
        orders[i].user = orders[i].user[0];
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

  update = async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        await Order.findByIdAndUpdate(req.params.id, {
          status: req.body.status,
        });
        res.send({
          message: "Order updated Successfully",
          status: 201,
        });
      } else {
        return notFoundError("Order", next);
      }
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      let orders = await Order.findById(req.params.id);
      if (orders) {
        await OrderDetail.deleteMany({ orderId: orders._id });
        await Order.findByIdAndDelete(req.params.id);
        res.send({
          message: "Order deleted Successfully",
          status: 204,
        });
      } else {
        return notFoundError("Order", next);
      }
    } catch (error) {
      return errorHandle(error, next);
    }
  };
}

module.exports = new OrderController();
