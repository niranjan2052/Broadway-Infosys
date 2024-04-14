const express = require("express");
const { Front } = require("../../controllers");
const { auth, customerAccess } = require("../../lib");

const router = express.Router();

router
  .get("/catagories", Front.MiscController.catagories)
  .get("/catagories/:id", Front.MiscController.catagoryById)
  .get("/catagories/:id/products", Front.MiscController.catagoryProducts)

  .get("/brands", Front.MiscController.brands)
  .get("/brands/:id", Front.MiscController.brandById)
  .get("/brands/:id/products", Front.MiscController.brandProducts)

  .post("/checkout", auth, customerAccess, Front.MiscController.checkout);
module.exports = router;
