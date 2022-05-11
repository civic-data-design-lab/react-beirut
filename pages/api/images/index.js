const ImageMeta = require('../../../models/ImageMeta');

export default async (req, res) => {
  const allImages = await ImageMeta.find({}).lean();
  const cleanedImages = allImages.map(image => ({...image, src: `http://localhost:3000/api/images/${image.img_id}.jpg`}));
  res.send({ message: 'Image Metadata', response: cleanedImages });
};
