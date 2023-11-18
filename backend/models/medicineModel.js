const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema(
  {
    medName: { type: String, required: true, trim: true },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    dosageTime: [{ type: Date, required: true }],
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
