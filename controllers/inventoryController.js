// const inventoryModel = require("../models/inventoryModel");
// const userModel = require("../models/userModel");

// const createInventoryController = async (req, res) => {
//   try {
//     //validation
//     //saving data, creating inventory
//     const { email, inventoryType } = req.body;
//     //validation
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       throw new Error("User Not Found");
//     }
//     if (inventoryType === "in" && user.role !== "donor") {
//       throw new Error("Not a donor account");
//     }
//     if (inventoryType === "out" && user.role !== "hospital") {
//       throw new Error("Not a hospital");
//     }

//     if (req.body.inventoryType == "out") {
//       const requestedBloodGroup = req.body.bloodGroup;
//       const requestedQuantityOfBlood = req.body.quantity;
//       const organization = new mongoose.Types.ObjectId(req.body.userId);
//       //calculate Blood Quanitity
//       const totalInOfRequestedBlood = await inventoryModel.aggregate([
//         {
//           $match: {
//             organization,
//             inventoryType: "in",
//             bloodGroup: requestedBloodGroup,
//           },
//         },
//         {
//           $group: {
//             _id: "$bloodGroup",
//             total: { $sum: "$quantity" },
//           },
//         },
//       ]);
//       // console.log("Total In", totalInOfRequestedBlood);
//       const totalIn = totalInOfRequestedBlood[0]?.total || 0;
//       //calculate OUT Blood Quanitity

//       const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
//         {
//           $match: {
//             organization,
//             inventoryType: "out",
//             bloodGroup: requestedBloodGroup,
//           },
//         },
//         {
//           $group: {
//             _id: "$bloodGroup",
//             total: { $sum: "$quantity" },
//           },
//         },
//       ]);
//       const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

//       //in & Out Calc
//       const availableQuanityOfBloodGroup = totalIn - totalOut;
//       //quantity validation
//       if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
//         return res.status(500).send({
//           success: false,
//           message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
//         });
//       }
//       req.body.hospital = user?._id;
//     } else {
//       req.body.donor = user?._id;
//     }

//     //save record
//     const inventory = new inventoryModel(req.body);
//     await inventory.save();
//     return res.status(202).send({
//       success: true,
//       message: "New Blood Record Added",
//     });
//   } catch (error) {
//     console.log(error);
//     res.send(201)({
//       success: false,
//       message: "error in Creating Inventory",
//       error,
//     });
//   }
// };

// // GET ALL BLOOD RECORS
// const getInventoryController = async (req, res) => {
//   try {
//     const inventory = await inventoryModel
//       .find({
//         organization: req.user.userId,
//       })
//       .populate("donor")
//       .populate("hospital")
//       .sort({ createdAt: -1 });
//     return res.status(200).send({
//       success: true,
//       messaage: "get all records successfully",
//       inventory,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error In Get All Inventory",
//       error,
//     });
//   }
// };

// module.exports = { createInventoryController, getInventoryController };

const mongoose = require("mongoose");
const { inventoryModel } = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation of email
    const donor = await userModel.findOne({ email });
    if (!donor) {
      throw new Error("User Not Found");
    }

    if (donor.role === "donor") {
      req.body.donor = donor?._id;
    } else if (donor.role === "organization") {
      req.body.organization = donor?._id;
    } else if (donor.role === "hospital") {
      req.body.hospital = donor?._id;
    }

    // if (inventoryType === "in" && user.role !== "donor") {
    //   throw new Error("Not a donor account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    // if (req.body.inventoryType == "out") {
    //   const requestedBloodGroup = req.body.bloodGroup;
    //   const requestedQuantityOfBlood = req.body.quantity;
    //   const bloodBank = new mongoose.Types.ObjectId(req.body.bloodBank);
    //   //calculate Blood Quanitity
    //   const totalInOfRequestedBlood = await inventoryModel.aggregate([
    //     {
    //       $match: {
    //         organization,
    //         inventoryType: "in",
    //         bloodGroup: requestedBloodGroup,
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: "$bloodGroup",
    //         total: { $sum: "$quantity" },
    //       },
    //     },
    //   ]);
    //   // console.log("Total In", totalInOfRequestedBlood);
    //   const totalIn = totalInOfRequestedBlood[0]?.total || 0;
    //   //calculate OUT Blood Quanitity

    //   const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
    //     {
    //       $match: {
    //         bloodBank,
    //         inventoryType: "out",
    //         bloodGroup: requestedBloodGroup,
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: "$bloodGroup",
    //         total: { $sum: "$quantity" },
    //       },
    //     },
    //   ]);
    //   const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

    //   //in & Out Calc
    //   const availableQuanityOfBloodGroup = totalIn - totalOut;
    //   //quantity validation
    //   if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
    //     return res.status(500).send({
    //       success: false,
    //       message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
    //     });
    //   }
    //   req.body.hospital = user?._id;
    // }

    // inside your createInventoryController, replace the central aggregation with:

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantity = req.body.quantity;
      const bloodBankId = req.body.bloodBank; // ensure this is set

      // 🔍 1. Fetch that blood‑bank’s user and its embedded inventory
      const bankUser = await userModel.findById(bloodBankId).select("inventory").lean(); // lean() gives us plain JS objects

      if (!bankUser) {
        return res.status(404).json({ success: false, message: "Blood‑bank not found" });
      }

      // 🔍 2. Filter for this group
      const entriesForGroup = (bankUser.inventory || []).filter((e) => e.bloodGroup === requestedBloodGroup);

      // 🔢 3. Sum ins and outs
      const totalIn = entriesForGroup.filter((e) => e.inventoryType === "in").reduce((sum, e) => sum + e.quantity, 0);

      const totalOut = entriesForGroup.filter((e) => e.inventoryType === "out").reduce((sum, e) => sum + e.quantity, 0);

      // 🔢 4. Available = in – out
      const availableQuantity = totalIn - totalOut;

      // 🚫 5. Validate
      if (availableQuantity < requestedQuantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${availableQuantity}ML of ${requestedBloodGroup} is available`,
        });
      }

      // ✅ 6. Everything’s fine—tag the req with hospital ID and continue
      // req.body.hospital = req.user._id;
    }

    //in part
    else {
      //req.body.donor = user?._id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    // add the code here chatGPT so that the above new inventory is added to bloodbank user inventory

    // 2️⃣ **Push the same entry into the blood‑bank user’s embedded inventory array**
    if (req.body.bloodBank) {
      // Build the subdoc exactly like your Inventory schema expects.
      // const entryForUser = {
      //   inventoryType: inventory.inventoryType,
      //   bloodGroup:    inventory.bloodGroup,
      //   quantity:      inventory.quantity,
      //   email:         inventory.email,
      //   organization:  inventory.organization,
      //   hospital:      inventory.hospital,
      //   donor:         inventory.donor,
      //   createdAt:     inventory.createdAt,
      //   updatedAt:     inventory.updatedAt,
      // };

      await userModel.findByIdAndUpdate(req.body.bloodBank, { $push: { inventory: inventory } }, { new: true, runValidators: true });
    }

    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
  try {
    // 1️⃣ Fetch the user by ID, selecting only the inventory field
    const userWithInventory = await userModel
      .findById(req.user.userId)
      .select("inventory")
      // Populate donor & hospital refs inside each subdoc
      .populate("inventory.donor", "name email")
      .populate("inventory.hospital", "name email");

    if (!userWithInventory) {
      return res.status(404).send({
        success: false,
        message: "Blood‑bank user not found",
      });
    }

    // 2️⃣ Grab and sort the array by createdAt descending
    const inventory = (userWithInventory.inventory || []).slice().sort((a, b) => b.createdAt - a.createdAt);

    // 3️⃣ Send back the embedded inventory
    return res.status(200).send({
      success: true,
      message: "All inventory records fetched successfully",
      inventory,
    });
  } catch (error) {
    //  catch (error) {
    //   console.error(error);
    //   return res.status(500).send({
    //     success: false,
    //     message: "Error in fetching inventory from user details",
    //     error: error.message || error,
    //   });
    // }

    // try {
    //   console.log("line 1");
    //   const inventory = await inventoryModel
    //     .find({
    //       organization: req.user.userId,
    //     })
    //     .populate("donor")
    //     .populate("hospital")
    //     .sort({ createdAt: -1 });
    //   console.log("line 2");
    //   return res.status(200).send({
    //     success: true,
    //     messaage: "get all records successfully",
    //     inventory,
    //   });
    //   }
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};
// GET Hospital BLOOD RECORS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel.find(req.body.filters).populate("donor").populate("hospital").populate("organization").populate("bloodBank", "bloodBankName email").sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all hospital in and out records fetched successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
      })
      .limit(5)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

// // GET DONOR RECORDS
// const getDonorsController = async (req, res) => {
//   try {
//     const organization = req.user.userId;
//     //find donors
//     const donorId = await inventoryModel.distinct("donor", {
//       organization,
//     });
//     // console.log(donorId);
//     const donors = await userModel.find({ _id: { $in: donorId } });

//     return res.status(200).send({
//       success: true,
//       message: "Donor Record Fetched Successfully",
//       donors,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in Donor records",
//       error,
//     });
//   }
// };

const getDonorsController = async (req, res) => {
  try {
    const bloodBankId = req.user.userId;

    // 1️⃣ Load only the embedded inventory array for this bank
    const bankUser = await userModel.findById(bloodBankId).select("inventory").lean();

    if (!bankUser) {
      return res.status(404).json({
        success: false,
        message: "Blood‑bank user not found",
      });
    }

    // 2️⃣ Pull out all donor IDs from “in” entries
    const donorIds = [...new Set((bankUser.inventory || []).filter((entry) => entry.inventoryType === "in" && entry.donor).map((entry) => entry.donor.toString()))];

    // 3️⃣ Fetch those donor profiles
    const donors = await userModel.find(
      { _id: { $in: donorIds } },
      "name email phone createdAt updatedAt address bloodGroup" // project only needed fields
    );

    // 4️⃣ Respond
    return res.status(200).json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    console.error("getDonorsController error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching donors from embedded inventory",
      error: error.message || error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    // const organization = req.user.userId;
    // //GET HOSPITAL ID
    // const hospitalId = await inventoryModel.distinct("hospital", {
    //   organization,
    // });
    // //FIND HOSPITAL
    // const hospitals = await userModel.find({
    //   _id: { $in: hospitalId },
    // });

    const hospitals = await userModel.find({
      role: "hospital",
    });

    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};

// GET ALLLLLL ORG PROFILES
const getOrganizationController = async (req, res) => {
  try {
    // const donor = req.user.userId;
    // const orgId = await inventoryModel.distinct("organization", { donor });
    //find org
    // const organizations = await userModel.find({
    //   _id: { $in: orgId },
    // });

    const organizations = await userModel.find({
      role: "organization",
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};
// GET ORG for Hospital
// const getOrganizationForHospitalController = async (req, res) => {
//   try {
//     const hospital = req.user.userId;
//     const orgId = await inventoryModel.distinct("organization", { hospital });
//     //find org
//     // const organizations = await userModel.find({
//     //   _id: { $in: orgId },
//     // });
//     const organizations = await userModel.find({
//       role: "organization",
//     });
//     return res.status(200).send({
//       success: true,
//       message: "Hospital Org Data Fetched Successfully",
//       organizations,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error In Hospital ORG API",
//       error,
//     });
//   }
// };

// GET ALLL Blood Banks for donors, organizations, hospitals
const getBloodBanks = async (req, res) => {
  try {
    // 1️⃣ Query for every user whose role is "bloodBank"
    const bloodBanks = await userModel.find(
      { role: "bloodBank" },
      "bloodBankName email phone address website" // project whichever fields you need
    );

    // 2️⃣ Send the list back
    return res.status(200).json({
      success: true,
      count: bloodBanks.length,
      bloodBanks,
    });
  } catch (error) {
    console.error("getBloodBanks error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching blood‑bank users",
      error: error.message || error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalController,
  getOrganizationController,
  // getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
  getBloodBanks,
};
