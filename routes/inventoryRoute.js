// const express = require("express");

// const authMiddleware = require("../middlewares/authMiddleware");
// const { createInventoryController, getInventoryController } = require("../controllers/inventoryController");
// const router = express.Router();

// //create-inventory || POST
// router.post("/create-inventory", authMiddleware, createInventoryController);

// //GET-INVENTORY || GET
// router.get("/get-inventory", authMiddleware, getInventoryController);

// module.exports = router;

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createInventoryController, getInventoryController, getDonorsController, getHospitalController, getOrganizationController, getInventoryHospitalController, getRecentInventoryController, getBloodBanks } = require("../controllers/inventoryController");

const router = express.Router();

//routes
// ADD INVENTORY || POST || Called by modal from blood bank
router.post("/create-inventory", authMiddleware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddleware, getInventoryController);
//GET RECENT BLOOD RECORDS
router.get("/get-recent-inventory", authMiddleware, getRecentInventoryController);

//GET HOSPITAL BLOOD RECORDS
router.post("/get-inventory-hospital", authMiddleware, getInventoryHospitalController);

//GET DONOR RECORDS 
//blood bank specific donors
router.get("/get-donors", authMiddleware, getDonorsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddleware, getHospitalController);

//GET allllll organization RECORDS
router.get("/get-organization", authMiddleware, getOrganizationController);

// //GET organization RECORDS
// router.get("/get-organization-for-hospital", authMiddleware, getOrganizationForHospitalController);

//GET ALLLLLLL BLOOD RECORDS
router.get("/get-bloodBanks", authMiddleware, getBloodBanks);

module.exports = router;
