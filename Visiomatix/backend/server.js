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

// 📩 API endpoint for job application
app.post("/api/apply", upload.single("resume"), async (req, res) => {
  const { firstname, lastname, dob, gender, position, email, schools, colleges, experiences } = req.body;
  const resume = req.file ? req.file.filename : null;

  // ✅ Save in Database
  const sql = `
    INSERT INTO applications (firstname, lastname, dob, gender, position, email, resume, schools, colleges, experiences)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [firstname, lastname, dob, gender, position, email, resume, schools, colleges, experiences], async (err) => {
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
        <h2>New Job Application Received</h2>
        <p><strong>First Name:</strong> ${firstname}</p>
        <p><strong>Last Name:</strong> ${lastname}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Position Applied For:</strong> ${position}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p>This message was automatically generated from the job application form.</p>
      `;

      // ✅ Send email to company/office with resume attachment
      await transporter.sendMail({
        from: process.env.COMPANY_EMAIL,
        to: `${process.env.OFFICE_EMAIL}, ${process.env.COMPANY_EMAIL}`,
        subject: `New Job Application from ${firstname} ${lastname}`,
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
        subject: "Your Job Application Has Been Received",
        html: candidateMailContent,
      });

      console.log("✅ Confirmation email sent to candidate!");
    } catch (error) {
      console.error("❌ Email Error:", error);
    }

    res.json({ success: true, message: "Application submitted successfully!" });
  });
});

// 📩 API endpoint for internship application
app.post("/api/apply-internship", upload.single("resume"), async (req, res) => {
  const { position, duration, location, eligibility, email } = req.body;
  const resume = req.file ? req.file.filename : null;

  // ✅ Save in Database
  const sql = `
    INSERT INTO internship_applications (position, duration, location, eligibility, email, resume)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [position, duration, location, eligibility, email, resume], async (err) => {
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
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Eligibility:</strong> ${eligibility}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p>This message was automatically generated from the internship application form.</p>
      `;

      // ✅ Send email to company/office with resume attachment
      await transporter.sendMail({
        from: process.env.COMPANY_EMAIL,
        to: `${process.env.OFFICE_EMAIL}, ${process.env.COMPANY_EMAIL}`,
        subject: `New Internship Application for ${position}`,
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
        <p>Dear Applicant,</p>
        <p>Thank you for applying for the <strong>${position}</strong> internship position at <strong>Visiomatrix Media Pvt. Ltd.</strong>.</p>
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
    } catch (error) {
      console.error("❌ Email Error:", error);
    }

    res.json({ success: true, message: "Internship application submitted successfully!" });
  });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
