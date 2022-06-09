const mongoose = require('mongoose');
const { Sticker } = require('./Types');

/**
 * Mongoose schema defining the Sticker model.
 *
 * @type {Sticker}
 */


const StickerSchema = new mongoose.Schema({
  code: String,
  img_id: String,
  caption_EN: String,
  caption_AR: String,
});

module.exports =
  mongoose.models.Sticker || mongoose.model('Sticker', StickerSchema);
