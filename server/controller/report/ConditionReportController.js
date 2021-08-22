import ConditionReport from "../../model/report/ConditionReportModel.js";
import AdoptionRequest from "../../model/adoption/AdoptionRequestModel.js";
import Pet from "../../model/pet/petModel.js";
import nodemailer from "nodemailer";
import { inspect } from "util";
import { match } from "assert";

export const createReport = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
      .select("name status provider conditionReports")
      .populate("provider", "_id name email");
    //note: duration and status check needed
    if (!pet) {
      res.status(400).send("Hewan Tidak Ada");
      return;
    } else {
      if (pet.status !== 2) {
        res.status(400).send("Tahap Adopsi Belum Selesai");
        return;
      }
    }
    const createdReport = await ConditionReport.create({
      type: req.body.type,
      title: req.body.title,
      photos: req.body.photos,
      status: false,
      description: req.body.description,
      createdAt: new Date().toISOString(),
    });
    const report = pet.conditionReports.concat([createdReport._id]);
    await Pet.findByIdAndUpdate(req.params.id, { conditionReports: report });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_CRED,
        pass: process.env.PASSWORD_CRED,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_CRED,
      to: pet.provider.email,
      subject: "Laporan Kondisi Hewan Baru",
      text:
        "Halo " +
        pet.provider.name +
        ",\n\n" +
        "Kondisi terbaru dari " +
        pet.name +
        " ,baru saja dilaporkan!\nAyo buka https://www.adopsiku.site/ untuk melihat detailnya" +
        ".\n",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error.message);
      }
      console.log("Message sent: %s", info.messageId);
    });

    res.status(200).send({ createdReport });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const updateReport = async (req, res) => {
  try {
    await ConditionReport.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ message: "update berhasil" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const deleteReport = async (req, res) => {
  try {
    await ConditionReport.findByIdAndDelete(req.params.id);
    const pet = await Pet.find(
      { conditionReports: req.params.id },
      "conditionReports"
    );
    const report = pet[0].conditionReports.filter(
      (conditionReport) => conditionReport.toString() !== req.params.id
    );
    const test = await Pet.findByIdAndUpdate(pet[0]._id, {
      conditionReports: report,
    });
    res.status(200).send({ message: "Laporan berhasil dihapus" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const acceptReport = async (req, res) => {
  try {
    await ConditionReport.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res.status(200).send({ message: "status updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const getPetByProvider = async (req, res) => {
  try {
    const reports = await Pet.find({
      provider: req.params.id,
      status: 2,
    })
      .select("name")
      .select("photos")
      .select("reportDuration");

    res.status(200).send({ reports });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const getReportByAdoption = async (req, res) => {
  try {
    const reports = await AdoptionRequest.find({
      adopter: req.params.id,
      status: 2,
    })
      .select("status")
      .populate({
        path: "pet",
        match: { status: 2 },
      });

    res.status(200).send({ reports });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const getReportsList = async (req, res) => {
  try {
    const reports = await Pet.find({
      _id: req.params.id,
      status: 2,
    })
      .select("name")
      .select("conditionReports")
      .populate("conditionReports");

    res.status(200).send(reports[0]);
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const getReportDetail = async (req, res) => {
  try {
    const report = await ConditionReport.findById(req.params.id);
    res.status(200).send({ report });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};
