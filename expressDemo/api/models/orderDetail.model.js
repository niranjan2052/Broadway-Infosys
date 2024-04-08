const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/config");

const OrderDetail = model(
  "OrderDetails",
  new Schema(
    {
      orderId: { type: Schema.Types.ObjectId, required: true, ref: "Order" },
      productId: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      total: { type: Number, require: true },
    },
    modelConfig
  )
);

module.exports = OrderDetail;
