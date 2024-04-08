const { errorHandle, validationError } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
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
      errorHandle(error, next);
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
      errorHandle(error, next);
    }
  };
}

module.exports = new ProfileController();
