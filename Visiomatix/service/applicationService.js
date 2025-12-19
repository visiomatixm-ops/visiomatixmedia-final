import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import multer from "multer";

import nodemailer from "nodemailer";

import db from "./db.js";

dotenv.config();


const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));



// 📁 Configure multer storage

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    const uniqueSuffix = Date.now() + "-" + file.originalname;

    cb(null, uniqueSuffix);

  },

});



const upload = multer({ storage });



// 📩 API endpoint for application

app.post("/api/apply", upload.single("resume"), async (req, res) => {

  const { firstname, lastname, dob, gender, position, email } = req.body;

  const resume = req.file ? req.file.filename : null;



  // ✅ Save in Database

  const sql = `

    INSERT INTO applications (firstname, lastname, dob, gender, position, email, resume)

    VALUES (?, ?, ?, ?, ?, ?, ?)

  `;

  db.query(sql, [firstname, lastname, dob, gender, position, email, resume], async (err) => {

    if (err) {

      console.error("❌ Database Error:", err);

      return res.status(500).json({ success: false, message: "Database Error" });

    }



    try {

      // ✅ Nodemailer setup

      const transporter = nodemailer.createTransport({

        service: "gmail",

        auth: {

          user: process.env.COMPANY_EMAIL,

          pass: process.env.COMPANY_PASS,

        },

      });



      // ✅ Company Email content

      const companyEmailContent = `

        <h2>New Internship Application Received</h2>

        <p><strong>First Name:</strong> ${firstname}</p>

        <p><strong>Last Name:</strong> ${lastname}</p>

        <p><strong>Date of Birth:</strong> ${dob}</p>

        <p><strong>Gender:</strong> ${gender}</p>

        <p><strong>Position Applied For:</strong> ${position}</p>

        <p><strong>Email:</strong> ${email}</p>

        <hr />

        <p>This message was automatically generated from the internship application form.</p>

      `;



      // ✅ Send email to company/office with resume attachment

      await transporter.sendMail({

        from: process.env.COMPANY_EMAIL,

        to: `${process.env.OFFICE_EMAIL}, ${process.env.COMPANY_EMAIL}`,

        subject: `New Internship Application from ${firstname} ${lastname}`,

        html: companyEmailContent,

        attachments: req.file

          ? [

              {

                filename: req.file.originalname,

                path: req.file.path,

              },

            ]

          : [],

      });



      console.log("✅ Email sent to company successfully!");



      // ✅ Send confirmation email to candidate

      const candidateMailContent = `

        <h2>Thank You for Applying!</h2>

        <p>Dear ${firstname},</p>

        <p>Thank you for applying for the <strong>${position}</strong> position at <strong>Visiomatrix Media Pvt. Ltd.</strong>.</p>

        <p>We’ve successfully received your application and our HR team will review it soon. If shortlisted, you will be contacted for further steps.</p>

        <br />

        <p>Warm regards,<br/>

        <strong>Visiomatrix Media Pvt. Ltd.</strong><br/>

        📩 ${process.env.COMPANY_EMAIL}</p>

        <hr />

        <p><small>This is an automated message. Please do not reply.</small></p>

      `;



      await transporter.sendMail({

        from: process.env.COMPANY_EMAIL,

        to: email, // candidate email

        subject: "Your Internship Application Has Been Received",

        html: candidateMailContent,

      });



      console.log("✅ Confirmation email sent to candidate!");



      res.json({ success: true, message: "Application submitted successfully!" });

    } catch (error) {

      console.error("❌ Email Error:", error);

      res.status(500).json({ success: false, message: "Email sending failed" });

    }

  });

});



app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));