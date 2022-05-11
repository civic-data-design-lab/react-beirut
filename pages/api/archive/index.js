import { getAllArchives } from '../../../lib/apiUtils';

export default async (req, res) => {
  const archiveObjs = await getAllArchives();
  res.send({
    message: 'Succesfully retrieved all archive information',
    response: archiveObjs,
  });
};
