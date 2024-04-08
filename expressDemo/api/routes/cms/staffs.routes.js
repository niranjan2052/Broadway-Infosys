const express = require("express");

const { Cms } = require("@/controllers");

const router = express.Router();

router
  .route("/")
  .get(Cms.StaffsController.index)
  .post(Cms.StaffsController.store);

router
  .route("/:id")
  .get(Cms.StaffsController.show)
  .put(Cms.StaffsController.update)
  .patch(Cms.StaffsController.update)
  .delete(Cms.StaffsController.destroy);

module.exports = router;
