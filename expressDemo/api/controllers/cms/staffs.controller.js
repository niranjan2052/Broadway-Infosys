const { errorHandle, validationError } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

class StaffsController {
  index = async (req, res, next) => {
    try {
      const users = await User.find({ role: "Staff" });
      res.send(users);
    } catch (error) {
      errorHandle(error, next);
    }
  };
  store = async (req, res, next) => {
    try {
      let { name, email, password, confirmPassword, phone, address, status } =
        await req.body;

      if (password === confirmPassword) {
        const hash = await bcrypt.hash(password, 10);
        await User.create({
          name,
          email,
          password: hash,
          phone,
          address,
          status,
          role: "Staff",
        });
        res.status(201);
        res.json({
          message: "Staff Added Successfully",
        });
      } else {
        return validationError(next, {
          password: "The password is not confirmed",
        });
      }
    } catch (error) {
      console.log(error);
      return errorHandle(error, next);
    }
  };

  show = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user && user.role == "Staff") {
        res.send(user);
      } else {
        return next({
          message: "Staff not found!!",
          status: 404,
        });
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user && user.role == "Staff") {
        const { name, email, phone, address, status } = req.body;

        await User.findByIdAndUpdate(req.params.id, {
          name,
          email,
          phone,
          address,
          status,
        });

        res.send({
          message: "Staff updated Successfully",
        });
      } else {
        return next({
          message: "Staff not found!!",
          status: 404,
        });
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user && user.role == "Staff") {
        await User.findByIdAndDelete(req.params.id);
        res.send({
          message: "Staff deleted Successfully",
        });
      } else {
        return next({
          message: "Staff not found!!",
          status: 404,
        });
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
}

module.exports = new StaffsController();
