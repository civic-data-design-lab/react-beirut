const mongoose = require('mongoose');
const { ArchiveObject } = require('./Types');

/**
 * Mongoose schema defining the ArchiveObject model.
 *
 * @type {ArchiveObject}
 */
const ArchiveSchema = new mongoose.Schema({
  ID: { type: String, required: true },
  info_type: { type: String, default: 'generic' },
  is_series: { type: Boolean, default: false },
  is_duplicate_of: String,
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
  craft_discipline_category: [String],
  craft_discipline: [String],
  craft_discipline_other: [String],
  reference: {
    // From the `ref_`-prefixed fields
    name: String,
    ref_type: String,
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
  primary_year: Number,
  primary_decade: mongoose.Schema.Types.Mixed,
  primary_location: {
    geo: {
      lat: Number,
      lng: Number,
    },
    address: {
      content: String,
      content_orig: String,
      content_orig_lang: String,
      content_ar: String,
    },
    adm1: String,
    adm2: String,
    adm3: String,
    adm4: String,
  },
  primary_historic_map: String,
  thumb_img_id: String,
  images: [String],
});

module.exports =
  mongoose.models.Archive || mongoose.model('Archive', ArchiveSchema);
