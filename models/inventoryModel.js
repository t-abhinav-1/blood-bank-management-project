const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type require"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      require: [true, "blood quanity is require"],
    },
    email: {
      type: String,
      required: [true, "Donor/Hospital/Organization Email is Required"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [false, "organization/donor/hospital is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [false, "organization/donor/hospital is required"],
    },
    bloodBank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "blood bank is required"],
    },
  },
  { timestamps: true }
);

module.exports = { inventoryModel: mongoose.model("Inventory", inventorySchema), inventorySchema };
