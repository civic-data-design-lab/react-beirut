import dbConnect from '../../../lib/dbConnect';
import ImageDataThumbnail from '../../../models/ImageDataThumbnail';
import { isImage } from '../../../lib/utils';
import { getImageMeta } from '../../../lib/apiUtils';
import { StatusCodes } from 'http-status-codes';
const mime = require('mime');

export default async (req, res) => {
  const { id } = req.query;

  // INFO: Handle actual image data queries (ID ends with image extension)
  if (isImage(id)) {
    await dbConnect();

    // INFO: Get the actual image data from the database
    let [filename, fileExtension] = id.split('.')
    if (fileExtension == 'jpg') fileExtension = 'jpeg';
    const response = await ImageDataThumbnail.findOne({
      filename: filename + '.' + fileExtension,
    });

    if (!response) {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Image not found' });
      return;
    }

    // INFO: Send the image
    res.setHeader('Content-Type', mime.getType(id));
    res.send(response.data);
    return;
  }

  // INFO: Otherwise return the image metadata
  const response = await getImageMeta(id);
  res.send(response);
};
