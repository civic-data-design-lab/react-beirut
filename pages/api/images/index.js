const ImageMeta = require('../../../models/ImageMeta');

export default async (req, res) => {
  const allImages = await ImageMeta.find({}).lean();
  res.send({ message: 'Image Metadata', response: allImages });
};
