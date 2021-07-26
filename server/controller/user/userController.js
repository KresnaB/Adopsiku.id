import Users from "../../model/user/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

import Pet from "../../model/pet/petModel.js";
import Offer from "../../model/pet/offerModel.js";
import Adopters from "../../model/user/adopterModel.js";
import IndProviders from "../../model/user/indProviderModel.js";
import OrgProviders from "../../model/user/orgProviderModel.js";
import Token from "../../model/user/tokenModel.js";
import validateRegisterInput from "./validation/registerValidation.js";
import Address from "../../model/user/addressModel.js";

// @route   POST /signin/
// @desc    Sign in action
// @access  Public
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!existingUser.isVerified)
      return res
        .status(401)
        .json({ message: "Your account has not been verified." });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      },
      "test",
      { expiresIn: "3h" }
    );

    res.status(200).json({
      id: existingUser._id,
      name: existingUser.name,
      role: existingUser.role,
      imageUrl: existingUser.imageUrl,
      isVerified: existingUser.isVerified,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// @route   POST /signin/
// @desc    Sign in action
// @access  Public
export const googleSignIn = async (req, res) => {
  const { email, imageUrl, name } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const updatedUser = await Users.findByIdAndUpdate(
      existingUser._id,
      req.body
    );

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      },
      "test",
      { expiresIn: "3h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// @route   GET /users/
// @desc    Get all users
// @access  Public
export const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.send({ users });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /users/:id
// @desc    Get a specific user
// @access  Public
export const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.send({ user });
  } catch (err) {
    res.status(404).send({ message: "User not found!" });
  }
};

// @route   POST /:type
// @desc    Create User Based On Role
// @access  Public
export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(404).json({ message: "User already exists." });
  }

  try {
    let userData;
    let emailVerificationToken;
    switch (req.params.type) {
      case "adopter":
        const adopterHashedPassword = await bcrypt.hash(password, 12);

        userData = await new Adopters({
          createdAt: new Date().toISOString(),
          name,
          email,
          password: adopterHashedPassword,
          status: "Available",
          imageUrl: "",
          phoneNumber: "",
          birthDate: null,
          fixedJob: false,
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
        emailVerificationToken = await new Token({
          userId: userData._id,
          token: crypto.randomBytes(16).toString("hex"),
        }).save();
        break;
      case "indProvider":
        const individualHashedPassword = await bcrypt.hash(password, 12);
        userData = await new IndProviders({
          createdAt: new Date().toISOString(),
          name,
          email,
          password: individualHashedPassword,
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
        emailVerificationToken = await new Token({
          userId: userData._id,
          token: crypto.randomBytes(16).toString("hex"),
        }).save();
        break;
      case "orgProvider":
        const organizationHashedPassword = await bcrypt.hash(password, 12);
        userData = await new OrgProviders({
          createdAt: new Date().toISOString(),
          name,
          email,
          password: organizationHashedPassword,
          status: "Available",
          imageUrl: "",
          phoneNumber: "",
          personInCharge: "",
          address: {
            province: "",
            city: "",
            district: "",
            village: "",
            additional: "",
          },
          veterinarian: {
            name: "",
            personInCharge: "",
            address: "",
          },
        }).save();
        emailVerificationToken = await new Token({
          userId: userData._id,
          token: crypto.randomBytes(16).toString("hex"),
        }).save();
        break;
      default:
        console.log(`No user with ${req.params.type} role!`);
        res.send(`No user with ${req.params.type} role!`);
        break;
    }
    // Send the email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "adopsiku.id@gmail.com",
        pass: "Inipasswordkuat123",
      },
    });
    const mailOptions = {
      from: "adopsiku.id@gmail.com",
      to: userData.email,
      subject: "Account Verification Token",
      text:
        "Hello,\n\n" +
        "Please verify your account by clicking the link: \nhttps://www.adopsiku.site/confirmation/" +
        emailVerificationToken.token +
        ".\n" +
        "expired in 1 hour",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error.message);
      }
      console.log("Message sent: %s", info.messageId);
    });
    res.status(200).json({
      id: userData._id,
      name: userData.name,
      email: userData.email,
      isVerified: false,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
// @route   PUT /orgProviders/:id
// @desc    Update an organizational provider
// @access  Public
export const updateUser = async (req, res) => {
  try {
    switch (req.body.role) {
      case "Adopter":
        const updatedAdopter = await Adopters.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        res.send({ updatedAdopter });
        break;
      case "IndividualProvider":
        const updatedIndividual = await IndProviders.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        res.send({ updatedIndividual });
        break;
      case "OrganizationalProvider":
        const updatedOrganization = await OrgProviders.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        res.send({ updatedOrganization });
        break;
      default:
        console.log(`No user with ${req.body.role} role!`);
        res.send(`No user with ${req.body.role} role!`);
        break;
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
