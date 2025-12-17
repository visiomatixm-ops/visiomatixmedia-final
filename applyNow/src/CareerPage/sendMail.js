import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ganvirtine@gmail.com",
        pass: "sgdx qnnh bkfd mwmt ",
      },
      tls: {
        rejectUnauthorized: false,
      },

    });

    await transporter.sendMail({
      from: "Visiomatix Careers <ganvirtine@gmail.com>",
      to: "ganvirtine@gmail.com",
      subject: "New Application Submitted",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      replyTo: email,
    });

    res.json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
