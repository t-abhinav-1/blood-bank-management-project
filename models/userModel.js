const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "donar", "organisation", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "donar" || this.role === "admin") return true;
        else return false;
      },
    },
    organisationName: {
      type: String,
      required: function () {
        if (this.role === "organisation") return true;
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
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
