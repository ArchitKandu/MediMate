const express = require("express");
const { registerUser, authUser, addMedicine } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(authUser);
router.route("/addMedicine").post(protect, addMedicine);

module.exports = router;
