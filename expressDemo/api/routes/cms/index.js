const express = require("express");

const staffsRoutes = require("./staffs.routes");
const customerRoutes = require("./customer.routes");
const brandRoutes = require("./brand.routes");
const catagoryRoutes = require("./catagory.routes");
const productRoutes = require("./products.routes");
const reviewRoutes = require("./reviews.routes");
const orderRoutes = require("./orders.routes");
const router = express.Router();
const { adminAccess } = require("@/lib");

router.use("/staffs", adminAccess, staffsRoutes);
router.use("/customer", customerRoutes);
router.use("/brand", brandRoutes);
router.use("/catagory", catagoryRoutes);
router.use("/products",productRoutes);
router.use("/reviews",reviewRoutes);
router.use("/orders",orderRoutes);

module.exports = router;
