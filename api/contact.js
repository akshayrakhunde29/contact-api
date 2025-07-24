const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// GET API - Root endpoint
app.get("/", (req, res) => {
  res.send("Contact API is working");
});

// GET API - Health check for /api/contact
app.get("/api/contact", (req, res) => {
  res.json({ message: "Contact API endpoint is ready" });
});

// POST API - Contact form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, mobile, message } = req.body;

  if (!name || !email || !mobile || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Nodemailer config
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rakhundeakshay29@gmail.com",
      pass: "gnne hcxf vlsb dghe", // Better to use env variables
    },
  });

  try {
    await transporter.sendMail({
      from: "<rakhundeakshay29@gmail.com>",
      to: email,
      subject: "Thank you for reaching out to Akshay",
      text: `Dear ${name}, \n\nYour message has been received to Akshay. He will get back to you soon \n\nDetails you shared: \nName - ${name} \nMobile - ${mobile} \nEmail - ${email} \nMessage - ${message} \n\nThanks again, \nAkshay.`,
    });

    res.status(200).json({ success: "Message sent successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Handle all other routes
app.all("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Export the Express app as a serverless function
module.exports = app;