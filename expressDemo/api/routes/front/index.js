const express = require("express");
const ProductRoutes = require("./products.routes");
const MiscRoutes = require("./misc.routes");

const router = express.Router();

router.use("/products", ProductRoutes);
router.use("/", MiscRoutes);

module.exports = router;
