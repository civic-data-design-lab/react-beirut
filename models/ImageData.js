const mongoose = require('mongoose');
const { ImageData } = require('./Types');

/**
 * Mongoose schema defining the ImageMeta model.
 * 
 * @type {ImageData}
 */
const ImageDataSchema = new mongoose.Schema({
  img_id: String,
  filename: String,
  data: Buffer,
});

module.exports = mongoose.models.ImageData || mongoose.model('ImageData', ImageDataSchema);
