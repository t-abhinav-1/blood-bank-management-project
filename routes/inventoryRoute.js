const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createInventoryController, getInventoryController } = require("../controllers/inventoryController");
const router = express.Router();

//create-inventory || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

//GET-INVENTORY || GET
router.get("/get-inventory", authMiddleware, getInventoryController);

module.exports = router;
