const express = require("express");
const { Front } = require("../../controllers");

const router = express.Router();

router.get("/featured", Front.ProductController.featured);
router.get("/latest", Front.ProductController.latest);
router.get("/top", Front.ProductController.top);
router.get("/byId", Front.ProductController.byId);
router.get("/similar", Front.ProductController.similar);
router.get("/review", Front.ProductController.review);
router.get("/search", Front.ProductController.search);

module.exports = router;
