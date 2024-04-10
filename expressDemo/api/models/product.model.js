const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/config");

const Product = model(
  "Product",
  new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      summary: { type: String, required: true },
      price: { type: Number, required: true },
      discounted_price: { type: Number, required: true },
      images: [{ type: String, rquired: true }],
      catagoryId: { type: Schema.Types.ObjectId, required: true },
      brandId: { type: Schema.Types.ObjectId, rquired: true },
      status: { type: Boolean, default: true },
      featured: { type: Boolean, default: false },
    },
    modelConfig
  )
);

module.exports = Product;
