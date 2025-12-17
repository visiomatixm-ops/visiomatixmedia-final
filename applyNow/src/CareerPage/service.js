import express from "express";
import cors from "cors";
import { sendMail } from "./sendMail.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sendMail", sendMail);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
