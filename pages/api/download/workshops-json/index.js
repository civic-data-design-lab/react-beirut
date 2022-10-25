import { getAllWorkshops } from '../../../../lib/apiUtils';
import { StatusCodes } from 'http-status-codes';



export default async (req, res) => {

  switch (req.method) {
    case 'GET':
      const workshops = await getAllWorkshops();
      workshops.forEach((obj) => {
        delete obj._id
        delete obj.shop_owner_name
        delete obj.survey_origin
        delete obj.thumb_img_id
        delete obj.__v
        delete obj.year_established
      });
      res.send(workshops);
      break;
    default:
      res.setHeader('Allow', ['GET']);
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