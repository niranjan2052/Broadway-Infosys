const express = require("express");
const AuthRoutes = require("./auth");
const CmsRoutes = require("./cms");
const ProfileRoutes = require("./profile");
const { auth, cmsAccess } = require("@/lib");

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/profile", auth, ProfileRoutes);
router.use("/cms", auth, cmsAccess, CmsRoutes);
router.get("/image/:filename", (req, res, next) => {
  res.sendFile(`uploads/${req.params.filename}`, {
    root: "./",
  });
});

module.exports = router;

//Middleware example

// const checkLogin = (req, res, next) => {
//   let user = "User";

//   if (user.length > 0) {
//     next();
//   } else {
//     return next({message:"Error: User not authenticated",status:401});
//   }
// };

// const accessCheck = (req, res, next) => {
//   let allow = "yes";
//   if (allow == "yes") {
//     next();
//   } else {
//     return next({message:"Error: Access Denied",status:403});
//   }
// };

// router.get("/profile/:username/edit",checkLogin,accessCheck, (req, res, next) => {
//   res.send({
//     method: req.method,
//     url: req.url,
//     query: req.query,
//     params:req.params,
//     body:req.body
//   });
// });
