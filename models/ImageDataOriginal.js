const mongoose = require('mongoose');
const { ImageDataOriginal } = require('./Types');

/**
 * Mongoose schema defining the ImageMeta model.
 * 
 * @type {ImageData}
 */
const ImageDataOriginalSchema = new mongoose.Schema({
  img_id: String,
  from_survey: String,
  filename: String,
  data: Buffer,
});

module.exports = mongoose.models.ImageDataOriginal || mongoose.model('ImageDataOriginal', ImageDataOriginalSchema);
