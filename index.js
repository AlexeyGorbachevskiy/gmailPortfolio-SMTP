const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express()


const smtp_login = process.env.SMTP_LOGIN || '';
const smtp_password = process.env.SMTP_PASSWORD || '';


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())




let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async function (req, res) {


    const {name, email, message} = req.body;

    let info = await transporter.sendMail({
        from: 'My portfolio', // sender address
        to: smtp_login, // list of receivers
        subject: "Job Recruiting", // Subject line
        // text: "Hello, how u doing", // plain text body
        html: `<b>Message from portfolio contacts page</b>
        <div>name: ${name}</div>
        <div>Email: ${email}</div>
        <div>Message: ${message}</div>`, // html body
    });

    res.send('Message was sent!')
})

const port = process.env.PORT || 3010;
// const port = 3010
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
