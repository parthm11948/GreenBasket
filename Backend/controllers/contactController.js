import ContactMessage from "../models/contactmessage.js";
import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1️⃣ SAVE TO DATABASE
    const newMessage = new ContactMessage({
      name,
      email,
      message,
    });

    await newMessage.save();

    // 2️⃣ SEND EMAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: "captainphillip7794@gmail.com",
      subject: "New Contact Message",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.status(201).json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Message send failed" });
  }
};
