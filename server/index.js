import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/user/userRouter.js";
import petOfferRouter from "./routes/pet/petOfferRouter.js";
import adoptionRouter from "./routes/adoption/adoptionRoutes.js";
import reportRouter from "./routes/report/reportRoutes.js";
import conversationRouter from "./routes/conversation/conversationRouter.js";
import homeRoter from "./routes/home/homeRouter.js";
import { cancelAdoption, sendReportReminder } from "./cron/cron.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/petOffers", petOfferRouter);
app.use("/adoptions", adoptionRouter);
app.use("/reports", reportRouter);
app.use("/conversations", conversationRouter);
app.use("/homeinfo", homeRoter);

app.get("/", (req, res) => {
  res.send("Welcome to adopsiku API");
});

const PORT = process.env.PORT || 5000;
cancelAdoption.start();
sendReportReminder.start();

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
