import { getArchive } from '../../../lib/apiUtils';
import { StatusCodes } from 'http-status-codes';

export default async (req, res) => {
  const { id } = req.query;
  const archive = await getArchive(id);

  if (!archive) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: 'Archive response object not found' });
    return;
  }

  res.send({
    message: 'Succesfully retrieved archive response object',
    response: archive,
  });
};
