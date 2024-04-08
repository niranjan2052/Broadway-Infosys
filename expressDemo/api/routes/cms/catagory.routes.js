const express = require("express");
const { Cms } = require("../../controllers");
const router = express.Router();

router
  .route("/")
  .get(Cms.CatagoryController.index)
  .post(Cms.CatagoryController.store);

router
  .route("/:id")
  .get(Cms.CatagoryController.show)
  .put(Cms.CatagoryController.update)
  .patch(Cms.CatagoryController.update)
  .delete(Cms.CatagoryController.destroy);

module.exports = router;
