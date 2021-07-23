import Adopters from "../../../model/user/adopterModel.js";
import Users from "../../../model/user/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateRegisterInput from "../validation/registerValidation.js";
// @route   POST /signup/
// @desc    Register as adopter
// @access  Public
export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(404).json({ email: "User already exists." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await new Adopters({
      createdAt: new Date().toISOString(),
      name,
      email,
      password: hashedPassword,
      status: "Available",
      imageUrl: "",
      phoneNumber: "",
      birthDate: null,
      address: {
        province: "",
        city: "",
        district: "",
        village: "",
        additional: "",
      },
      gender: "",
      identityNumber: "",
    }).save();
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    // res.send({ result });
    return res.status(200).json({
      id: result._id,
      name: result.name,
      role: result.role,
      imageUrl: result.imageUrl,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// @route   GET /adopters/
// @desc    Get all adopters
// @access  Public
export const getAdopters = async (req, res) => {
  try {
    const adopters = await Adopters.find({});
    res.send({ adopters });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adopters/:id
// @desc    Get a specific adopter
// @access  Public
export const getAdopterById = async (req, res) => {
  try {
    const adopter = await Adopters.findById(req.params.id);
    res.send({ adopter });
  } catch (err) {
    res.status(404).send({ message: "Adopter not found!" });
  }
};

// @route   POST /adopters/
// @desc    Create an adopter
// @access  Public
export const createAdopter = async (req, res) => {
  try {
    const newAdopter = await Adopters.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
      phoneNumber: req.body.phoneNumber,
      address: {
        province: req.body.address.province,
        city: req.body.address.city,
        postalCode: req.body.address.postal_code,
        street: req.body.address.street,
      },
      birthDate: new Date(),
      gender: req.body.gender,
      identityNumber: req.body.identityNumber,
    });
    res.send({ newAdopter });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   PUT /adopters/:id
// @desc    Update an adopter
// @access  Public
export const updateAdopter = async (req, res) => {
  try {
    const updatedAdopter = await Adopters.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ updatedAdopter });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
