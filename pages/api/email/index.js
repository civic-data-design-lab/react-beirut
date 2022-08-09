import {StatusCodes} from "http-status-codes";

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


export default async (req, res) => {

    switch (req.method) {
        case 'POST':
            const body = req.body
            const msg = {
                to: 'livingheritage@mit.edu', // Change to your recipient
                from: 'livingheritage@mit.edu', // Change to your verified sender
                subject: `New ${body.contribution} Submission`,
                text: `A new submission has been made from the ${body.contribution} form! The submission ID is ${body.id}.`,
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })


            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res
                .status(StatusCodes.METHOD_NOT_ALLOWED)
                .end(`Method ${req.method} Not Allowed`);
    }


}