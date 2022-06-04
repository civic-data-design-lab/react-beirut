const { MessagingResponse } = require('twilio').twiml;
const { StatusCodes } = require('http-status-codes');
import { getStickerData } from '../../../lib/apiUtils';

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      console.debug(req.body);
      const code = req.body.Body;

      // INFO: Get sticker data using code or return error if getting sticker data fails.
      const { stickerData, message } = await getStickerData(code);
      if (!stickerData) {
        res.status(StatusCodes.NOT_FOUND).send({ message });
        return;
      }

      // INFO: Create and return a response using the sticker data
      const twiMLResponse = new MessagingResponse().message();
      twiMLResponse.body(stickerData.body);
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
