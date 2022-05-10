const mongoose = require('mongoose');
const { Workshop } = require('./Types');

/**
 * Mongoose schema defining the Workshop model.
 * 
 * @type {Workshop}
 */
const WorkshopSchema = new mongoose.Schema({
  ID: String,
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
  shop_address: String,
  location: { lat: Number, lng: Number },
  shop_adm4: String,
  shop_adm3: String,
  shop_adm2: String,
  shop_adm1: String,
  shop_status: String,
  produced_here: Boolean,
  data_collection_comments: String,
  survey_origin: String,
  thumb_img_id: String,
  images: [String],
});

module.exports =
  mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema);