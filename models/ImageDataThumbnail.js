const mongoose = require('mongoose');
const { ImageDataThumbnail } = require('./Types');

/**
 * Mongoose schema defining the ImageMeta model.
 * 
 * @type {ImageDataThumbnail}
 */
const ImageDataThumbnailSchema = new mongoose.Schema({
  img_id: String,
  from_survey: String,
  filename: String,
  data: Buffer,
});

module.exports = mongoose.models.ImageDataThumbnail || mongoose.model('ImageDataThumbnail', ImageDataThumbnailSchema);
