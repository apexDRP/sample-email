const express = require('express');
const nodeMailer = require('nodemailer');
const router = express.Router();

//send an email to user
router.post('/train', (req, res) => {

    //initializes the senders mail options
    const sender = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'senders email',
            pass: 'senders password'
        }
    });

    //initializes the receivers mail options
    const receiver = {
        from: 'senders email',
        to: req.body.email,
        subject: 'subject',
        text: `Destination: ${req.body.destination}\nDate: ${req.body.date}\nNo of Tickets: ${req.body.noOfTickets}\nAmount: ${req.body.amount}`
    }

    //send the email and handle errors occur during process
    sender.sendMail(receiver, (error, info) => {
       if(error) {
           console.log(error);
       } else {
           console.log('Email sent: ' + info.response);
           res.status(200).send(info.response);
       }
    });
});

//export the router to use in index.js
module.exports = router;