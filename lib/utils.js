/**
 * Generic utilities module.
 *
 * Contains functions and constants that can be used throughout the entire
 * project.
 *
 * Note:
 *      "_"-prefixed functions are not meant to be used outside of this file,
 *      they are simply helper functions.
 * 
 * @module utils
 */

const turfLength = require('@turf/length').default;
const { lineString } = require('@turf/helpers');

const DEFAULT_ID_LENGTH = 10;
const MAPBOX_STYLE_URL =
  'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit';
const ARCHIVE_CONTRIBUTION_NAME = 'archive_contribution';
const WORKSHOP_CONTRIBUTION_NAME = 'workshop_contribution';
const CRAFT_TYPES = [
  'Brass',
  'Ceramics',
  'Copper',
  'Embroidery',
  'Food',
  'Furniture',
  'Glass',
  'Jewelry',
  'Leather',
  'Metalwork',
  'Marquetry',
  'Sculpture',
  'Shoemaker',
  'Soap',
  'Tailor',
  'Tapestry',
  'Upholstry',
  'Wickerwork',
  'Woodwork',
];
const CRAFT_CATEGORIES = [
  'Architectural',
  'Cuisine',
  'Decorative',
  'Fashion',
  'Functional',
  'Furniture',
  'Textiles',
];
const IMAGE_TYPES = [
  { name: 'Storefront', value: 'storefront' },
  { name: 'Street view', value: 'street' },
  { name: 'Souk/Marketplace/Bazaar', value: 'souk' },
  { name: 'Other outdoor space', value: 'public_realm' },
  { name: 'Indoor view', value: 'indoor' },
  { name: 'Craftsperson', value: 'craftsperson' },
  { name: 'Craft object', value: 'craft' },
  { name: 'Aerial view', value: 'aerial' },
  { name: 'Other', value: 'other' },
];

// Hello someone in 2030 hehehe
const VALID_DECADES = [
  1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000,
  2010, 2020,
];

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

const _getYearAndDecade = (dateStr, startDecade, endDecade) => {
  const year = dateStr?.split('-')[0];

  if (year) {
    const decade = Math.floor(year / 10) * 10;
    return { year, decade: [decade, decade] };
  }

  let decade = [];
  if (startDecade && endDecade) {
    decade = [startDecade, endDecade];
  } else if (startDecade) {
    decade = [startDecade, 2020];
  } else if (endDecade) {
    decade = [1880, endDecade];
  }

  return { year, decade };
};

/**
 * Converts an object mapping keys to boolean values to arrays of keys mapped to
 * true and keys mapped to false.
 *
 * @param {object} mapping - The mapping object, maps keys to booleans.
 * @returns {object} Two arrays of keys, one for the keys that are true, and one
 *    for the keys that are false.
 */
const _arrayifyTrueFalseMapping = (mapping) => {
  const trueValues = [];
  const falseValues = [];
  for (const key in mapping) {
    if (mapping[key]) {
      trueValues.push(key);
    } else {
      falseValues.push(key);
    }
  }
  return { trueValues, falseValues };
};

/**
 * Extracts the location from the raw contribution form data.
 *
 * @param {object} form - Raw form data
 * @returns {import("../models/Types").Location} The location object.
 */
const _getLocationFromForm = (data) => {
  let address = null;
  if (data.buildingNumber && data.street) {
    address = `${data.buildingNumber} ${data.street}`;
  } else if (data.buildingNumber) {
    address = `${data.buildingNumber}`;
  } else if (data.street) {
    address = `${data.street}`;
  }
  const location = {
    geo: {
      lat: data.lat,
      lng: data.lng,
    },
    address: {
      content: address,
      content_ar: null,
      content_orig: address,
      content_orig_lang: 'en', // Assume the content is in English
    },
    adm1: null, // TODO: Can be inferred from adm4
    adm2: null, // TODO: Can be inferred from adm4
    adm3: data.quarter,
    adm4: data.sector,
  };

  return location;
};

/**
 * Converts raw form data from the workshop contribution to the workshop
 * database schema.
 *
 * @param {object} data - Raw form data. See `pages/contribution/workshop.js`
 * @returns {object} Object containing the workshop data and corresponding image
 *    metadata. Note that the image metadata will be null if no image is
 *    provided.
 */
const convertWorkshopContributionToSchema = (data) => {
  const newWorkshopId = generateId();

  // Get the image type
  const { trueValues: imageType } = _arrayifyTrueFalseMapping(
    data.image_content?.defaultTags
  );

  // Craft disciplines
  // @GatlenCulp - Update this if your craft type implementation changes
  const { trueValues: craftDiscipline } = _arrayifyTrueFalseMapping(
    data.type_of_craft?.defaultTags
  );
  const { trueValues: craftDisciplineCategory } = _arrayifyTrueFalseMapping(
    data.craft_discipline?.defaultTags
  );
  // FIXME: Right now the "craft_discipline_other" only accepts a single string
  // field. I concatenate the other craft disciplines into a single string as a
  // temp fix. The category other field also does not exist in the schema.
  let craftDisciplineOther = '';
  if (data.craft_discipline_other?.defaultTags) {
    craftDisciplineOther = Object.keys(data.type_of_craft.customTags).join(
      ', '
    );
  }

  // Get the year and decade
  const { year: yearEstablished, decade: decadeEstablished } =
    _getYearAndDecade(data.yearEstablished, data.startDecade, data.endDecade);

  // Get the location
  const location = _getLocationFromForm(data);

  // Prepare the image medata and image data objects

  /**
   * @type {import("../models/Types").ImageMeta}
   */
  let imageMeta = null;

  /**
   * @type {import("../models/Types").ImageData}
   */
  let imageData = null;

  let imageId;
  if (data.imageData) {
    imageId = `${newWorkshopId}_1`;

    const imageName = `${imageId}.${data.imageExtension}`;
    const imageUrl = `https://cddl-beirut.herokuapp.com/api/images/${imageName}`;

    // Create image meta object
    imageMeta = {
      img_id: imageId,
      response_id: newWorkshopId,
      from_survey: WORKSHOP_CONTRIBUTION_NAME,
      is_thumbnail: true,
      type: imageType,
      craft_category: craftDisciplineCategory,
      craft_type: craftDiscipline,
      keywords: [...craftDisciplineCategory, ...craftDiscipline],
      is_series: false, // Assumed
      location: location,
      year_taken: 2022, // Assumed
      decade_taken: [2020, 2020], // Assumed
      caption: data.caption,
      src: imageUrl,
    };

    imageData = {
      img_id: imageId,
      filename: imageName,
      data: data.imageData,
    };
  }

  /**
   * @type {import("../models/Types").Workshop}
   */
  const workshop = {
    ID: newWorkshopId,
    survey_origin: WORKSHOP_CONTRIBUTION_NAME,
    ID_craftspeople: null,
    shop_name: {
      content: data.shopName,
      content_ar: null,
      content_orig: data.shopName,
      content_orig_lang: 'en', // Assume the content is in English
    },
    shop_owner_name: data.ownerName,
    contact_info: {
      email: data.email,
      phone: data.phone,
      website: data.website,
      social_media: data.socialMedia,
    },
    craft_discipline_category: craftDisciplineCategory,
    craft_discipline: craftDiscipline,
    craft_discipline_other: craftDisciplineOther,
    location: location,
    shop_status: data.status,
    year_established: yearEstablished,
    decade_established: decadeEstablished,
    data_collection_comments: data.data_collection_comments,
    produced_here: true,
    thumb_img_id: imageId,
    images: imageId ? [imageId] : [],
  };

  return {
    workshop,
    imageMeta,
    imageData,
  };
};

/**
 * Converts raw form data from the archive contribution to the archive
 * database schema.
 *
 * @param {object} data - Raw form data. See `pages/contribution/archive.js`
 * @returns {object} Object containing the archive data and corresponding image
 *    metadata. Note that the image metadata will be null if no image is
 *    provided.
 */
const convertArchiveContributionToSchema = (data) => {
  const newArchiveId = generateId();

  // Prepare the image medata and image data objects

  const location = _getLocationFromForm(data);

  // Format the year/decade data
  const { year, decade } = _getYearAndDecade(
    data.dateTaken,
    data.startDecade,
    data.endDecade
  );

  // Format the craft disciplines data

  // Craft disciplines
  // @GatlenCulp - Update this if your craft type implementation changes
  const { trueValues: craftDiscipline } = _arrayifyTrueFalseMapping(
    data.type_of_craft?.defaultTags
  );
  const { trueValues: craftDisciplineCategory } = _arrayifyTrueFalseMapping(
    data.craft_discipline?.defaultTags
  );
  // FIXME: Right now the "craft_discipline_other" only accepts a single string
  // field. I concatenate the other craft disciplines into a single string as a
  // temp fix. The category other field also does not exist in the schema.
  let craftDisciplineOther = '';
  if (data.craft_discipline_other?.defaultTags) {
    craftDisciplineOther = Object.keys(data.type_of_craft.customTags).join(
      ', '
    );
  }

  /**
   * @type {import("../models/Types").ImageMeta}
   */
  let imageMeta = null;

  /**
   * @type {import("../models/Types").ImageData}
   */
  let imageData = null;

  let imageId;
  if (data.imageData) {
    imageId = `${newArchiveId}_1`;

    const imageName = `${imageId}.${data.imageExtension}`;
    const imageUrl = `https://cddl-beirut.herokuapp.com/api/images/${imageName}`;

    // Create image meta object
    imageMeta = {
      img_id: imageId,
      response_id: newArchiveId,
      from_survey: ARCHIVE_CONTRIBUTION_NAME,
      is_thumbnail: true,
      type: data.imageType, // From the data (might be changed)
      craft_category: craftDisciplineCategory,
      craft_type: craftDiscipline,
      keywords: [...craftDisciplineCategory, ...craftDiscipline],
      is_series: false, // Assumed
      location: location,
      year_taken: 2022, // Assumed
      decade_taken: [2020, 2020], // Assumed
      caption: data.caption,
      src: imageUrl,
    };

    imageData = {
      img_id: imageId,
      filename: imageName,
      data: data.imageData,
    };
  }

  /**
   * @type {import("../models/Types").ArchiveObject}
   */
  const archive = {
    ID: newArchiveId,
    info_type: ARCHIVE_CONTRIBUTION_NAME,
    craft_discipline_category: craftDisciplineCategory,
    craft_discipline: craftDiscipline,
    craft_discipline_other: craftDisciplineOther,
    primary_location: location,
    shop_name: {
      content: data.shopName,
      content_ar: data.shopName_ar,
      content_orig: data.shopName,
      content_orig_lang: 'en',
    },
    owner_name: {
      content: data.ownerName,
      content_ar: data.ownerName_ar,
      content_orig: data.ownerName,
      content_orig_lang: 'en',
    },
    primary_year: year,
    primary_decade: decade,
    is_duplicate_of: null,
    is_series: false,
    primary_historic_map: null,
    reference: {
      name: data.referenceName,
      ref_type: null,
      type_other: null,
      location: null,
      catalog: null,
      link: data.referenceUrl,
      keywords: null,
      citation: null,
      year: null,
      copyright: data.referenceCopyright,
      scan: null,
    },
    thumb_img_id: imageId,
    images: imageId ? [imageId] : [],
  };

  return {
    archive,
    imageMeta,
    imageData,
  };
};

/**
 * Gets the distance between two lat/long points.
 *
 * @param {import('../models/Types').LatLng} geo1 - The first lat/long point.
 * @param {import('../models/Types').LatLng} geo2 - The second lat/long point.
 * @returns {number} The distance between the two points in meters
 */
const get_distance_between_points = (geo1, geo2) => {
  try {
    const line = lineString([
      [geo1.lng, geo1.lng],
      [geo2.lng, geo2.lat],
    ]);
    const length = turfLength(line, { units: 'meters' });
    return length;
  } catch (err) {
    console.error(err);
    return Infinity;
  }
};

module.exports = {
  DEFAULT_ID_LENGTH,
  MAPBOX_STYLE_URL,
  ARCHIVE_CONTRIBUTION_NAME,
  WORKSHOP_CONTRIBUTION_NAME,
  CRAFT_CATEGORIES,
  CRAFT_TYPES,
  IMAGE_TYPES,
  VALID_DECADES,
  convertWorkshopContributionToSchema,
  convertArchiveContributionToSchema,
  isImage,
  generateId,
  get_distance_between_points,
};
