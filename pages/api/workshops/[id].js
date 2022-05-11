import { getWorkshop } from '../../../lib/apiUtils';

export default async (req, res) => {
  const { id } = req.query;

  const workshop = await getWorkshop(id);

  if (!workshop) {
    res.status(404).send({ message: 'Workshop not found' });
    return;
  }

  res.send({
    message: 'Succesfully retrieved workshop',
    response: workshop,
  });
};
