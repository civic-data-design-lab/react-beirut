import { getArchive } from '../../../lib/apiUtils';

export default async (req, res) => {
  const { id } = req.query;
  const archive = await getArchive(id);

  if (!archive) {
    res.status(404).send({ message: 'Archive response object not found' });
    return;
  }

  res.send({
    message: 'Succesfully retrieved archive response object',
    response: archive,
  });
};
