import User from "../../../model/user/userModel.js";
import Token from "../../../model/user/tokenModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

export const confirmation = async (req, res) => {
  try {
    const emailToken = await Token.findOneAndDelete({
      token: req.params.token,
    });
    if (!emailToken.token) {
      res.status(400).send({ message: "Token kadaluarsa" });
      return;
    }
    const userData = await User.findOneAndUpdate(
      { _id: emailToken.userId, isVerified: false },
      { isVerified: true }
    );

    if (userData.isVerified) {
      res
        .status(400)
        .send({ message: "Email sudah terverifikasi silakan login" });
      return;
    }

    const jwtToken = jwt.sign(
      { email: userData.email, id: userData._id, role: userData.role },
      "test",
      { expiresIn: "3h" }
    );

    res.status(200).send({
      id: userData._id,
      name: userData.name,
      role: userData.role,
      imageUrl: userData.imageUrl,
      isVerified: userData.isVerified,
      token: jwtToken,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const resend = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      res.status(400).send({ message: "Email tidak terdaftar silakan daftar" });
      return;
    }
    if (userData.isVerified) {
      res
        .status(400)
        .send({ message: "Email sudah terverifikasi silakan login" });
      return;
    }
    const checkToken = await Token.findOne({ userId: userData._id });
    if (checkToken) {
      res.status(401).send({
        message:
          "Token belum kadaluarsa, cek emailmu!. jika tidak ada coba lagi dalam 1 jam",
      });
      return;
    }
    const emailToken = await new Token({
      userId: userData._id,
      token: crypto.randomBytes(16).toString("hex"),
    }).save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_CRED,
        pass: process.env.PASSWORD_CRED,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_CRED,
      to: userData.email,
      subject: "Account Verification Token",
      text:
        "Hello,\n\n" +
        "Please verify your account by clicking the link: \nhttps://www.adopsiku.site/confirmation/" +
        emailToken.token +
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
    res.status(500).send({ error: err });
  }
};
