const { MessagingResponse } = require('twilio').twiml;
const { StatusCodes } = require('http-status-codes');
import { twiml } from 'twilio';
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
  sendMessage(req, res, `This is a test message from /api/whatsapp.`);
};

const sendMessage = (req, res, body, media) => {
  const twiMLResponse = new MessagingResponse().message();
  twiMLResponse.body(body);
  if (media != undefined) {
    twiMLResponse.media(media);
  }
  res.setHeader('Content-Type', 'text/xml').send(twiMLResponse.toString());
};

const HOST_URL = 'https://cddl-beirut.herokuapp.com';

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await dbConnect();
      console.debug(
        '\n\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\nTWILIO WEBHOOK LOGS\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯'
      );
      // console.debug(req.body);
      console.debug('Received Message:', req.body);
      const code = req.body.Body;

      // Send test message if body of text is "test"
      if (code == 'test') {
        sendTestMessage(req, res);
        return;
      }

      // INFO: Get and validate the code
      // const [sticker_id, language] = [
      //   code.slice(0, 2),
      //   code.slice(2, 4).toLowerCase(),
      // ];
      const split_code = code.match(/[a-zA-Z]+|[0-9]+/g)
      const sticker_id = split_code[0].length == 1 ? '0' + split_code[0] : split_code[0];
      const language = split_code[1] ? split_code[1].toLowerCase() : undefined;

      console.log(sticker_id);
      
      if (isNaN(sticker_id) || split_code.length > 2 || language == undefined) {
        sendMessage(
          req,
          res,
          'The code you entered was invalid. Please enter a code with digits and a two letter language code. Ex: 01EN for English or 01AR for Arabic.'
        );
        return;
      }

      const { stickerData, message } = await getStickerData(sticker_id + language);

      // INFO: Get sticker data using code or return error if getting sticker data fails.
      if (!stickerData) {
        sendMessage(req, res, message);
        return;
      }

      // INFO: Get image source from imageMeta (cannot grab file directly because unsure of file extension, ie: jpg, png, etc.)
      const imageMeta = (
        await fetch(`${HOST_URL}/api/images/${stickerData.img_id}`).then(
          (result) => result.json()
        )
      )[0];
      // Change during deployment. Only using localhost because Heroku is not up to date.
      const temp = imageMeta.src.split('/');
      const img_src = `${HOST_URL}/api/images/${temp[temp.length - 1]}`;

      let body;
      if (language == 'en' || language == 'english') {
        body = stickerData.caption_EN;
      } else if (language == 'ar' || language == 'arabic') {
        body = stickerData.caption_AR;
      } else {
        sendMessage(
          req,
          res,
          `Language code invalid: only English (EN) and Arabic (AR) are accepted. Please enter either ${sticker_id}EN or ${sticker_id}AR.`
        );
        return;
      }
      sendMessage(req, res, body, img_src);
      return;

    //?? If method was not 'POST', the acceptable methods allowed by this resource to post and returns an error.
    default:
      res.setHeader('Allow', ['POST']);
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
  }
};
