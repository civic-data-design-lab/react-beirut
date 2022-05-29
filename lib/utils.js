const DEFAULT_ID_LENGTH = 9;
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
const CRAFT_DISCIPLINES = [
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
  } else {
    decade = [1880, endDecade];
  }

  return { year, decade };
};

/**
 * Converts raw form data from the workshop contribution to the workshop
 * database schema.
 *
 * @param {object} data - Form data
 * @returns {object} Object containing the workshop data and corresponding image
 *    metadata. Note that the image metadata will be null if no image is
 *    provided.
 */
const convertWorkshopContributionToSchema = (data) => {
  const newWorkshopId = generateId();

  // Prepare the image medata and image data objects

  /**
   * @type {import("../models/Types").ImageMeta}
   */
  let imageMeta;

  /**
   * @type {import("../models/Types").ImageData}
   */
  let imageData;

  let imageId;
  if (data.imageData) {
    imageId = `${newWorkshopId}_1`;
    // TODO:
    imageMeta = {
      img_id: imageId,
      image_type: data.imageType,
    };

    imageData = {
      img_id: imageId,
      filename: `${imageId}.jpg`,
      data: data.imageData,
    };
  }

  // TODO: Sort out craft disciplines

  const { year: yearEstablished, decade: decadeEstablished } =
    _getYearAndDecade(data.dateEstablished, data.startDecade, data.endDecade);

  /**
   * @type {import("../models/Types").Workshop}
   */
  const workshop = {
    ID: newWorkshopId,
    survey_origin: WORKSHOP_CONTRIBUTION_NAME,
    ID_craftspeople: null,
    shop_name: {
      content: data.shopName,
      content_ar: data.shopName_ar,
      content_orig: data.shopName,
      content_orig_lang: 'en',
    },
    shop_owner_name: data.ownerName,
    contact_info: {
      email: data.email,
      phone: data.phone,
      website: data.website,
      social_media: data.socialMedia,
    },
    craft_discipline_category: data.craft_discipline,
    craft_discipline: data.craft_discipline,
    craft_discipline_other: data.craft_discipline_other,
    location: {
      geo: {
        lat: data.lat,
        lng: data.lng,
      },
      address: {
        content: data.address,
        content_ar: data.address_ar,
        content_orig: data.address,
        content_orig_lang: 'en',
      },
    },
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

const prepareArchiveContribution = (data) => {
  const newArchiveId = generateId();

  // Prepare the image medata and image data objects

  /**
   * Format the location data
   * @type {import("../models/Types").Location}
   */
  const location = {
    geo: {
      lat: data.lat,
      lng: data.lng,
    },
    address: {
      content: data.address,
      content_ar: data.address_ar,
      content_orig: data.address,
      content_orig_lang: 'en',
    },
    adm1: data.adm1,
    adm2: data.adm2,
    adm3: data.adm3,
    adm4: data.adm4,
  };

  // Format the year/decade data
  const { year, decade } = _getYearAndDecade(
    data.dateTaken,
    data.startDecade,
    data.endDecade
  );

  // Format the craft disciplines data
  const craftDisciplines = [];

  /**
   * @type {import("../models/Types").ImageMeta}
   */
  let imageMeta;

  /**
   * @type {import("../models/Types").ImageData}
   */
  let imageData;

  let imageId;
  if (data.imageData) {
    imageId = `${newArchiveId}_1`;
    // TODO:
    imageMeta = {
      img_id: imageId,
      image_type: data.imageType,
      location: location,
      year_taken: year,
      decade_taken: decade,
    };

    imageData = {
      img_id: imageId,
      filename: `${imageId}.jpg`,
      data: data.imageData,
    };
  }

  /**
   * @type {import("../models/Types").ArchiveObject}
   */
  const archive = {
    ID: newArchiveId,
    info_type: ARCHIVE_CONTRIBUTION_NAME, // CHECK: Is this correct?
    craft_discipline_category: data.craft_discipline,
    craft_discipline: data.craft_discipline,
    craft_discipline_other: data.craft_discipline_other,
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
      name: data.name,
      ref_type: data.ref_type,
      type_other: data.type_other,
      location: data.location,
      catalog: data.catalog,
      link: data.link,
      keywords: data.keywords,
      citation: data.citation,
      year: data.year,
      copyright: data.copyright,
      scan: data.scan,
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

module.exports = {
  DEFAULT_ID_LENGTH,
  MAPBOX_STYLE_URL,
  ARCHIVE_CONTRIBUTION_NAME,
  WORKSHOP_CONTRIBUTION_NAME,
  CRAFT_DISCIPLINES,
  CRAFT_TYPES,
  IMAGE_TYPES,
  VALID_DECADES,
  convertWorkshopContributionToSchema,
  prepareArchiveContribution,
  isImage,
  generateId,
};
