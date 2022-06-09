// Import dependencies
const sharp = require('sharp');
const { imageBuffer } = require('./imageBuffer');

// console.log(imageBuffer);

let image;

// (async function () {
//   // image = await sharp(`${__dirname}/InputImage.jpeg`)
//   image = await sharp(imageBuffer)
//     .resize(100, 100)
//     .toFile(`${__dirname}/OutputImage.jpeg`);
//   console.log(image);
// })();

image = sharp(imageBuffer)
  .resize({
    width: 200,
    height: 200,
    fit: 'contain',
    background: {r: 0, g: 0, b: 0, alpha: 0}
  })
  .toFile(`${__dirname}/img-output/OutputImage.jpeg`);
console.log(image);
