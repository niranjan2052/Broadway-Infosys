const express = require("express");
const { Cms } = require("../../controllers");

const router = express.Router();

router.get("/", Cms.ReviewController.index);

router.delete("/:id", Cms.ReviewController.destroy);

module.exports = router;
