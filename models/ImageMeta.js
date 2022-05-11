const mongoose = require('mongoose');
const { ImageMeta } = require('./Types');

/**
 * Mongoose schema defining the ImageMeta model.
 * 
 * @type {ImageMeta}
 */
const ImageMetaSchema = new mongoose.Schema({
  img_id: String,
  response_id: String,
  from_survey: String,
  is_thumbnail: Boolean,
  type: [String],
  keywords: [String],
  is_series: Boolean,
  series_idx: Number,
  location: { lat: Number, lng: Number },
  year_taken: mongoose.Schema.Types.Mixed,
  src: String,
});

module.exports = mongoose.models.ImageMeta || mongoose.model('ImageMeta', ImageMetaSchema);
