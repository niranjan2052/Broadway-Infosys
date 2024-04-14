const jwt = require("jsonwebtoken");
const { User } = require("@/models");
const multer = require("multer");
const errorHandle = (error, next) => {
  console.log(error);
  if (error.code == 11000) {
    let errors = {};
    for (let k in error.keyValue) {
      errors[k] = `The provided value for ${k} is already in use`;
    }
    return next({
      message: "There seem to be some error",
      errors,
      status: 400,
    });
  }

  if ("errors" in error) {
    let errors = {};
    for (let k in error.errors) {
      errors[k] = error.errors[k].message;
    }
    return next({
      message: "There seems to be some error",
      errors,
      status: 422,
    });
  }
};

const auth = async (req, res, next) => {
  try {
    if ("authorization" in req.headers) {
      const token = req.headers["authorization"].split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const uid = decoded.uid;

      const user = await User.findById(uid);

      if (user) {
        req.uid = uid;
        req.user = user;
        next(); //To run next callback function
      } else {
        return next({
          message: "Invalid Token!",
          status: 401,
        });
      }
    } else {
      return next({
        message: "Missing Token",
        status: 401,
      });
    }
  } catch (error) {
    return next({
      message: "Invalid Token!!",
      status: 401,
    });
  }
};

const validationError = (next, errors) =>
  next({
    message: "There is some validation Error",
    errors,
    status: 422,
  });

const cmsAccess = (req, res, next) => {
  if (req.user.role == "Customer") {
    return next({
      message: "Access Denied",
      staus: 403,
    });
  }
  next();
};
const adminAccess = (req, res, next) => {
  if (req.user.role == "Staff") {
    return next({
      message: "Access Denied",
      staus: 403,
    });
  }
  next();
};

const customerAccess = (req, res, next) => {
  if (req.user.role != "Customer") {
    return next({
      message: "Access Denied",
      staus: 403,
    });
  }
  next();
};

const notFoundError = (name, next) => {
  return next({
    message: `${name} not found!!`,
    status: 404,
  });
};

const upload = (mimeList=[]) =>
  multer({
    storage: multer.diskStorage({
      filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        const filename =
          "file" +
          Date.now() +
          "-" +
          Math.round(Math.random() * 1e9) +
          `.${ext}`;
        cb(null, filename);
      },
      destination: (req, file, cb) => {
        cb(null, "./uploads");
      },
    }),
    fileFilter: (req,file,cb)=>{
      if(mimeList.length>0){
        if(mimeList.includes(file.mimetype)){
          cb(null,true);
        }else{
          cb(new Error("File type not supported"),false);
        }
      }else{
        cb(null,true);
      }
    }
  });

module.exports = {
  errorHandle,
  auth,
  validationError,
  cmsAccess,
  adminAccess,
  customerAccess,
  notFoundError,
  upload
};
