const mongoose = require('mongoose');
const { Sticker } = require('./Types');

/**
 * Mongoose schema defining the Sticker model.
 *
 * @type {Sticker}
 */
const StickerSchema = new mongoose.Schema({
  code: String,
  response_id: String,
  content: String,
});

module.exports =
  mongoose.models.Sticker || mongoose.model('Sticker', StickerSchema);
