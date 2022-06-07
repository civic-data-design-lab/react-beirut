const { MessagingResponse } = require('twilio').twiml;
const { StatusCodes } = require('http-status-codes');
import { getStickerData } from '../../../lib/apiUtils';
import dbConnect from '../../../lib/dbConnect';

/*
POSTMAN TEST RESPONSE

POST to localhost:3000/api/whatsapp
Body > raw > json
{
  "SmsMessageSid": "SMab6c7b45a9e55af39466ff773ffb626f",
  "NumMedia": "0",
  "ProfileName": "Gatlen Culp",
  "SmsSid": "SMab6c7b45a9e55af39466ff773ffb626f",
  "WaId": "18437540521",
  "SmsStatus": "received",
  "Body": "LHA01",
  "To": "whatsapp:+14155238886",
  "NumSegments": "1",
  "ReferralNumMedia": "0",
  "MessageSid": "SMab6c7b45a9e55af39466ff773ffb626f",
  "AccountSid": "AC932a15a14dc2feb88c584b6c2dd14750",
  "From": "whatsapp:+18437540521",
  "ApiVersion": "2010-04-01"
}
*/

// Responds to POST request with a test twilio message
const sendTestMessage = (req, res) => {
  // Send test message
  const twiMLResponse = new MessagingResponse().message();
  // twiMLResponse.body(`This is a test message from /api/whatsapp.\nYour previous message said: ${req.body.Body}`);
  twiMLResponse.body(`This is a test message from /api/whatsapp.`);
  // twiMLResponse.media('https://demo.twilio.com/owl.png');
  // twiMLResponse.body([...Array(1600)].map(()=>{return 'a'}).join(''));
  res.setHeader('Content-Type', 'text/xml').send(twiMLResponse.toString());
};

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await dbConnect();
      console.debug(
        '\n\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\nTWILIO WEBHOOK LOGS\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯'
      );
      // console.debug(req.body);
      console.debug(req.body);
      const code = req.body.Body;

      // Send test message if body of text is "test"
      if (code == 'test') {
        sendTestMessage(req, res);
        return;
      }

      const twiMLResponse = new MessagingResponse().message();
      const { stickerData, message } = await getStickerData(code);

      // INFO: Get sticker data using code or return error if getting sticker data fails.
      if (!stickerData) {
        twiMLResponse.body(message);
        res
          // .status(StatusCodes.NOT_FOUND)
          .setHeader('Content-Type', 'text/xml')
          .send(twiMLResponse.toString());
        return;
      }

      // INFO: Create and return a response using the sticker data
      twiMLResponse.body(stickerData.body);
      // twiMLResponse.media('https://demo.twilio.com/owl.png');
      // twiMLResponse.media(
      //   'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'
      // );
      console.debug(stickerData.imageSrc);
      twiMLResponse.media(stickerData.imageSrc);
      res.setHeader('Content-Type', 'text/xml');
      res.send(twiMLResponse.toString());
      return;

    //?? If method was not 'POST', the acceptable methods allowed by this resource to post and returns an error.
    default:
      res.setHeader('Allow', ['POST']);
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
  }
};
