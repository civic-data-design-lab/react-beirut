// Import dependencies
const sharp = require('sharp');

const compressImage = async (input) => {
  const image = await sharp(input).resize({
    width: 1080,
    height: 1080,
    fit: sharp.fit.inside,
    withoutEnlargement: true,
  });
  return image.jpeg().toBuffer();
};

const compressImageToThumbnail = async (input) => {
  const image = await sharp(input).resize({
    width: 512,
    height: 512,
    fit: sharp.fit.inside,
    withoutEnlargement: true,
  });
  return image.jpeg().toBuffer();
};

const getImageCompressions = async (input, saveFiles=false, nameForSave='image') => {
  // Get all versions of the image
  const imageBufferOriginal = input;
  const imageBuffer = await compressImage(imageBufferOriginal);
  const imageBufferThumbnail = await compressImageToThumbnail(
    imageBufferOriginal
  );


  // Save all newly compressed images
  if (saveFiles) {
    sharp(imageBufferOriginal).toFile(
      `${__dirname}/img-output/${nameForSave}_original.jpg`
    );
    sharp(imageBuffer).toFile(`${__dirname}/img-output/${nameForSave}.jpg`);
    sharp(imageBufferThumbnail).toFile(
      `${__dirname}/img-output/${nameForSave}_thumbnail.jpg`
    );
  }

  // Return
  return { imageBuffer, imageBufferThumbnail };
};

const main = async () => {
  let { imageBuffer, imageBufferThumbnail } =
    await getImageCompressions(testImageBuffer);

  console.log({ imageBuffer, imageBufferThumbnail });
};

if (require.main == module) main();

module.exports = getImageCompressions