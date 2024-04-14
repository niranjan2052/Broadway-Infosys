const express = require("express");

const { Auth } = require("../../controllers");
const { customerAccess } = require("../../lib");

const router = express.Router();

// router.get("/", Auth.ProfileController.show);
// router.put("/", Auth.ProfileController.update);
// router.patch("/", Auth.ProfileController.update);

router
  .route("/")
  .get(Auth.ProfileController.show)
  .put(Auth.ProfileController.update)
  .patch(Auth.ProfileController.update);

router
  .route("/password")
  .put(Auth.ProfileController.updatePassword)
  .patch(Auth.ProfileController.updatePassword);

router.get("/reviews", customerAccess, Auth.ProfileController.reviews);
router.get("/orders", customerAccess, Auth.ProfileController.orders);

module.exports = router;
