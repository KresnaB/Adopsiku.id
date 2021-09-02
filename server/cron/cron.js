import cron from "node-cron";
import AdoptionRequest from "../model/adoption/AdoptionRequestModel.js";
import Pet from "../model/pet/petModel.js";
import moment from "moment";
import nodemailer from "nodemailer";

export const cancelAdoption = cron.schedule("* * * * *", () => {
  findExpiredAdoption().then(console.log("checking adoption request"));
});

// export const reportReminderCron = cron.schedule("0 0 * * *", () => {
//   reportReminder().then(console.log("checking report"));
// });

export const sendReportReminder = cron.schedule("* * * * *", () => {
  reminderReport().then(console.log("checking report reminder"));
});

async function findExpiredAdoption() {
  AdoptionRequest.find({ status: 0 }).then((adoptions) => {
    adoptions.forEach(async function (adoption) {
      const duration =
        moment(adoption.createdAt).add(2, "d") - moment(new Date());
      if (duration <= 0) {
        await AdoptionRequest.findByIdAndUpdate(adoption._id, { status: 4 });
      }
    });
  });
}

async function reminderReport() {
  Pet.find({ status: 2 }).then((pets) => {
    pets.forEach(async function (pet) {
      if(pet.nextNotif){
      const duration = moment(pet.nextNotif) - moment(new Date());
      console.log(pet.name)
      if (duration === 0) {
        let receiver = await AdoptionRequest.find({
          pet: pet._id,
          status: 2,
        })
          .select("adopter")
          .populate("adopter", "_id name email");
        receiver = receiver[0];
        if (receiver !== undefined) {
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.EMAIL_CRED,
              pass: process.env.PASSWORD_CRED,
            },
          });
          const mailOptions = {
            from: process.env.EMAIL_CRED,
            to: receiver.adopter.email,
            subject: "Pengingat Pelaporan Kondisi Hewan Adopsi",
            text:
              "Hallo " +
              receiver.adopter.name +
              ",\n\n" +
              "Ayo laporkan kondisi hewan terbaru dari " +
              pet.name +
              "\nBuka https://www.adopsiku.site/ untuk melihat detailnya" +
              ".\n",
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error.message);
            }
            console.log("Message sent: %s", info.messageId);
          });
        }
        await pet.findByIdAndUpdate(adoption._id, { nextNotif: moment(pet.nextNotif).add(pet.reportDuration, pet.satuan) });
      }}
    });
  });
}

// async function reportReminder() {
//   Pet.find({ status: 2 })
//     .select("_id adoptedAt name reportDuration")
//     .then((pets) => {
//       pets.forEach(async function (pet) {
//         if (pet.adoptedAt !== undefined) {
//           let duration = moment(new Date()).diff(moment(pet.adoptedAt), "days");
//           let repDuration = pet.reportDuration;
//           if (duration !== 0 && repDuration !== 0) {
//             if (duration % (repDuration * 7) === 0) {
//               let receiver = await AdoptionRequest.find({
//                 pet: pet._id,
//                 status: 2,
//               })
//                 .select("adopter")
//                 .populate("adopter", "_id name email");
//               console.log(receiver);
//               console.log("lul");
//               receiver = receiver[0];
//               console.log(receiver);
//               if (receiver !== undefined) {
//                 console.log("in");
//                 console.log(receiver);
//                 const transporter = nodemailer.createTransport({
//                   service: "Gmail",
//                   auth: {
//                     user: process.env.EMAIL_CRED,
//                     pass: process.env.PASSWORD_CRED,
//                   },
//                 });
//                 const mailOptions = {
//                   from: process.env.EMAIL_CRED,
//                   to: receiver.adopter.email,
//                   subject: "Pengingat Pelaporan Kondisi Hewan Adopsi",
//                   text:
//                     "Hallo " +
//                     receiver.adopter.name +
//                     ",\n\n" +
//                     "Ayo laporkan kondisi hewan terbaru dari " +
//                     pet.name +
//                     "\nBuka https://www.adopsiku.site/ untuk melihat detailnya" +
//                     ".\n",
//                 };
//                 transporter.sendMail(mailOptions, (error, info) => {
//                   if (error) {
//                     return console.log(error.message);
//                   }
//                   console.log("Message sent: %s", info.messageId);
//                 });
//               }
//             }
//           }
//         }
//       });
//     });
// }
