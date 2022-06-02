import { getSimilarWorkshops } from '../../../lib/apiUtils';
import { getWorkshop} from "../../../lib/apiUtils";
import { StatusCodes } from 'http-status-codes';

export default async (req, res) => {
  const { id } = req.query;

  const workshop = await getWorkshop(id);

  const workshops = await getSimilarWorkshops(workshop);



  if (!workshops) {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'Workshops not found' });
    return;
  }

  res.send({
    message: 'Succesfully retrieved workshop',
    response: workshops,
  });
};
