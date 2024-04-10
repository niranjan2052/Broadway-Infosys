const { Product } = require("../../models");
const { errorHandle, notFoundError } = require("../../lib");
const { Types } = require("mongoose");

class ProductController {
  featured = async (req, res, next) => {
    try {
      const products = await Product.find({
        status: true,
        featured: true,
      }).limit(4);
      if (products) {
        res.send(products);
      } else {
        return notFoundError("Products", next);
      }
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  latest = async (req, res, next) => {
    try {
      const products = await Product.find({
        status: true,
        featured: true,
      }).sort({
        createdAt: "desc",
      });
      if (products) {
        res.send(products);
      } else {
        return notFoundError("Products", next);
      }
    } catch (error) {
      return errorHandle(error, next);
    }
  };
  top = async (req, res, next) => {
    try {
      const featured = await Product.aggregate()
        .match({ status: true })
        .lookup({
          from: "orderdetails",
          localField: "_id",
          foreignField: "productId",
          as: "details",
        })

        .addFields({ details: { $size: "$details" } })
        .sort({ details: "desc" })
        .limit(4);

      res.send(featured);
    } catch (err) {
      return errorHandle(err, next);
    }
  };
  byId = async (req, res, next) => {
    try {
      const product = await Product.aggregate()
        .match({ status: true, _id: new Types.ObjectId(req.params.id) })
        .lookup({
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "reviews",
        })
        .lookup({
          from: "brands",
          localField: "brandId",
          foreignField: "brandsId",
          as: "brand",
        });

      if (product.length > 0) {
        let data = product[0];
        data.brand = data.brand[0];

        res.send(data);
      } else {
        return notFoundError("Product", next);
      }
    } catch (err) {
      return errorHandle(err, next);
    }
  };
  similar = async (req, res, next) => {};
  review = async (req, res, next) => {};
  search = async (req, res, next) => {};
}

module.exports = new ProductController();
