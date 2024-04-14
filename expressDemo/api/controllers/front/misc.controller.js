const { errorHandle } = require("../../lib");
const {
  Catagory,
  Product,
  Brand,
  Order,
  OrderDetail,
} = require("../../models");
class MiscController {
  catagories = async (req, res, next) => {
    try {
      const catagories = await Catagory.find({ status: true });
      res.send(catagories);
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  catagoryById = async (req, res, next) => {
    try {
      const catagory = await Catagory.find({
        status: true,
        _id: req.params.id,
      });
      res.send(catagory);
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  catagoryProducts = async (req, res, next) => {
    try {
      const products = await Product.find({
        status: true,
        catagoryId: req.params.id,
      });
      res.send(products);
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  brands = async (req, res, next) => {
    try {
      const brands = await Brand.find({ status: true });
      res.send(brands);
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  brandById = async (req, res, next) => {
    try {
      const brand = await Brand.findOne({ status: true, _id: req.params.id });
      res.send(brand);
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  brandProducts = async (req, res, next) => {
    try {
      const products = await Product.find({
        status: true,
        brandId: req.params.id,
      });
      res.send(products);
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  checkout = async (req, res, next) => {
    try {
      const cart = req.body;

      const order = await Order.create({ userId: req.uid });

      for (let item of cart) {
        const product = await Product.findById(item.productId);
        const price =
          product.discounted_price > 0
            ? product.discounted_price
            : product.price;
        const total = price * item.qty;
        await OrderDetail.create({
          orderId: order._id,
          productId: product._id,
          qty: item.qty,
          price,
          total,
        });
      }

      res.send({
        message:"Thank YOU!! For your Order!!"
      });
    } catch (error) {
      return errorHandle(error, next);
    }
  };
}

module.exports = new MiscController();
