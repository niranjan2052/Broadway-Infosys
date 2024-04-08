const express = require("express");

const { Cms } = require("@/controllers");

const router = express.Router();

router
  .route("/")
  .get(Cms.CustomerController.index)
  .post(Cms.CustomerController.store);

router
  .route("/:id")
  .get(Cms.CustomerController.show)
  .put(Cms.CustomerController.update)
  .patch(Cms.CustomerController.update)
  .delete(Cms.CustomerController.destroy);


module.exports = router;
