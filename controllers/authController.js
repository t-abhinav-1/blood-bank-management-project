// const userModel = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');

// const registerController = async (req, res) => {
//   try {
//     const existingUser = await userModel.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(200).send({
//         success: false,
//         message: "user already exist",
//       });
//     } else {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(req.body.password, salt);
//       req.body.password = hashedPassword;

//       //rest data
//       const user = new userModel(req.body);
//       await user.save();
//       return res.status(201).send({
//         success: true,
//         message: "Registered Successfully",
//         user,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in Register API",
//       error,
//     });
//   }
// };

// const loginController = async() =>
// {
//     try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (user) {

//       return res.status(200).send({
//         success: true,
//         message: "user already exist",
//       });
//     } else {
//       return res.status(201).send({
//         success: false,
//         message: "Invalid Credentials"
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(501).send({
//       success: false,
//       message: "Error in Login API",
//       error,
//     });
//   }
// }

// module.exports = { registerController, loginController};

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const isExisitingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (isExisitingUser) {
      return res.status(409).send({
        success: false,
        message: "User ALready exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //rest data
    console.log("blood group :", req.body.bloodGroup);
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registerd Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

//login call back
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //compare password
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //check role
    // console.log(user?.role, "1");
    // console.log(req?.body?.role, "2");
    if (user.role !== req.body.role) {
      return res.status(401).send({
        success: false,
        message: "role doesn't match",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
