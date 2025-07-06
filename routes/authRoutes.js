
const express = require('express');

const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//REGISTER || POST
router.post('/Register', registerController);

//LOGIN || POST
router.post('/Login', loginController);

//CURRENT-USER || GET
router.get('/current-user',authMiddleware, currentUserController);
module.exports = router