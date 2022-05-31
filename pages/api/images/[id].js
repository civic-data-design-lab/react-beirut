import dbConnect from '../../../lib/dbConnect';
import ImageData from '../../../models/ImageData';
import { isImage } from '../../../lib/utils';
import { getImageMeta } from '../../../lib/apiUtils';
import { StatusCodes } from 'http-status-codes';

export default async (req, res) => {
  const { id } = req.query;

  // Handle actual image data queries (ID ends with image extension)
  if (isImage(id)) {
    await dbConnect();

    // Get the actual image data from the database
    const filename = id;
    const response = await ImageData.findOne({
      filename,
    });

    if (!response) {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Image not found' });
      return;
    }

    // Send the image
    res.setHeader('Content-Type', 'image');
    res.send(response.data);
    return;
  }

  // Otherwise return the image metadata
  const response = await getImageMeta(id);
  res.send(response);
};
