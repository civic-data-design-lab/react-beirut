import { getAllWorkshops } from './utils';

export default async (req, res) => {
  const workshops = await getAllWorkshops();
  res.send({
    message: 'Succesfully retrieved all workshops',
    response: workshops,
  });
};
