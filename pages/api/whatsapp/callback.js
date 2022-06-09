const { StatusCodes } = require('http-status-codes');

/*
Webhook to this URL with delivery status updates for messages sent using the API
*/

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      // console.group('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ TWILIO STATUS CALLBACK ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯');
      // console.debug(req.body);
      // console.groupEnd();

    default:
      res.setHeader('Allow', ['POST']);
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
  }
};
