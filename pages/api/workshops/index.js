import { getAllWorkshops } from '../../../lib/apiUtils';

export default async (req, res) => {
  const workshops = await getAllWorkshops();
  res.send({
    message: 'Succesfully retrieved all workshops',
    response: workshops,
  });
};
