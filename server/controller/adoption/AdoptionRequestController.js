import AdoptionRequest from "../../model/adoption/AdoptionRequestModel.js";
import Pet from "../../model/pet/petModel.js";
import User from "../../model/user/userModel.js";
import nodemailer from "nodemailer";

// @route   POST /adoptions/applyadoption/:adopter/:offer
// @desc    Create an adoption request
// @access  Adopter
export const applyAdoption = async (req, res) => {
  try {
    const newAdoptionRequest = await AdoptionRequest.create({
      pet: req.body.pet,
      adopter: req.body.adopter,
      houseCondition: req.body.houseCondition,
      commitment: req.body.commitment,
      experience: req.body.experience,
      createdAt: new Date().toISOString(),
    });
    const providerInfo = await Pet.findById(req.body.pet)
      .populate("provider", "_id name email")
      .select("name provider");

    const adopterInfo = await User.findById(req.body.adopter).select("name");

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_CRED,
        pass: process.env.PASSWORD_CRED,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_CRED,
      to: providerInfo.provider.email,
      subject: "Pengajuan Adopsi Baru",
      text:
        "Hallo " +
        providerInfo.provider.name +
        ",\n\n" +
        adopterInfo.name +
        " mengajukan permintaan adopsi pada penawaranmu!\nAyo buka https://www.adopsiku.site/ untuk melihat detailnya" +
        ".\n" +
        "catatan: review pengajuan sebelum batal otomatis dalam 2 hari",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error.message);
      }
      console.log("Message sent: %s", info.messageId);
    });

    res.status(200).send({ newAdoptionRequest });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/offer/:id
// @desc    get adoption requests by offer
// @access  Provider
export const getAdoptionsByAdopter = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequest.find({
      adopter: req.params.id,
    })
      .populate({
        path: "pet",
        populate: {
          path: "provider",
        },
      })
      .populate("adopter");

    res.status(200).send({ adoptionRequests });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/offer/:id
// @desc    get adoption requests by offer
// @access  Provider
export const getAdoptionsByProvider = async (req, res) => {
  try {
    const adoptionReq = await AdoptionRequest.find()
      .populate({
        path: "pet",
        populate: {
          path: "provider",
          match: { _id: req.params.id },
        },
      })
      .populate("adopter");
    const adoptionRequests = adoptionReq.filter(
      (adoption) => adoption.pet.provider !== null
    );

    res.status(200).send({ adoptionRequests });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   PUT /adoptions/update/:id
// @desc    Update an adoption request
// @access  Adopter and provider
export const updateAdoption = async (req, res) => {
  try {
    const updatedAdoptionRequest = await AdoptionRequest.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).send({ updatedAdoptionRequest });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   DELETE /adoptions/canceladoption/:id
// @desc    Delete an adoption request
// @access  Adopter
export const cancelAdoption = async (req, res) => {
  try {
    await AdoptionRequest.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/offer/:id
// @desc    get adoption requests by offer
// @access  Provider
export const getAdoptionByOffer = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequest.find({
      pet: req.params.id,
    });
    res.status(200).send({ adoptionRequests });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   GET /adoptions/detail/:id
// @desc    get an adoption request detail
// @access  Adopter and provider
export const getAdoptionDetail = async (req, res) => {
  try {
    const adoptionRequest = await AdoptionRequest.findById(req.params.id);
    res.status(200).send({ adoptionRequest });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// @route   PUT /adoptions/updatestatus
// @desc    update an adoption request status
// @access  provider
export const updateAdoptionStatus = async (req, res) => {
  try {
    await AdoptionRequest.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    if (req.body.status === 2) {
      const adopter = await AdoptionRequest.findById(req.params.id)
        .select("adopter")
        .populate("adopter", "name email");
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_CRED,
          pass: process.env.PASSWORD_CRED,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_CRED,
        to: adopter.adopter.email,
        subject: "Penerimaan Pengajuan Adopsi",
        text:
          "Hallo " +
          adopter.adopter.name +
          ",\n\n" +
          "Pengajuan permintaan adopsimu telah diterima, segera hubungi penyedia untuk informasi selanjutnya!\nAyo buka https://www.adopsiku.site/ untuk melihat detailnya" +
          ".\n",
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error.message);
        }
        console.log("Message sent: %s", info.messageId);
      });
    }
    res.status(200).send({ message: "Update status adopsi sukses dilakukan" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
