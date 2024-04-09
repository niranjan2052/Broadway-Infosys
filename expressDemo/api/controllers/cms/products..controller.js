const { errorHandle, validationError, notFoundError } = require("../../lib");
const { Product, Catagory } = require("../../models");
const { unlinkSync } = require("node:fs");
const mongoose = require("mongoose");
class ProductController {
  index = async (req, res, next) => {
    try {
      // let products = await Product.aggregate([{
      //   {$lookup: {from:'catagory',localField:"catagoryId",foreignField:"_id", as:"catagory"}},
      //   {$lookup: {from:'brand',localField:"brandId",foreignField:"_id", as:"brand"}},
      // }])
      let products = await Product.aggregate()
        .lookup({
          from: "catagories",
          localField: "catagoryId",
          foreignField: "_id",
          as: "catagory",
        })
        .lookup({
          from: "brands",
          localField: "brandId",
          foreignField: "_id",
          as: "brand",
        });
      if (products) {
        let newList = [];

        for (let i in products) {
          newList.push({
            ...products[i],
            catagory: products[i].catagory[0],
            brand: products[i].brand[0],
          });
        }
        res.send(newList);
      } else {
        return validationError(next, {
          message: "No Product found!!",
        });
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  store = async (req, res, next) => {
    try {
      let {
        name,
        status,
        description,
        summary,
        price,
        discounted_price,
        catagoryId,
        brandId,
        featured,
      } = req.body;
      const images = req.files.map((file) => file.filename);

      await Product.create({
        name,
        status,
        description,
        summary,
        price,
        discounted_price,
        catagoryId,
        brandId,
        featured,
        images,
      });
      res.send({
        message: "Product Created Successfully",
        status: 201,
      });
    } catch (error) {
      errorHandle(error, next);
    }
  };
  show = async (req, res, next) => {
    try {
      let products = await Product.aggregate()
        .match({ _id: new mongoose.Types.ObjectId(req.params.id) })
        .lookup({
          from: "catagories",
          localField: "catagoryId",
          foreignField: "_id",
          as: "catagory",
        })
        .lookup({
          from: "brands",
          localField: "brandId",
          foreignField: "_id",
          as: "brand",
        });
      if (products) {
        let newList = [];

        for (let i in products) {
          newList.push({
            ...products[i],
            catagory: products[i].catagory[0],
            brand: products[i].brand[0],
          });
        }
        res.send(newList);
      } else {
        return notFoundError("Product", next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  update = async (req, res, next) => {
    try {
      let {
        name,
        status,
        description,
        summary,
        price,
        discounted_price,
        catagoryId,
        brandId,
        featured,
      } = req.body;
      let product = await Product.findById(req.params.id);
      if (product) {
        let images = product.images;
        if (req.files) {
          let temp = req.files.map((file) => file.filename);
          images = [...images, ...temp];
        }

        await Product.findByIdAndUpdate(req.params.id, {
          name,
          status,
          description,
          summary,
          price,
          discounted_price,
          catagoryId,
          brandId,
          featured,
          images,
        });
        res.send({
          message: "Product updated Successfully",
          status: 201,
        });
      } else {
        return notFoundError("Product", next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      let products = await Product.findById(req.params.id);
      if (products) {
        for (let image of products.images) {
          unlinkSync(`./uploads/${image}`);
        }
        await Product.findByIdAndDelete(req.params.id);
        res.send({
          message: "Product deleted Successfully",
          status: 204,
        });
      } else {
        return notFoundError("Product", next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  destoryImage = async (req, res, next) => {
    try {
      let products = await Product.findById(req.params.id);
      if (products) {
        unlinkSync(`./uploads/${req.params.filename}`);
        let images = products.images.filter(
          (image) => image != req.params.filename
        );
        await Product.findByIdAndDelete(req.params.id, { images });
        res.send({
          message: "Product image deleted Successfully",
          status: 204,
        });
      } else {
        return notFoundError("Product", next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
}

module.exports = new ProductController();
