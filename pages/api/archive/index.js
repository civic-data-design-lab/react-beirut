import { StatusCodes } from 'http-status-codes';
import { getAllArchives, saveNewArchive } from '../../../lib/apiUtils';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      const archiveObjs = await getAllArchives();
      res.send({
        message: 'Succesfully retrieved all archive information',
        response: archiveObjs,
      });
      console.log(archiveObjs);
      break;
    case 'POST':
      const body = req.body;
      if (!body) {
        res.status(StatusCodes.BAD_REQUEST).send({
          message: 'No body provided',
        });
      }

      const result = await saveNewArchive(body);

      // Handle the case where the archive was not saved successfully.
      if (!result?.archive) {
        res.status(StatusCodes.BAD_REQUEST).send({
          message:
            'Failed to save new archive information. Make sure you filled out the required fields!',
        });
        return;
      }

      res.send({
        message: 'Succesfully added new archive information',
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
