const mongoose = require('mongoose');
const { Workshop } = require('./Types');

/**
 * Mongoose schema defining the Workshop model.
 *
 * @type {Workshop}
 */
const WorkshopSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  ID_craftspeople: String,
  shop_name: {
    content: String, // From `shop_name_en_translate`
    content_orig: String, // From `shop_name`
    content_orig_lang: String, // From `shop_name_lang`
    content_ar: String, // From `shop_name` if `shop_name_lang` is `ar`
  },
  shop_owner_name: String,
  // year_established: Number, // Not sure how to add this
  craft_discipline_category: [String],
  craft_discipline: [String],
  craft_discipline_other: String,
  location: {
    geo: { lat: Number, lng: Number },
    address: {
      content: String, // From `shop_address`
      content_orig: String,
      content_orig_lang: String,
      content_ar: String,
    },
    adm1: String,
    adm2: String,
    adm3: String,
    adm4: String,
  },
  shop_status: String,
  produced_here: Boolean,
  data_collection_comments: String,
  survey_origin: String,
  thumb_img_id: String,
  images: [String],
});

module.exports =
  mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema);
