const { Schema, model } = require("mongoose");
const { modelConfig } = require("@/config");

const Catagory = model(
  "Catagory",
  new Schema(
    {
      name: { type: String, required: true },
      status: { type: Boolean, default: true },
    },
    modelConfig
  )
);

module.exports = Catagory;
