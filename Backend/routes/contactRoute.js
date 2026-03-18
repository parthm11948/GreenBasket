import express from "express";
import nodemailer from "nodemailer";
import ContactMessage from "../models/contactmessage.js"; // Import your model

const router = express.Router();

router.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1. SAVE TO MONGO DB
    // This is the step that makes data appear in your MongoDB Compass/Atlas
    const savedMessage = await ContactMessage.create({
      name,
      email,
      message,
    });

    // 2. CONFIGURE EMAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. SEND EMAIL
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "captainphillip7794@gmail.com",
      subject: "New Contact Message",
      replyTo: email,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    // 4. RESPOND TO FRONTEND
    res.status(201).json({ 
      success: true, 
      message: "Message saved and email sent!",
      data: savedMessage 
    });

  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error" 
    });
  }
});

export default router;