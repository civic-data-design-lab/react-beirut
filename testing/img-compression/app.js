const getImageCompressions = require('./getImageCompressions');
const { imageBuffer: testImageBuffer } = require('./imageBuffer');

const main = async () => {
  let { imageBufferOriginal, imageBuffer, imageBufferThumbnail } =
    await getImageCompressions(testImageBuffer, (saveFiles = true));

  // console.log({ imageBufferOriginal, imageBuffer, imageBufferThumbnail });
};

if (require.main == module) main();
