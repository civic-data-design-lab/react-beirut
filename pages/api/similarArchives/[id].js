import { getSimilarArchives } from '../../../lib/apiUtils';
import { getArchive } from "../../../lib/apiUtils";
import { StatusCodes } from 'http-status-codes';

export default async (req, res) => {
  const { id } = req.query;

  const archive = await getArchive(id);

  const archives = await getSimilarArchives(archive);



  if (!archives) {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'Archives not found' });
    return;
  }

  res.send({
    message: 'Succesfully retrieved workshop',
    response: archives,
  });
};
