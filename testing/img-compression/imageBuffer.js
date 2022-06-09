const fs = require('fs');

let imageBuffer = fs.readFileSync(`${__dirname}/img-input/InputImage.jpeg`);
module.exports = {
  imageBuffer,
};
