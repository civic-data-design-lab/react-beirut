const { MessagingResponse } = require('twilio').twiml;
const { StatusCodes } = require('http-status-codes');
import { getStickerData } from '../../../lib/apiUtils';

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      console.log(req.body);
      const code = req.body.Body;

      const { stickerData, message } = await getStickerData(code);
      if (!stickerData) {
        res.status(StatusCodes.NOT_FOUND).send({ message });
        return;
      }

      const twiMLResponse = new MessagingResponse().message();
      twiMLResponse.body(stickerData.body);
      twiMLResponse.media(stickerData.imageSrc);

      res.setHeader('Content-Type', 'text/xml');
      res.send(twiMLResponse.toString());
      return;
    default:
      res.setHeader('Allow', ['POST']);
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
  }
};
