const Image = require('../../../models/Image');

export default async (req, res) => {
  const allImages = await Image.find({}).lean();
  const cleanedImages = allImages.map(image => ({...image, src: `http://localhost:3000/api/images/${image.img_id}`}));
  res.send({ message: 'Images', response: cleanedImages });
};
