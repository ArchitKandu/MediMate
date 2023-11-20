const express = require("express");
const {
  registerUser,
  authUser,
  addMedicine,
  removeMedicine,
  updateMedicine,
  getMedicine,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(authUser);
router.route("/addMedicine").post(protect, addMedicine);
router.route("/removeMedicine").post(protect, removeMedicine);
router.route("/updateMedicine").post(protect, updateMedicine);
router.route("/getMedicine").post(getMedicine);

module.exports = router;
