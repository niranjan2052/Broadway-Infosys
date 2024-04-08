const express = require("express");

const StaffsRoutes = require("./staffs.routes");
const CustomerRoutes = require("./customer.routes");
const BrandRoutes = require("./brand.routes");
const CatagoryRoutes = require("./catagory.routes");
const ProductRoutes = require("./products.routes");
const router = express.Router();
const { adminAccess } = require("@/lib");

router.use("/staffs", adminAccess, StaffsRoutes);
router.use("/customer", CustomerRoutes);
router.use("/brand", BrandRoutes);
router.use("/catagory", CatagoryRoutes);
router.use("/products",ProductRoutes);

module.exports = router;
