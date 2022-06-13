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

// Broken down by Quarter, then into sector. https://www.lebanesearabicinstitute.com/areas-beirut/
// Unsure if Arabic will be used yet until translate tool is implemented. Fill out later.
const BEIRUT_ZONES = {
  quarters: [
    {
      EN: 'Marfaa',
      AR: 'المرْفأ',
      sectors: [
        {
          EN: 'Nejmeh',
          AR: 'النِّجْمِة',
          index: '11',
        },
        {
          EN: 'Majidieh',
          AR: 'المَجيدِيِّة',
          index: '12',
        },
        {
          EN: 'Marfaa',
          AR: 'المَرْفَأ',
          index: '14',
        },
        {
          EN: 'Nouveau Secteur',
          AR: 'المَنْطَقة المُسْتَحْدَثِة',
          index: '15',
        },
      ],
    },
    {
      EN: 'Mina El-Hosn',
      AR: 'ميناء الحصن',
      sectors: [
        {
          EN: 'Mina El-Hosn',
          AR: 'ميناء الحصن',
          index: '20',
        },
        {
          EN: 'Bab Idris',
          AR: '',
          index: '21',
        },
        {
          EN: 'Qantari',
          AR: '',
          index: '22',
        },
      ],
    },
    {
      EN: 'Zuqaq El-Blat',
      AR: '',
      sectors: [
        {
          EN: 'Serail',
          AR: '',
          index: '23',
        },
        {
          EN: 'Batrakieh',
          AR: '',
          index: '24',
        },
      ],
    },
    {
      EN: 'Bachoura',
      AR: '',
      sectors: [
        {
          EN: 'Basta El-Tahta',
          AR: '',
          index: '25',
        },
        {
          EN: 'Bachoura',
          AR: '',
          index: '26',
        },
      ],
    },
    {
      EN: 'Saifi',
      AR: '',
      sectors: [
        {
          EN: 'Yesouieh',
          AR: '',
          index: '27',
        },
        {
          EN: 'Mar Maroun',
          AR: '',
          index: '28',
        },
        {
          EN: 'Gemmayzeh',
          AR: '',
          index: '29',
        },
      ],
    },
    {
      EN: 'Dar El-Mreisseh',
      AR: '',
      sectors: [
        {
          EN: 'Ain El-Mreisseh',
          AR: '',
          index: '30',
        },
        {
          EN: 'Jamia',
          AR: '',
          index: '31',
        },
        {
          EN: 'Ras Beirut',
          AR: '',
          index: '35',
        },
      ],
    },
    {
      EN: 'Ras Beirut',
      AR: '',
      sectors: [
        {
          EN: 'Jounblat',
          AR: '',
          index: '32',
        },
        {
          EN: 'Snoubra',
          AR: '',
          index: '33',
        },
        {
          EN: 'Hamra',
          AR: '',
          index: '34',
        },
        {
          EN: 'Manara',
          AR: '',
          index: '36',
        },
        {
          EN: 'Qoreitem',
          AR: '',
          index: '37',
        },
        {
          EN: 'Raoucheh',
          AR: '',
          index: '38',
        },
        {
          EN: 'Ain El-Tineh',
          AR: '',
          index: '39',
        },
      ],
    },
    {
      EN: 'Mousaitbeh',
      AR: '',
      sectors: [
        {
          EN: 'Zarif',
          AR: '',
          index: '40',
        },
        {
          EN: 'Sanayeh',
          AR: '',
          index: '41',
        },
        {
          EN: 'Tallet El-Drouz',
          AR: '',
          index: '42',
        },
        {
          EN: 'Dar El-Fatwa',
          AR: '',
          index: '44',
        },
        {
          EN: 'Tallet El-Khayat',
          AR: '',
          index: '45',
        },
        {
          EN: 'UNESCO',
          AR: '',
          index: '46',
        },
        {
          EN: 'Mar Elias',
          AR: '',
          index: '47',
        },
        {
          EN: 'Wata',
          AR: '',
          index: '48',
        },
        {
          EN: 'Mousaitbeh',
          AR: '',
          index: '49',
        },
      ],
    },
    {
      EN: 'Mazraa',
      AR: '',
      sectors: [
        {
          EN: 'Burj Abi Haidar',
          AR: '',
          index: '50',
        },
        {
          EN: 'Basta El-Faouqa',
          AR: '',
          index: '51',
        },
        {
          EN: 'Ras El-Nabaa',
          AR: '',
          index: '52',
        },
        {
          EN: 'Mazraa',
          AR: '',
          index: '53',
        },
        {
          EN: 'Malaab',
          AR: '',
          index: '55',
        },
        {
          EN: 'Tariq El-Jdideh',
          AR: '',
          index: '56',
        },
        {
          EN: 'Horch',
          AR: '',
          index: '57',
        },
        {
          EN: 'Parc',
          AR: '',
          index: '58',
        },
        {
          EN: 'Amlieh',
          AR: '',
          index: '59',
        },
      ],
    },
    {
      EN: 'Achrafieh',
      AR: '',
      sectors: [
        {
          EN: 'Furn El-Hayek',
          AR: '',
          index: '61',
        },
        {
          EN: 'Nasra',
          AR: '',
          index: '62',
        },
        {
          EN: 'Archafieh',
          AR: '',
          index: '63',
        },
        {
          EN: 'Hôtel Dieu',
          AR: '',
          index: '64',
        },
        {
          EN: 'Mar Mitr',
          AR: '',
          index: '65',
        },
        {
          EN: 'Adlieh (Palais de Justice)',
          AR: '',
          index: '66',
        },
        {
          EN: 'Sioufi',
          AR: '',
          index: '67',
        },
        {
          EN: 'Ghabi',
          AR: '',
          index: '68',
        },
        {
          EN: 'Corniche El-Nahr',
          AR: '',
          index: '69',
        },
      ],
    },
    {
      EN: 'Rmeil',
      AR: '',
      sectors: [
        {
          EN: 'Mar Nkoula',
          AR: '',
          index: '71',
        },
        {
          EN: 'Hikmeh',
          AR: '',
          index: '73',
        },
        {
          EN: 'Mustashfa El-Roum (Hôpital Orthodoxe)',
          AR: '',
          index: '74',
        },
        {
          EN: 'Jeitaoui',
          AR: '',
          index: '78',
        },
        {
          EN: 'Qobayat',
          AR: '',
          index: '79',
        },
      ],
    },
    {
      EN: 'Medawar',
      AR: '',
      sectors: [
        {
          EN: 'Rmeil',
          AR: '',
          index: '72',
        },
        {
          EN: 'Mar Mikhael',
          AR: '',
          index: '75',
        },
        {
          EN: 'Khodr',
          AR: '',
          index: '76',
        },
        {
          EN: 'Jisr',
          AR: '',
          index: '77',
        },
      ],
    },
  ],
};

const REGEX_VALIDATION = {
  tel: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
  email:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  url: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i,
};

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

/**
 * @param {string} dateStr - Unknown
 * @param {number} startDecade
 * @param {number} endDecade
 * @returns {{number, number}} { year, decade }
 */
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
 * Given a list of submitted craft types, returns whatever is default or considered other
 */

const separateOtherCrafts = (formCrafts, other) => {
  let defaultCrafts = [];
  let otherCrafts = [];
  formCrafts.map((craft)=> {
    if (CRAFT_TYPES.indexOf(craft)>-1) {
      defaultCrafts.push(craft)
    } else {
      otherCrafts.push(craft)
    }
  })
  if (other) {
    return otherCrafts
  } else {
    return defaultCrafts
  }
}

// /**
//  * Converts an object mapping keys to boolean values to arrays of keys mapped to
//  * true and keys mapped to false.
//  *
//  * @param {object} mapping - The mapping object, maps keys to booleans.
//  * @returns {object} Two arrays of keys, one for the keys that are true, and one
//  *    for the keys that are false.
//  */
// const _arrayifyTrueFalseMapping = (mapping) => {
//   const trueValues = [];
//   const falseValues = [];
//   for (const key in mapping) {
//     if (mapping[key]) {
//       trueValues.push(key);
//     } else {
//       falseValues.push(key);
//     }
//   }
//   return { trueValues, falseValues };
// };

const isProperlyTruthy = (x) => {
  if (x) {
    return !(typeof x == 'object' ? Object.keys(x).length == 0 : !x);
  } else return false;
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
      lat: data.lat ? data.lat : null,
      lng: data.lng ? data.lng : null,
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

const _getImageDataFromWorkshopForm = (data, id, imageIndex = 0) => {
  if (data.images.length == 0) return;

  let imageMeta = null;
  let location = _getLocationFromForm(data);

  /**
   * @type {import("../models/Types").ImageDataOriginal}
   */
  let imageDataOriginal = null;

  let imageId;
  if (data.images[imageIndex].imageData) {
    imageId = `${id}_${imageIndex + 1}`;

    const imageName = `${imageId}_original.${data.images[imageIndex].imageExtension}`;
    const imageUrl = `http://cddl-beirut.herokuapp.com/api/images/${imageId}.${data.images[imageIndex].imageExtension}`;

    // Create image meta object
    imageMeta = {
      img_id: imageId,
      response_id: id,
      from_survey: WORKSHOP_CONTRIBUTION_NAME,
      is_thumbnail: true,
      type: data.image_content,
      craft_category: data.craft_category,
      craft_type: data.type_of_craft,
      keywords: [...data.type_of_craft, ...data.craft_category],
      is_series: false,
      location: location,
      year_taken: 2022, // TODO #12.b
      decade_taken: [2020, 2020],
      caption: data.caption,
      src: imageUrl,
    };

    imageDataOriginal = {
      img_id: imageId,
      from_survey: WORKSHOP_CONTRIBUTION_NAME,
      filename: imageName,
      data: data.images[imageIndex].imageData,
    };
  }
  return { imageId, imageMeta, imageDataOriginal };
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
const convertWorkshopContributionToSchema = (data, formSchema) => {
  const aboutPage = formSchema.pages.about;
  const locationPage = formSchema.pages.location;
  // const craftPage = formSchema.pages.about_the_craft;
  const imagePage = formSchema.pages.image_upload;
  const previewPage = formSchema.pages.preview;

  const newWorkshopId = generateId();

  // INFO: Get the image type
  const imageType = data.image_content;

  // INFO: Get the year and decade
  const { year: yearEstablished, decade: decadeEstablished } =
    _getYearAndDecade(data[aboutPage.fields.year_established.field_name]);

  // INFO: Get the location
  const location = _getLocationFromForm(data);

  // INFO: Prepare the image medata and image data objects

  /**
   * @type {import("../models/Types").ImageMeta}
   */
  let { imageId, imageMeta, imageDataOriginal } = _getImageDataFromWorkshopForm(
    data,
    newWorkshopId
  );

  // INFO: get craft types and craft other types
  let craft_discipline = separateOtherCrafts(data[aboutPage.fields.type_of_craft.field_name], false);
  let craft_discipline_other = separateOtherCrafts(data[aboutPage.fields.type_of_craft.field_name], true)

  /**
   * @type {import("../models/Types").Workshop}
   */
  const workshop = {
    ID: newWorkshopId,
    survey_origin: WORKSHOP_CONTRIBUTION_NAME,
    ID_craftspeople: null,
    shop_name: {
      content: data[aboutPage.fields.shop_name.field_name],
      content_ar: null,
      content_orig: data[aboutPage.fields.shop_name.field_name],
      content_orig_lang: 'en', // Assume the content is in English
    },
    shop_owner_name: null, // No owner name included in the form
    contact_info: {
      email: data[aboutPage.fields.email.field_name] || null,
      phone: data[aboutPage.fields.phone.field_name] || null,
      website: data[aboutPage.fields.website.field_name] || null,
      social_media: data[aboutPage.fields.social_media.field_name] || null,
    },
    craft_discipline_category: data[aboutPage.fields.craft_category.field_name],
    craft_discipline: craft_discipline,
    craft_discipline_other: craft_discipline_other, // Maybe should pull this from type_of_craft
    location: location,
    shop_status: data[aboutPage.fields.status.field_name],
    year_established: yearEstablished,
    decade_established: decadeEstablished,
    data_collection_comments: null,
    produced_here: true,
    thumb_img_id: imageId, // Currently only accepts a single image.
    images: imageId ? [imageId] : [],
  };

  return {
    workshop,
    imageMeta,
    imageDataOriginal,
  };
};

const _getImageDataFromArchiveForm = (data, id, imageIndex = 0) => {
  if (data.images.length == 0) return;

  /**
   * @type {import("../models/Types").ImageMeta}
   */
  let imageMeta = null;
  let location = _getLocationFromForm(data);

  /**
   * @type {import("../models/Types").ImageData}
   */
  let imageDataOriginal = null;

  let imageId;
  if (data.images[imageIndex].imageData) {
    imageId = `${id}_${imageIndex + 1}`;

    const imageUrl = `http://cddl-beirut.herokuapp.com/api/images/${imageId}.${data.images[imageIndex].imageExtension}`;
    const imageName = `${imageId}_original.${data.images[imageIndex].imageExtension}`;

    // Create image meta object
    imageMeta = {
      img_id: imageId,
      response_id: id,
      from_survey: ARCHIVE_CONTRIBUTION_NAME,
      is_thumbnail: true,
      type: data.image_type,
      craft_category: data.craft_category,
      craft_type: data.type_of_craft,
      keywords: [...data.craft_category, ...data.type_of_craft],
      is_series: false,
      location: location,
      year_taken: data.year_taken,
      decade_taken: [data.start_decade, data.end_decade],
      caption: data.caption,
      src: imageUrl,
    };

    imageDataOriginal = {
      img_id: imageId,
      from_survey: ARCHIVE_CONTRIBUTION_NAME,
      filename: imageName,
      data: data.images[imageIndex].imageData,
    };
  }
  return { imageId, imageMeta, imageDataOriginal };
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
const convertArchiveContributionToSchema = (data, formSchema) => {
  const imagePage = formSchema.pages.image_upload;
  const aboutPage = formSchema.pages.about;
  const locationPage = formSchema.pages.location;
  const previewPage = formSchema.pages.preview;

  console.debug(imagePage);

  const newArchiveId = generateId();

  // INFO: Prepare the image medata and image data objects
  const location = _getLocationFromForm(data);

  // INFO: Format the year/decade data
  const { year, decade } = _getYearAndDecade(
    data[imagePage.fields.year_taken.field_name],
    data[imagePage.fields.start_decade.field_name],
    data[imagePage.fields.end_decade.field_name]
  );
  // INFO: Define image (meta and data) if it exists in data
  const { imageId, imageMeta, imageDataOriginal } = _getImageDataFromArchiveForm(
    data,
    newArchiveId
  );

  // INFO: get craft types and craft other types
  let craft_discipline = separateOtherCrafts(data[imagePage.fields.type_of_craft.field_name], false);
  let craft_discipline_other = separateOtherCrafts(data[imagePage.fields.type_of_craft.field_name], true)

  /**
   * @type {import("../models/Types").ArchiveObject}
   */
  const archive = {
    ID: newArchiveId,
    info_type: ARCHIVE_CONTRIBUTION_NAME,
    craft_discipline_category: data[imagePage.fields.craft_category.field_name],
    craft_discipline: craft_discipline,
    craft_discipline_other: craft_discipline_other,
    primary_location: location,
    shop_name: {
      content: data[aboutPage.fields.workshop_name.field_name],
      content_ar: null,
      content_orig: data[aboutPage.fields.workshop_name.field_name],
      content_orig_lang: 'en',
    },
    owner_name: {
      content: data[aboutPage.fields.owner_name.field_name],
      content_ar: null,
      content_orig: data[aboutPage.fields.owner_name.field_name],
      content_orig_lang: 'en',
    },
    primary_year: year,
    primary_decade: decade,
    is_duplicate_of: null,
    is_series: false,
    primary_historic_map: null,
    reference: { // TODO #12.d
      name: data[aboutPage.fields.reference_name.field_name], // Name of person submitting the photo
      ref_type: null,
      type_other: null,
      location: null,
      catalog: null,
      link: data[aboutPage.fields.reference_source_citation.field_name],
      keywords: null,
      citation: null,
      year: null,
      copyright: data[aboutPage.fields.reference_copyright.field_name],
      scan: null,
    },
    thumb_img_id: imageId,
    images: imageId ? [imageId] : [],
  };

  return {
    archive,
    imageMeta,
    imageDataOriginal,
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
  BEIRUT_ZONES,
  WORKSHOP_CONTRIBUTION_NAME,
  CRAFT_CATEGORIES,
  CRAFT_TYPES,
  IMAGE_TYPES,
  REGEX_VALIDATION,
  VALID_DECADES,
  convertWorkshopContributionToSchema,
  convertArchiveContributionToSchema,
  isImage,
  generateId,
  get_distance_between_points,
  isProperlyTruthy,
};
