const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/config");

const Orders = model(
  "Orders",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      status: {
        type: String,
        required: true,
        enum: ["Processing", "Confirmed", "Shipping", "Delivered", "Cancelled"],
        default: "Processing",
      },
    },
    modelConfig
  )
);

module.exports = Orders;
