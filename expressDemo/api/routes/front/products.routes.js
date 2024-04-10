const express = require("express");
const { Front } = require("../../controllers");
const { auth } = require("../../lib");

const router = express.Router();

router.get("/featured", Front.ProductController.featured);
router.get("/latest", Front.ProductController.latest);
router.get("/top", Front.ProductController.top);
router.get("/search", Front.ProductController.search);
router.get("/:id", Front.ProductController.byId);
router.get("/:id/similar", Front.ProductController.similar);
router.post("/:id/review", auth, Front.ProductController.review);

module.exports = router;
