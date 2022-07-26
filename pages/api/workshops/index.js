import { getAllWorkshops, saveNewWorkshop } from '../../../lib/apiUtils';
import { StatusCodes } from 'http-status-codes';



export default async (req, res) => {
  console.log('made it to the workshop api at least')
  switch (req.method) {
    case 'GET':
      const workshops = await getAllWorkshops();
      res.send({
        message: 'Succesfully retrieved all workshops',
        response: workshops,

      });
      break;
    case 'POST':
      const body = req.body;
      console.log('Here is the post request. Be sure to check out body:', req);

      if (!body) {
        res.status(StatusCodes.BAD_REQUEST).send({
          message: 'No body provided',
        });
      }

      const result = await saveNewWorkshop(body);
      console.log('finished calling SaveNewWorkshop which returned ', result)
      // Handle the case where the workshop was not saved.
      if (!result?.workshop) {
        res.status(StatusCodes.BAD_REQUEST).send({
          message:
            'Failed to save new workshop. Make sure you filled out the required fields!',
        });
        return;
      }
      res.send({
        message: 'Succesfully added new workshop and associated image metadata',
        response: result,
      });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}



