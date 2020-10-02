const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express()


const smtp_login = process.env.SMTP_LOGIN || '';
const smtp_password = process.env.SMTP_PASSWORD || '';

// app.use(cors())

// app.use(cors({credentials: true, origin: true}))
// app.use(cors({origin: '*', optionsSuccessStatus: 200,}));
// app.options('*', cors())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
//     next();
// });

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())

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

//app.post('/sendMessage', cors(), async function (req, res) {
app.post('/sendMessage', async function (req, res) {

    const {name, email, message} = req.body;

    let info = await transporter.sendMail({
        from: 'My portfolio', // sender address
        to: smtp_login, // list of receivers
        subject: "Job Recruiting", // Subject line
        html: `<h2><b>Message from portfolio contacts page</b></h2>
        <div><b>Name:</b> ${name}</div>
        <div><b>Email:</b> ${email}</div>
        <div><b>Message:</b> ${message}</div>`, // html body
    });


    res.send('Message was sent!')
})

const port = process.env.PORT || 3010;
// const port = 3010
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
