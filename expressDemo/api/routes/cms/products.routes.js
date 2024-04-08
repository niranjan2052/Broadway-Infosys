const express = require("express");
const { Cms } = require("../../controllers");
const { upload } = require("../../lib");

const mimeList = ["image/jpeg", "image/png", "image/gif"];

const router = express.Router();

router
  .route("/")
  .get(Cms.ProductController.index)
  .post(upload(mimeList).array("images"), Cms.ProductController.store);

router
  .route("/:id")
  .get(Cms.ProductController.show)
  .put(upload(mimeList).array("images"), Cms.ProductController.update)
  .patch(upload(mimeList).array("images"), Cms.ProductController.update)
  .delete(Cms.ProductController.destroy);

router.delete("/:id/image/:filename", Cms.ProductController.destoryImage);

module.exports = router;
