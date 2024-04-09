const express = require("express");
const ProductRoutes = require("./products.routes");

const router = express.Router();

router.use("/products", ProductRoutes);

module.exports = router;
