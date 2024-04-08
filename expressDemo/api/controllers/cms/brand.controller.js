const { errorHandle, validationError,notFoundError } = require("../../lib");
const { Brand } = require("../../models");
class BrandController {
  index = async (req, res, next) => {
    try {
      let brand = await Brand.find();
      if (brand) {
        res.send(brand);
      } else {
        return validationError(next, {
          message: "No Brand found!!",
        });
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  store = async (req, res, next) => {
    try {
      let { name, status } = req.body;
      if (name) {
        await Brand.create({ name, status });
        res.send({
          message: "Brand Created Successfully",
          status: 201,
        });
      } else {
        return validationError(next, {
          message: "Check Your Input!",
        });
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  show = async (req, res, next) => {
    try {
      let brand = await Brand.findById(req.params.id);
      if (brand) {
        res.send(brand);
      } else {
        return notFoundError("Brand",next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  update = async (req, res, next) => {
    try {
      const brand = await Brand.findById(req.params.id);
      if (brand) {
        let { name, status } = req.body;
        await Brand.findByIdAndUpdate(req.params.id, { name, status });
        res.send({
          message: "Brand updated Successfully",
          status: 201,
        });
      } else {
        return notFoundError("Brand",next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      let brand = await Brand.findById(req.params.id);
      if (brand) {
        await Brand.findByIdAndDelete(req.params.id);
        res.send({
          message: "Brand deleted Successfully",
          status: 204,
        });
      } else {
        return notFoundError("Brand",next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
}

module.exports = new BrandController();
