const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/config");

const Review = model(
  "Review",
  new Schema(
    {
      comment: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    },
    modelConfig
  )
);

module.exports = Review;
