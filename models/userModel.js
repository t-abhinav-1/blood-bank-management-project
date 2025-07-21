const mongoose = require("mongoose");
const { inventorySchema } = require("./inventoryModel");
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "donor", "organization", "hospital", "bloodBank"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "donor" || this.role === "admin") return true;
        else return false;
      },
    },
    organizationName: {
      type: String,
      required: function () {
        if (this.role === "organization") return true;
        else return false;
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") return true;
        else return false;
      },
    },
    bloodBankName: {
      type: String,
      required: function () {
        if (this.role === "bloodBank") return true;
        else return false;
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    bloodGroup: {
      type: String,
      required: function () {
        if (this.role === "donor") return true;
        else return false;
      },
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address  is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    inventory: {
      type: [inventorySchema],
      default: [], // start with an empty array
      validate: {
        // option: require at least one entry if role is bloodBank
        validator: function (arr) {
          return this.role === "bloodBank" ? Array.isArray(arr) : true;
        },
        message: "Only bloodBank users hold an inventory array",
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
