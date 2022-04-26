const mongoose = require('mongoose');
const { ArchiveObject } = require('./Types');

/**
 * Mongoose schema defining the ArchiveObject model.
 * 
 * @type {ArchiveObject}
 */
const ArchiveSchema = new mongoose.Schema({
  ID: String,
  info_type: String,
  is_series: Boolean,
  shop_name: {
    content: String,
    content_orig: String,
    content_orig_lang: String,
    content_ar: String,
  },
  owner_name: {
    content: String,
    content_orig: String,
    content_orig_lang: String,
    content_ar: String,
  },
  craft_discipline: [String],
  reference: {
    // From the `ref_`-prefixed fields
    name: String,
    type: String,
    type_other: String,
    location: String,
    catalog: String,
    link: String,
    keywords: String,
    citation: String,
    year: String,
    copyright: String,
    scan: String,
  },
  primary_year: mongoose.Schema.Types.Mixed,
  primary_location: { lat: Number, lng: Number },
  primary_address: {
    content: String,
    content_orig: String,
    content_orig_lang: String,
    content_ar: String,
  },
  primary_historic_map: String,
  thumb_img_id: String,
  images: [String],
});

module.exports =
  mongoose.models.Archive || mongoose.model('Archive', ArchiveSchema);
