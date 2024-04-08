const express = require("express");
const { Cms } = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(Cms.BrandController.index)
  .post(Cms.BrandController.store);

router
  .route("/:id")
  .get(Cms.BrandController.show)
  .put(Cms.BrandController.update)
  .patch(Cms.BrandController.update)
  .delete(Cms.BrandController.destroy);

module.exports = router;
