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
  craft_type: [String],
  keywords: [String],
  is_series: Boolean,
  series_idx: Number,
  location: { lat: Number, lng: Number },
  address: {
    content: String, 
    content_orig: String, 
    content_orig_lang: String, 
    content_ar: String, 
  },
  sector: String,
  year_taken: mongoose.Schema.Types.Mixed,
  historic_map: String,
  caption: String,
  src: String,
});

module.exports = mongoose.models.ImageMeta || mongoose.model('ImageMeta', ImageMetaSchema);
