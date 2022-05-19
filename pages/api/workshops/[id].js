import { getWorkshop } from '../../../lib/apiUtils';
import { StatusCodes } from 'http-status-codes';

export default async (req, res) => {
  const { id } = req.query;

  const workshop = await getWorkshop(id);

  if (!workshop) {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'Workshop not found' });
    return;
  }

  res.send({
    message: 'Succesfully retrieved workshop',
    response: workshop,
  });
};
