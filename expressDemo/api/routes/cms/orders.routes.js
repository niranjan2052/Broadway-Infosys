const express = require("express");
const { Cms } = require("../../controllers");

const router = express.Router();

router.get("/", Cms.OrderController.index);

router
  .route("/:id")
  .put(Cms.OrderController.update)
  .patch(Cms.OrderController.update)
  .delete(Cms.OrderController.destroy);

module.exports = router;
