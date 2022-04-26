import dbConnect from '../../../lib/dbConnect';
import favicon from '../../../public/favicon.ico';
import Image from '../../../models/Image';

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

  const { img_id } = req.query;
  console.log("image id:", img_id);
  const response = await Image.findOne({ img_id });

  if (!response) {
    res.status(404).send({ message: 'Image not found' });
    return;
  }


  // response.src.
  // console.log(response);
  res.setHeader('Content-Type', 'image/jpg');
  console.log(response.src.toString().substring(0, 100));
  res.send(response.src);
};
