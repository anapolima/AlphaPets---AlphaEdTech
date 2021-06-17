/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});

transporter.verify((err, success) => 
{
    err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) 
{
    const data = req.body;
    const destinatary = data.email;
    const code = data.code;

    const mailOptions = {
        from: process.env.EMAIL,
        to: destinatary,
        subject: "AlphaPets - Recuperação de senha",
        text: `
        Utilize o código abaixo para recuperar a sua senha
        ${code}
        Este código expira em 30min.`,
    };

    transporter.sendMail(mailOptions, function (err) 
    {
        if (err) 
        {
            res.json({
                status: "fail",
            });
        }
        else 
        {
            console.log("== Message Sent ==");
            res.json({
                status: "success",
            });
        }
    });
});

const port = 8989;
app.listen(port, () => 
{
    console.log(`Server is running on port: ${port}`);
});
