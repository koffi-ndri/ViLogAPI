const nodemailer = require('nodemailer');
const { vilogDetails } = require('../config/keys');

const transporter = nodemailer.createTransport({
    host: vilogDetails.host,
    port: 465,
    secure: true,
    auth: {
        user: vilogDetails.email,
        pass: vilogDetails.password
    }
});

module.exports.MailService = {
    async notifyHostOfVisit(receiver, visitor){
        try{
            await transporter.sendMail({
                from: vilogDetails.email,
                to: receiver.email,
                subject: vilogDetails.subject,
                text: `Hello ${receiver.firstname}. Your visitor ${visitor.firstName} ${visitor.lastName} is waiting for you.`
            });
        }catch(error){
            console.log("Email not sent: " + error);
        }
    }
}