const asyncHandlers = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandlers(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter All Required Details");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      medicine: user.medicine,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed To Create User!");
  }
});

const authUser = asyncHandlers(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const addMedicine = asyncHandlers(async (req, res) => {
  const { id, newMedicine } = req.body;
  if (!id) {
    res.status(401);
    throw new Error("Authentication Expired!");
  }
  if (!newMedicine) {
    res.status(400);
    throw new Error("Please input all the Medicine Details!");
  }
  try {
    let user = await User.findById(id);
    if (user) {
      const index = user.medicine.findIndex(
        (m) => m.medName === newMedicine.medName
      );
      if (index === -1 || user.medicine.length === 0) {
        const newMedicineList = user.medicine;
        newMedicineList.push(newMedicine);
        user = await User.findOneAndUpdate(
          { _id: id },
          { $set: { medicine: newMedicineList } },
          { new: true }
        );
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          medicine: user.medicine,
        });
      } else {
        res.status(202).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          medicine: user.medicine,
        });
      }
    } else {
      res.status(400);
      throw new Error("User not Found!");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const removeMedicine = asyncHandlers(async (req, res) => {
  const { id, medId } = req.body;
  if (!id) {
    res.status(401);
    throw new Error("Authentication Expired!");
  }
  if (!medId) {
    res.status(400);
    throw new Error("Please Select an Medicine!");
  }
  try {
    let user = await User.findById(id);
    if (user) {
      const index = user.medicine.findIndex((m) => m._id == medId);
      if (index !== -1) {
        const newMedicineList = user.medicine;
        newMedicineList.splice(index, 1);
        user = await User.findOneAndUpdate(
          { _id: id },
          { $set: { medicine: newMedicineList } },
          { new: true }
        );
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          medicine: user.medicine,
        });
      } else {
        res.status(400);
        throw new Error("Medicine not Found!");
      }
    } else {
      res.status(400);
      throw new Error("User not Found!");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateMedicine = asyncHandlers(async (req, res) => {
  const { id, medId, updatedMedValue } = req.body;
  if (!id) {
    res.status(401);
    throw new Error("Authentication Expired!");
  }
  if (!medId) {
    res.status(400);
    throw new Error("Please Select an Medicine!");
  }
  if (!updatedMedValue) {
    res.status(400);
    throw new Error("No Data Found");
  }
  try {
    let user = await User.findById(id);
    if (user) {
      const index = user.medicine.findIndex((m) => m._id == medId);
      if (index !== -1) {
        const newMedicineList = user.medicine;
        newMedicineList[index] = updatedMedValue;
        user = await User.findOneAndUpdate(
          { _id: id },
          { $set: { medicine: newMedicineList } },
          { new: true }
        );
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          medicine: user.medicine,
        });
      } else {
        res.status(400);
        throw new Error("Medicine not Found!");
      }
    } else {
      res.status(400);
      throw new Error("User not Found!");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  registerUser,
  authUser,
  addMedicine,
  removeMedicine,
  updateMedicine,
};
