const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// GET API
app.get("/", (req, res) => {
  res.send("Contact API is working");
});

// POST API
app.post("/contact", async (req, res) => {
  const { name, email, mobile, message } = req.body;

  if (!name || !email || !mobile || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Nodemailer config
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rakhundeakshay29@gmail.com",
      pass: "gnne hcxf vlsb dghe", // Use an App Password if 2FA is enabled
    },
  });

  try {
    await transporter.sendMail({
      from: "<rakhundeakshay29@gmail.com>",
      to: email,
      subject: "Thank you for reaching out to Akshay",
      text: `Dear ${name}, \n\nYour message has been received to Akshay. He will get back to you soon \n\nDetails you shared: \nName - ${name} \nMobile - ${mobile} \nEmail - ${email} \nMessage - ${message} \n\nThanks again, \nAkshay.
      `,
    });

    res.status(200).json({ success: "Message sent successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
