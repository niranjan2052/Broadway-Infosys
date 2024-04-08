const { User } = require("@/models");
const bcrypt = require("bcryptjs");
const { errorHandle, validationError } = require("../../lib");

class RegisterController {
  register = async (req, res, next) => {
    try {
      let { name, email, password, confirmPassword, phone, address } =
        await req.body;

      if (password === confirmPassword) {
        const hash = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hash, phone, address });
        res.status(201);
        res.json({
          message: "Thank you for registering. Please proceed to log in.",
        });
      } else {
        return validationError(next,{
          password: "The password is not confirmed",
        });
      }
    } catch (error) {
      console.log(error);
      return errorHandle(error, next);
    }
  };
}

module.exports = new RegisterController();
