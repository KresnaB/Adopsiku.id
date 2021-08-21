import Conversation from "../../model/conversation/conversationModel.js";
import User from "../../model/user/userModel.js";
import ArchivedMessage from "../../model/conversation/archivedMessageModel.js";
import nodemailer from "nodemailer";

// @route   POST /adoptions/applyadoption/:adopter/:offer
// @desc    Create an adoption request
// @access  Adopter
export const createConversation = async (req, res) => {
  try {
    let checkConvExist = await Conversation.find({
      participants: [req.body.senderId, req.body.receiverId],
    });
    const sender = await User.findById(req.body.receiverId).select("name");
    const receiver = await User.findById(req.body.receiverId).select(
      "name email"
    );
    if (!receiver) {
      res.status(200).send({ message: "Pengguna tidak ditemukan" });
      return;
    }
    if (checkConvExist.length !== 0) {
      res.status(200).send({ message: "Percakapan sudah ada" });
      return;
    }
    checkConvExist = await Conversation.find({
      participants: [req.body.receiverId, req.body.senderId],
    });
    if (checkConvExist.length !== 0) {
      res.status(200).send({ message: "Percakapan sudah ada" });
      return;
    }
    const newConversation = await Conversation.create({
      participants: [req.body.senderId, req.body.receiverId],
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_CRED,
        pass: process.env.PASSWORD_CRED,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_CRED,
      to: receiver.email,
      subject: "Percakapan Baru di Adopsiku",
      text:
        "Hallo " +
        receiver.name +
        ",\n\n" +
        sender.name +
        " memulai percakapan dengamu!\nAyo buka https://www.adopsiku.site/ untuk melihat detailnya" +
        ".\n",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error.message);
      }
      console.log("Message sent: %s", info.messageId);
    });
    res.status(200).send({ newConversation });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/offer/:id
// @desc    get adoption requests by offer
// @access  Provider
export const getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.params.id] },
    })
      .populate("participants")
      .select("_id")
      .select("participants");

    res.status(200).send({ conversations });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/offer/:id
// @desc    get adoption requests by offer
// @access  Provider
export const getMessages = async (req, res) => {
  try {
    const messages = await Conversation.findById(req.params.id);

    res.status(200).send({ messages });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const getArchives = async (req, res) => {
  try {
    let messages = await ArchivedMessage.find({
      conversationId: req.params.id,
    });
    messages = messages[0];
    res.status(200).send({ messages });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    const { sender, receiver, content } = req.body;
    const message = {
      sender: sender,
      receiver: receiver,
      content: content,
      createdAt: new Date().toISOString(),
    };

    if (conversation.messages.length > 99) {
      const popMessage = conversation.messages.shift();
      let archivedMessage = await ArchivedMessage.find({
        conversationId: req.params.id,
      });
      archivedMessage = archivedMessage[0];
      if (!archivedMessage) {
        archivedMessage = await ArchivedMessage.create({
          conversationId: req.params.id,
        });
      }
      archivedMessage.messages.push(popMessage);
      archivedMessage.save();

      conversation.messages.push(message);
      conversation.save();
    } else {
      conversation.messages.push(message);
      conversation.save();
    }

    res.status(200).send({ message });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
