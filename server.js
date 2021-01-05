const path = require("path");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const dirPath = path.join(__dirname, "build");
app.use(express.json());
app.use(express.static(dirPath));

const oAuth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_uri
);

oAuth2Client.setCredentials({ refresh_token: process.env.refresh_token });

app.post("/contact", (req, res) => {
  const message = {
    from: req.body.email,
    to: process.env.email,
    subject: req.body.message,
    html: `
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Message: ${req.body.message}</li>
      </ul>
      `,
  };

  // Get Access Token
  const accessToken = oAuth2Client.getAccessToken();

  // Account to send from
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAuth2",
      user: process.env.email,
      clientId: process.env.client_id,
      clientSecret: process.env.client_secret,
      refreshToken: process.env.refresh_token,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail(message, function (err, info) {
    if (err) {
      res.status(500).send({
        success: false,
      });
    } else {
      res.send({
        success: true,
      });
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
