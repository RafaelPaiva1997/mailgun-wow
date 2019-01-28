const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')
const mailgunOptions = require('../config.json').mailgun;
const transport = mailgunTransport(mailgunOptions)
const emailClient = nodemailer.createTransport(transport);

module.exports = {
    sendMail: (from, to, cc, subject, text, html) =>
        new Promise((resolve, reject) =>
            emailClient.sendMail({
                from,
                to,
                cc,
                subject,
                text,
                html
            }, (err, info) => {
                if (err)
                    reject(err);
                else
                    resolve(info);
            })
        )
};