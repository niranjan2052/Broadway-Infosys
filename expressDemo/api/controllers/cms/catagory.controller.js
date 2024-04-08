const { errorHandle, validationError } = require("../../lib");
const { Catagory } = require("../../models");
class CatagoryController {
  index = async (req, res, next) => {
    try {
      let catagory = await Catagory.find();
      if (catagory) {
        res.send(catagory);
      }
      return next({
        message: "No Catagory Available!!",
        status: 404,
      });
    } catch (error) {
      errorHandle(error, next);
    }
  };
  store = async (req, res, next) => {
    try {
      const { name, status } = req.body;
      if (name) {
        await Catagory.create({ name, status });
        res.send({
          message: "Catagory Created Successfully!!",
          status: 201,
        });
      }
      return validationError(next, {
        message: "Check your given info.",
      });
    } catch (error) {
      errorHandle(error, next);
    }
  };
  show = async (req, res, next) => {
    try {
      let catagory = await Catagory.findById(req.params.id);
      if (catagory) {
        res.send(catagory);
      } else {
        return notFoundError("Catagory",next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  update = async (req, res, next) => {
    try {
      let catagory = await Catagory.findById(req.params.id);
      if (catagory) {
        let { name, status } = req.body;
        await Catagory.findByIdAndUpdate(req.params.id, { name, status });
        res.send({
          message: "Catagory Updated Successfully",
          status: 201,
        });
      } else {
        return notFoundError("Catagory",next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      let catagory = await Catagory.findById(req.params.id);
      if (catagory) {
        await Catagory.findByIdAndDelete(req.params.id);
        res.send({
          message: "Catagory Deleted Succeessfully",
          status: 204,
        });
      } else {
        return notFoundError("Catagory",next);
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
}

module.exports = new CatagoryController();
