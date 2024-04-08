const { errorHandle } = require("@/lib");
const { User } = require("@/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationError } = require("@/lib");

class LoginController {
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email }).select("+password");

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            {
              uid: user._id,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
            },
            process.env.JWT_SECRET
          );
          res.send({ token });
        } else {
          return validationError(next, {
            email: "The provided password is incorrect",
          });
        }
      } else {
        return validationError(next, {
          email: "The provided email does not match our records",
        });
      }
    } catch (error) {
      errorHandle(error, next);
    }
  };
}

module.exports = new LoginController();
