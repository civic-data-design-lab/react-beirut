import { getAllWorkshops } from '../../../../lib/apiUtils';
import { StatusCodes } from 'http-status-codes';



export default async (req, res) => {
  
  switch (req.method) {
    case 'GET':
      const workshops = await getAllWorkshops();
      const { Parser } = require('json2csv');

      const fields = ['ID', 'ID_craftspeople', 'decade_established', 'craft_discipline_category',
        'craft_discipline', 'craft_discipline_other', 'location', 'shop_status', 'produced_here',
        'images'];
      const opts = { fields };

      try {
        const parser = new Parser(opts);
        const csv = parser.parse(workshops);
        res.send(csv);
      } catch (err) {
        console.error(err);
        // TODO SEND AN INTERNAL ERROR result
        // res.send({
        //   message: 'Succesfully retrieved all workshops',
        //   response: csv,
      }

      // });
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