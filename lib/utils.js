const DEFAULT_ID_LENGTH = 9;
const MAPBOX_STYLE_URL =
  'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit';
const ARCHIVE_CONTRIBUTION_NAME = 'archive_contribution';
const WORKSHOP_CONTRIBUTION_NAME = 'workshop_contribution';
const CRAFT_DISCIPLINES = ["Brass", "Ceramics", "Copper", "Embroidery", "Food", "Furniture", "Glass", "Jewelry", "Leather", "Metalwork", "Marquetry", "Sculpture", "Shoemaker", "Soap", "Tailor", "Tapestry", "Upholstry", "Wickerwork", "Woodwork"];

/**
 * Checks if the given string has an image file extension.
 * https://bobbyhadz.com/blog/javascript-check-if-url-is-image
 *
 * @param {string} s - The string to check.
 * @returns {boolean} True if the string has an image file extension.
 */
const isImage = (s) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(s);
};

/**
 * Generates a random numeric string ID of the given length.
 *
 * @param {string} length - The length of the ID to generate.
 * @returns {string} The random ID.
 */
const generateId = (length) => {
  if (!length) {
    length = DEFAULT_ID_LENGTH;
  }

  const randString = Math.random()
    .toString()
    .substring(2, length + 2);
  return randString;
};

module.exports = {
  DEFAULT_ID_LENGTH,
  MAPBOX_STYLE_URL,
  ARCHIVE_CONTRIBUTION_NAME,
  WORKSHOP_CONTRIBUTION_NAME,
  CRAFT_DISCIPLINES,
  isImage,
  generateId,
};
