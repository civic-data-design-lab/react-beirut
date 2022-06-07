import {getImageMeta} from "../../../lib/apiUtils";
import { StatusCodes } from 'http-status-codes';

export default async (req, res) => {
  const { id } = req.query;

  const metadata = await getImageMeta(id);




  if (!metadata) {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'Metadata not found' });
    return;
  }

  res.send({
    message: 'Succesfully retrieved metadata',
    response: metadata,
  });
};
