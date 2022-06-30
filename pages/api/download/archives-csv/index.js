import { getAllArchives } from '../../../../lib/apiUtils';
import { StatusCodes } from 'http-status-codes';



export default async (req, res) => {
  
  switch (req.method) {
    case 'GET':
      const archives = await getAllArchives();
      const { Parser } = require('json2csv');

      // TODO ADD MORE FIELDS
      const fields = ['ID', 'craft_discipline_category', 'craft_discipline',
        'craft_discipline_other', 'reference', 'primary_year', 'primary_decade',
        'primary_location', 'images'];
      const opts = { fields };

      try {
        const parser = new Parser(opts);
        const csv = parser.parse(archives);
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