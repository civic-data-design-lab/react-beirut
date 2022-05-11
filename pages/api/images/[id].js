import dbConnect from '../../../lib/dbConnect';
import ImageMeta from '../../../models/ImageMeta';
import ImageData from '../../../models/ImageData';
import { isImage } from '../../../lib/utils';

const decodeIcons = (bookmarks) => {
  return bookmarks.map((bookmark) => {
    const decodedIcon = bookmark.customIcon
      ? bookmark.customIcon.toString()
      : null;
    bookmark.customIcon = decodedIcon;
    return bookmark;
  });
};

export default async (req, res) => {
  await dbConnect();

  const { id } = req.query;
  console.log(id);
  if (isImage(id)) {
    // Return the actual image data
    const filename = id;
    const response = await ImageData.findOne({
      filename,
    });

    if (!response) {
      res.status(404).send({ message: 'Image not found' });
      return;
    }

    // Send the image
    // res.setHeader('Content-Type', response.contentType);
    res.setHeader('Content-Type', 'image/jpg');
    res.send(response.data);
    return;
  }

  // Otherwise return the image metadata
  // The ID provided is the image id
  const img_id = id;
  const response = await ImageMeta.findOne({ img_id });

  if (!response) {
    res.status(404).send({ message: 'Image metadata not found' });
    return;
  }

  res.send(response);
};
