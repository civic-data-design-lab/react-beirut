import { getAllArchives } from '../../../../lib/apiUtils';
import { StatusCodes } from 'http-status-codes';



export default async (req, res) => {
  console.log('hit download archives-json');
  switch (req.method) {
    case 'GET':
      const archives = await getAllArchives();
      archives.forEach((obj) => {
        delete obj.shop_name
        delete obj._id
        delete obj.owner_name
        delete obj.info_type
        delete obj.is_series
        delete obj.is_duplicate_of
        delete obj.primary_historic_map
        delete obj.thumb_img_id
        delete obj.__v
      });
      console.log(archives)
      res.send(archives);
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