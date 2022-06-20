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
  'Upholstery',
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
          EN: 'Majidiye',
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
          EN: 'Bab Idriss',
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
          EN: 'El Zarif',
          AR: '',
          index: '40',
        },
        {
          EN: 'Sanayeh',
          AR: '',
          index: '41',
        },
        {
          EN: 'Tallet Druze',
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
          EN: 'Qobaiyat',
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

const _separateOtherCrafts = (formCrafts, other) => {
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
    if (otherCrafts.length>0){
      return otherCrafts
    } else {
      return null;
    }
  } else {
    if (defaultCrafts.length>0){
      return defaultCrafts
    } else {
      return null;
    }
  }
}

/**
 * Given an entry, determines if it is written in English (EN) or Arabic (AR)
 */

const _determineLanguage = (string) => {
  let arabic = /^[a-zA-Z\u0600-\u06FF0-9,!? .;:'"/_-]*$/
  let english = /^[a-zA-Z0-9,!? .;:'"/_-]*$/

  if (english.test(string)) {
    return "en"
  } else {
    console.log('not english')
    if (arabic.test(string)) {
      return "ar"
    }
  }
}

const _determineArabic = (string) => {
  let arabic = /^[a-zA-Z\u0600-\u06FF0-9,!? .;:'"/_-]*$/
  if (arabic.test(string)) {
    return string
  } else {
    return null
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
  let craftDiscipline = _separateOtherCrafts(data[aboutPage.fields.type_of_craft.field_name], false);
  let craftDisciplineOther = _separateOtherCrafts(data[aboutPage.fields.type_of_craft.field_name], true)

  console.log('craftDiscipline ', craftDiscipline);
  console.log('craftDisciplineOther ', craftDisciplineOther);


  /**
   * @type {import("../models/Types").Workshop}
   */
  const workshop = {
    ID: newWorkshopId,
    survey_origin: WORKSHOP_CONTRIBUTION_NAME,
    ID_craftspeople: null,
    shop_name: {
      content: data[aboutPage.fields.shop_name.field_name],
      content_ar: _determineArabic(data[aboutPage.fields.shop_name.field_name]),
      content_orig: data[aboutPage.fields.shop_name.field_name],
      content_orig_lang: _determineLanguage(data[aboutPage.fields.shop_name.field_name]),
    },
    shop_owner_name: null, // No owner name included in the form
    contact_info: {
      email: data[aboutPage.fields.email.field_name] || null,
      phone: data[aboutPage.fields.phone.field_name] || null,
      website: data[aboutPage.fields.website.field_name] || null,
      social_media: data[aboutPage.fields.social_media.field_name] || null,
    },
    craft_discipline_category: data[aboutPage.fields.craft_category.field_name],
    craft_discipline: craftDiscipline,
    craft_discipline_other: craftDisciplineOther, // Maybe should pull this from type_of_craft
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
  let craftDiscipline = _separateOtherCrafts(data[imagePage.fields.type_of_craft.field_name], false);
  let craftDisciplineOther = _separateOtherCrafts(data[imagePage.fields.type_of_craft.field_name], true)

  console.log("archive craft disc ", craftDiscipline)
  console.log('archive craft disc other ', craftDisciplineOther)

  /**
   * @type {import("../models/Types").ArchiveObject}
   */
  const archive = {
    ID: newArchiveId,
    info_type: ARCHIVE_CONTRIBUTION_NAME,
    craft_discipline_category: data[imagePage.fields.craft_category.field_name],
    craft_discipline: craftDiscipline,
    craft_discipline_other: craftDisciplineOther,
    primary_location: location,
    shop_name: {
      content: data[aboutPage.fields.workshop_name.field_name],
      content_ar: _determineArabic(data[aboutPage.fields.workshop_name.field_name]),
      content_orig: data[aboutPage.fields.workshop_name.field_name],
      content_orig_lang: _determineLanguage(data[aboutPage.fields.workshop_name.field_name]),
    },
    owner_name: {
      content: data[aboutPage.fields.owner_name.field_name],
      content_ar: _determineArabic(data[aboutPage.fields.owner_name.field_name]),
      content_orig: data[aboutPage.fields.owner_name.field_name],
      content_orig_lang: _determineLanguage(data[aboutPage.fields.owner_name.field_name]),
    },
    primary_year: year,
    primary_decade: decade,
    is_duplicate_of: null,
    is_series: false,
    primary_historic_map: null,
    reference: { // TODO #12.d
      name: data[aboutPage.fields.reference_name.field_name], // Name of person submitting the photo
      ref_type: data[aboutPage.fields.type_of_reference.field_name],
      type_other: null,
      location: null,
      catalog: null,
      link: null,
      keywords: null,
      citation: data[aboutPage.fields.reference_source_citation.field_name],
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



const TRANSLATIONS = {
    "resources": {
        "en": {
            "translation": {
                "English (EN)": "English (EN)",
                "Arabic": "Arabic",
                "English": "English",
                "Living Heritage Atlas | Beirut": "Living Heritage Atlas | Beirut",
                "Mapping and Activating Beirut's Craftsmanship": "Mapping and Activating Beirut's Craftsmanship",
                "Map": "Map",
                "the spatial presence of craftsmanship in Beirut": "the spatial presence of craftsmanship in Beirut",
                "Discover": "Discover",
                "local workshops and archival images of craftsmanship": "local workshops and archival images of craftsmanship",
                "Contribute": "Contribute",
                "images of contemporary and historic craft workshops": "images of contemporary and historic craft workshops",
                "Download": "Download",
                "data from the Living Heritage Atlas": "data from the Living Heritage Atlas",
                "About": "About",
                "the Living Heritage Atlas": "the Living Heritage Atlas",
                "Back": "Back",
                "Next": "Next",
                "Search by craft workshop name": "Search by craft workshop name",
                "Historical Maps": "Historical Maps",
                "Discover local workshops and archival images of craftsmanship in the Living Heritage Atlas | Beirut database": "Discover local workshops and archival images of craftsmanship in the Living Heritage Atlas | Beirut database",
                "Filter By": "Filter By",
                "Craft Type": "Craft Type",
                "Time Range": "Time Range",
                "Show only current craft workshops": "Show only current craft workshops",
                "Locate this craft workshop on the map": "Locate this craft workshop on the map",
                "Locate this archival image on the map": "Locate this archival image on the map",
                "Discover similar craft workshops": "Discover similar craft workshops",
                "Discover similar archival images": "Discover similar archival images",
                "Add an Archival Image": "Add an Archival Image",
                "Contribute to the Living Heritage Atlas! Add a current craft workshop or upload an archival image in Beirut to the database.": "Contribute to the Living Heritage Atlas! Add a current craft workshop or upload an archival image in Beirut to the database.",
                "Add a Craft Workshop": "Add a Craft Workshop",
                "What is this?": "What is this?",
                "Ongoing Workshop Data Collection": "Ongoing Workshop Data Collection",
                "What would you like to contribute?": "What would you like to contribute?",
                "The research team of the \u201cIntangible Heritage Atlas | Crafts\u201d has conducted multiple data collections initiatives through interviews, desk-research, archival research and surveys. Some data gathering activities are still scheduled to happen during participatory mapping workshops in late June and others will continue throughout summer 2022 through our website \u201cContribute\u201d tab.": "The research team of the \u201cIntangible Heritage Atlas | Crafts\u201d has conducted multiple data collections initiatives through interviews, desk-research, archival research and surveys. Some data gathering activities are still scheduled to happen during participatory mapping workshops in late June and others will continue throughout summer 2022 through our website \u201cContribute\u201d tab.",
                "The overall goal of our data collection strategy and methodology is to maximes the inclusiveness of our data gathering methods and sources. More specifically, the data collected by our team includes both oral stories, persona photos from craftspeople workshops but also visual material collected from libraries and private collections. In light of this unique patchwork of data, our team strongly believe that the \u201cIntangible Heritage Atlas | Crafts\u201d has the potential to enrich the narrative on craftsmanship in the city of Beirut and shed light onto those cultural practices that do not usually make it to relevant policy decisions and documents.": "The overall goal of our data collection strategy and methodology is to maximes the inclusiveness of our data gathering methods and sources. More specifically, the data collected by our team includes both oral stories, persona photos from craftspeople workshops but also visual material collected from libraries and private collections. In light of this unique patchwork of data, our team strongly believe that the \u201cIntangible Heritage Atlas | Crafts\u201d has the potential to enrich the narrative on craftsmanship in the city of Beirut and shed light onto those cultural practices that do not usually make it to relevant policy decisions and documents.",
                "Discard Record": "Discard Record",
                "Continue Record": "Continue Record",
                "Would you like to continue with your existing record or discard it?": "Would you like to continue with your existing record or discard it?",
                "You have an unsubmitted workshop contribution": "You have an unsubmitted workshop contribution",
                "You have an unsubmitted archive contribution": "You have an unsubmitted archive contribution",
                "Name of Shop": "Name of Shop",
                "About the Craft Workshop": "About the Craft Workshop",
                "Shop Information": "Shop Information",
                "Shop Name": "Shop Name",
                "Date Established": "Date Established",
                "Shop Status": "Shop Status",
                "Shop Contact Information": "Shop Contact Information",
                "Owner Name": "Owner Name",
                "Phone Number": "Phone Number",
                "Email Address": "Email Address",
                "Website": "Website",
                "Social Media": "Social Media",
                "": "",
                "Location Information": "Location Information",
                "Address Information": "Address Information",
                "(English Preferred)": "(English Preferred)",
                "Building Number": "Building Number",
                "Street Name/Number": "Street Name/Number",
                "Municipality": "Municipality",
                "Point Location": "Point Location",
                "Add shop point": "Add shop point",
                "Drag marker to change location": "Drag marker to change location",
                "About the Craft": "About the Craft",
                "Craft Discipline": "Craft Discipline",
                "What categories does the shop produce": "What categories does the shop produce",
                "Your custom tag was invalid. Please enter a tag that contains only letters.": "Your custom tag was invalid. Please enter a tag that contains only letters.",
                "Your custom tag is already in the set of default tags.": "Your custom tag is already in the set of default tags.",
                "Your custom tag was invalid. Please enter a tag that is less than 50 characters.": "Your custom tag was invalid. Please enter a tag that is less than 50 characters.",
                "Spaces are not allowed in custom tag.": "Spaces are not allowed in custom tag.",
                "Workshop Image Upload": "Workshop Image Upload",
                "Upload an image of the Workshop": "Upload an image of the Workshop",
                "Enter a caption or story associated with the image.": "Enter a caption or story associated with the image.",
                "Click to upload image": "Click to upload image",
                "Upload an archival image related to crafts in Beirut": "Upload an archival image related to crafts in Beirut",
                "What is shown in this image?": "What is shown in this image?",
                "Storefront": "Storefront",
                "Street view": "Streetview",
                "Craftsperson": "Craftsperson",
                "Craft object": "Craft object",
                "Other outdoor space": "Other outdoor space",
                "Missing Fields Required": "Missing Fields Required",
                "You are missing the following fields (marked with *):": "You are missing the following fields (marked with *):",
                "Go Back": "Go Back",
                "Continue Anyways": "Continue Anyways",
                "Archive Upload": "Archive Upload",
                "Image Information": "Image Information",
                "What is the image showing?": "What is the image showing?",
                "What year was the image taken?": "What year was the image taken?",
                "Shop Discipline": "Shop Discipline",
                "Please specify other discipline": "Please specify other discipline",
                "Shop Address": "Shop Address",
                "Shop Location": "Shop Location",
                "Shop Operation Status": "Shop Operation Status",
                "Contact Information": "Contact Information",
                "Architectural": "Architectural",
                "Cuisine": "Cuisine",
                "Decorative": "Decorative",
                "Fashion": "Fashion",
                "Functional": "Functional",
                "Furniture": "Furniture",
                "Textiles": "Textiles",
                "Brass": "Brass",
                "Ceramics": "Ceramics",
                "Copper": "Copper",
                "Embroidery": "Embroidery",
                "Food": "Food",
                "Glass": "Glass",
                "Jewelry": "Jewelry",
                "Leather": "Leather",
                "Metalwork": "Metalwork",
                "Marquetry": "Marquetry",
                "Sculpture": "Sculpture",
                "Shoemaker": "Shoemaker",
                "Soap": "Soap",
                "Tailor": "Tailor",
                "Tapestry": "Tapestry",
                "Upholstery": "Upholstery",
                "Wickerwork": "Wickerwork",
                "Woodwork": "Woodwork",
                "Other": "Other",
                "Open": "Open",
                "Temporarily Closed": "Temporarily Closed",
                "Permanently Closed": "Permanently Closed",
                "Yes": "Yes",
                "No": "No",
                "Filter Component (Explore and Discover Page)": "Filter Component (Explore and Discover Page)",
                "Filter By": "Filter By",
                "Enter Shop Name": "Enter Shop Name",
                "Year Range": "Year Range",
                "Only Show Active Businesses": "Only Show Active Businesses",
                "Reset Filters": "Reset Filters",
                "Map Layer Filter": "Map Layer Filter",
                "Historical Maps": "Historical Maps",
                "Reset Maps": "Reset Maps",
                "Map Card": "Map Card",
                "Handbags": "Handbags",
                "Wigs": "Wigs",
                "Circus Props": "Circus Props",
                "Antiques": "Antiques",
                "Printing Press": "Printing Press",
                "Lamp Design and Creation": "Lamp Design and Creation",
                "Carpentry": "Carpentry",
                "Fabric Reseller": "Fabric Reseller",
                "Printing and Binding": "Printing and Binding",
                "Chocolate": "Chocolate",
                "Block Printing": "Block Printing",
                "Artisanal Bread": "Artisanal Bread",
                "Chrome Plating": "Chrome Plating",
                "Silkscreen Painting": "Silkscreen Painting",
                "Aluminum": "Aluminum",
                "Art gallery and printing press": "Art gallery and printing press",
                "Plastic recycling and resin": "Plastic recycling and resin",
                "Plexiglass": "Plexiglass",
                "Stainless, silver, stones, porcelain, paintings, antiques maker and repair": "Stainless, silver, stones, porcelain, paintings, antiques maker and repair",
                "Watchmaking": "Watchmaking",
                "Fashion Design": "Fashion Design",
                "Vintage Furniture": "Vintage Furniture",
                "Curtains": "Curtains",
                "Printing": "Printing",
                "Repair": "Repair",
                "Mourakbati of stones": "Mourakbati of stones",
                "Perfumery": "Perfumery",
                "Jewelry base piece design": "Jewelry base piece design",
                "Shoe repair only": "Shoe repair only",
                "Painting and repair": "Painting and repair",
                "Stainless Steel": "Stainless Steel",
                "Book binding": "Book binding",
                "Antique watch repair and restoration": "Antique watch repair and restoration",
                "Lamp design and creation": "Lamp design and creation",
                "Mens suits fashion design": "Mens suits fashion design",
                "Painting frames": "Painting frames",
                "Chandelier making and repair": "Chandelier making and repair",
                "Gunsmith": "Gunsmith",
                "pipe maker": "pipe maker",
                "Fabric reseller": "Fabric reseller",
                "Upcycling": "Upcycling",
                "Calligraphy": "Calligraphy",
                "Bronze, marble, granite sculpture": "Bronze, marble, granite sculpture",
                "Belts, zippers, buttons, wallets": "Belts, zippers, buttons, wallets",
                "Mechanic": "Mechanic",
                "Mold Maker": "Mold Maker",
                "Womens shoemaker and repair": "Womens shoemaker and repair",
                "Explore Similar Shops": "Explore Similar Shops",
                "Image Captions": "Image Captions",
                "Captured": "Captured",
                "Established": "Established",
                "Beirut Central District": "Beirut Central District",
                "Medawar": "Medawar",
                "Minet el-Hosn": "Minet el-Hosn",
                "Marfaa": "Marfaa",
                "Ain El-Mreisseh": "Ain El-Mreisseh",
                "Ras Beyrouth": "Ras Beyrouth",
                "Zoukak el-Blatt": "Zoukak el-Blatt",
                "Saifeh": "Saifeh",
                "Remeil": "Remeil",
                "Moussaytbeh": "Moussaytbeh",
                "Bachoura": "Bachoura",
                "Achrafieh": "Achrafieh",
                "Mazraa": "Mazraa",
                "Bourj Hammoud": "Bourj Hammoud",
                "Baouchriyeh": "Baouchriyeh",
                "Dekouaneh": "Dekouaneh",
                "Sinn El-Fil": "Sinn El-Fil",
                "Mar Maroun": "Mar Maroun",
                "Kreitem": "Kreitem",
                "Sanayeh": "Sanayeh",
                "Snoubra": "Snoubra",
                "Mar Nkoula": "Mar Nkoula",
                "Tallet Druze": "Tallet Druze",
                "Patriarcat": "Patriarcat",
                "Ghabi": "Ghabi",
                "Furn El Hayek": "Furn El Hayek",
                "Yessouiyeh": "Yessouiyeh",
                "Raoucheh": "Raoucheh",
                "Mar Mitr": "Mar Mitr",
                "Basta El-Tahta": "Basta El-Tahta",
                "Moussaitbe": "Moussaitbe",
                "Dar El-Fatwa": "Dar El-Fatwa",
                "Ain El Tine": "Ain El Tine",
                "Achrafiye": "Achrafiye",
                "Nasra": "Nasra",
                "Bourj Abi Haidar": "Bourj Abi Haidar",
                "Basta Faouka": "Basta Faouka",
                "UNESCO": "UNESCO",
                "Mar Mikhael": "Mar Mikhael",
                "Jamia": "Jamia",
                "Ras Beirut": "Ras Beirut",
                "Ain Mreisse": "Ain Mreisse",
                "Khodr": "Khodr",
                "Jisr": "Jisr",
                "Hamra": "Hamra",
                "Jounblat": "Jounblat",
                "Manara": "Manara",
                "Kantari": "Kantari",
                "Bab Idriss": "Bab Idriss",
                "Nejmeh": "Nejmeh",
                "Serail": "Serail",
                "Gemmayzeh": "Gemmayzeh",
                "Geitawi": "Geitawi",
                "Hop. Orthodoxe": "Hop. Orthodoxe",
                "Qobaiyat": "Qobaiyat",
                "Al Hikma": "Al Hikma",
                "El Zarif": "El Zarif",
                "Ras El Nabaa": "Ras El Nabaa",
                "Sioufi": "Sioufi",
                "Tallet El-Khayat": "Tallet El-Khayat",
                "El Aamiliye": "El Aamiliye",
                "Hôtel Dieu": "Hôtel Dieu",
                "Wata": "Wata",
                "Mar Elias": "Mar Elias",
                "Malaab": "Malaab",
                "Parc": "Parc",
                "El Horsh": "El Horsh",
                "Tariq El-Jdideh": "Tariq El-Jdideh",
                "Minet El Hosn": "Minet El Hosn",
                "Majidiye": "Majidiye",
                "Corniche El-Nahr": "Corniche El-Nahr",
                "Palais De Justice": "Palais De Justice",
                "Shati' Al Bahri": "Shati' Al Bahri",
                "Dora": "Dora",
                "Maritime Domain": "Maritime Domain",
                "Haret Sader ": "Haret Sader ",
                "Nor Adana": "Nor Adana",
                "Ghilane": "Ghilane",
                "Nor Sis": "Nor Sis",
                "Nabaa": "Nabaa",
                "Mar Doumit": "Mar Doumit",
                "Nor Marash": "Nor Marash"
            }
        },
        "ar": {
            "translation": {
                "English (EN)": "Arabic (AR)",
                "Arabic": "\u0627\u0644\u0639\u0631\u0628\u064a",
                "English": "\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629",
                "Living Heritage Atlas | Beirut": "\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0627\u0644\u062d\u0631\u0641",
                "Mapping and Activating Beirut's Craftsmanship": "\u062a\u062e\u0637\u064a\u0637 \u0648 \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a",
                "Map": "",
                "the spatial presence of craftsmanship in Beirut": "\u0627\u0644\u062d\u0636\u0648\u0631 \u0627\u0644\u0645\u0643\u0627\u0646\u064a \u0644\u0644\u062d\u0631\u0641\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a",
                "Discover": "\u0627\u0628\u062d\u062b",
                "local workshops and archival images of craftsmanship": "\u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0648\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0644\u0644\u062d\u0631\u0641\u064a\u0629",
                "Contribute": "\u0633\u0627\u0647\u0645",
                "images of contemporary and historic craft workshops": "\u0635\u0648\u0631 \u0645\u0646 \u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u0645\u0639\u0627\u0635\u0631\u0629 \u0648\u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629",
                "Download": "\u062a\u0646\u0632\u064a\u0644 ",
                "data from the Living Heritage Atlas": "\u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0646 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a",
                "About": "\u0646\u0628\u0630\u0629 \u0639\u0646 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
                "the Living Heritage Atlas": "\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a",
                "Back": "\u0627\u0644\u0633\u0627\u0628\u0642",
                "Next": "\u0627\u0644\u062a\u0627\u0644\u064a ",
                "Search by craft workshop name": "\u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u0637\u0631\u064a\u0642 \u0627\u0633\u0645 \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629",
                "Historical Maps": "\u0627\u0644\u062e\u0631\u0627\u0626\u0637 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629",
                "Discover local workshops and archival images of craftsmanship in the Living Heritage Atlas | Beirut database": "\u0627\u0643\u062a\u0634\u0641 \u0648\u0631\u0634 \u0639\u0645\u0644 \u0645\u062d\u0644\u064a\u0629 \u0648 \u0635\u0648\u0631 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0644\u0644\u062d\u0631\u0641\u064a\u0629 \u0641\u064a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0642\u0627\u0639\u062f\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u0628\u064a\u0631\u0648\u062a",
                "Filter By": "\u0627\u0644\u062a\u0635\u0646\u064a\u0641 \u062d\u0633\u0628",
                "Craft Type": "\u0646\u0648\u0639 \u0627\u0644\u062d\u0631\u0641\u0629",
                "Time Range": "\u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0632\u0645\u0646\u064a",
                "Show only current craft workshops": "\u0627\u0639\u0631\u0636 \u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0641\u0642\u0637",
                "Locate this craft workshop on the map": "\u062d\u062f\u062f \u0645\u0648\u0642\u0639 \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644 \u0647\u0630\u0647 \u0639\u0644\u0649 \u0627\u0644\u062e\u0631\u064a\u0637\u0629",
                "Locate this archival image on the map": "\u062d\u062f\u062f \u0645\u0648\u0642\u0639 \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0639\u0644\u0649 \u0627\u0644\u062e\u0631\u064a\u0637\u0629",
                "Discover similar craft workshops": "\u0627\u0643\u062a\u0634\u0641 \u0648\u0631\u0634 \u062d\u0631\u0641\u064a\u0629 \u0645\u0645\u0627\u062b\u0644\u0629",
                "Discover similar archival images": "\u0627\u0643\u062a\u0634\u0641 \u0635\u0648\u0631 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0645\u0645\u0627\u062b\u0644\u0629",
                "Add an Archival Image": "\u0623\u0636\u0641 \u0635\u0648\u0631\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629",
                "Contribute to the Living Heritage Atlas! Add a current craft workshop or upload an archival image in Beirut to the database.": "\u0633\u0627\u0647\u0645 \u0641\u064a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a! \u0623\u0636\u0641 \u0648\u0631\u0634\u0629 \u062d\u0631\u0641\u064a\u0629 \u062d\u0627\u0644\u064a\u0629 \u0623\u0648 \u0642\u0645  \u0628\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a \u0625\u0644\u0649 \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a.",
                "Add a Craft Workshop": "\u0623\u0636\u0641 \u0648\u0631\u0634\u0629 \u062d\u0631\u0641\u064a\u0629",
                "What is this?": "\u0645\u0627 \u0647\u0630\u0627\u061f ",
                "Ongoing Workshop Data Collection": "\u062c\u0645\u0639 \u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062c\u0627\u0631\u064a\u0629 ",
                "What would you like to contribute?": "\u0628\u0645\u0627 \u062a\u0648\u062f \u0627\u0644\u0645\u0633\u0627\u0647\u0645\u0629\u061f",
                "The research team of the \u201cIntangible Heritage Atlas | Crafts\u201d has conducted multiple data collections initiatives through interviews, desk-research, archival research and surveys. Some data gathering activities are still scheduled to happen during participatory mapping workshops in late June and others will continue throughout summer 2022 through our website \u201cContribute\u201d tab.": "\u0641\u0631\u064a\u0642 \u0627\u0644\u0628\u062d\u062b \u0641\u064a \"\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u063a\u064a\u0631 \u0627\u0644\u0645\u0627\u062f\u064a | \u0627\u0644\u062d\u0631\u0641\" \u0642\u0627\u0645 \u0628\u0645\u0628\u0627\u062f\u0631\u0627\u062a \u0645\u062a\u0639\u062f\u062f\u0629 \u0644\u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0627\u062a \u0648\u0627\u0644\u0628\u062d\u0648\u062b \u0627\u0644\u0645\u0643\u062a\u0628\u064a\u0629 \u0648\u0627\u0644\u0628\u062d\u0648\u062b \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0648\u0627\u0644\u0645\u0633\u0648\u062d\u0627\u062a. \u0644\u0627 \u064a\u0632\u0627\u0644 \u0645\u0646 \u0627\u0644\u0645\u0642\u0631\u0631 \u0625\u062c\u0631\u0627\u0621 \u0628\u0639\u0636 \u0623\u0646\u0634\u0637\u0629 \u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u062e\u0644\u0627\u0644 \u0648\u0631\u0634 \u0639\u0645\u0644 \u0631\u0633\u0645 \u0627\u0644\u062e\u0631\u0627\u0626\u0637 \u0627\u0644\u062a\u0634\u0627\u0631\u0643\u064a\u0629 \u0641\u064a \u0623\u0648\u0627\u062e\u0631 \u062d\u0632\u064a\u0631\u0627\u0646\u060c \u0648\u0633\u062a\u0633\u062a\u0645\u0631 \u0623\u0646\u0634\u0637\u0629 \u0623\u062e\u0631\u0649 \u0637\u0648\u0627\u0644 \u0635\u064a\u0641 2022 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062a\u0628\u0648\u064a\u0628 \"\u0645\u0633\u0627\u0647\u0645\u0629\" \u0639\u0644\u0649 \u0645\u0648\u0642\u0639 \u0627\u0644\u0648\u064a\u0628 \u0627\u0644\u062e\u0627\u0635 \u0628\u0646\u0627.",
                "The overall goal of our data collection strategy and methodology is to maximes the inclusiveness of our data gathering methods and sources. More specifically, the data collected by our team includes both oral stories, persona photos from craftspeople workshops but also visual material collected from libraries and private collections. In light of this unique patchwork of data, our team strongly believe that the \u201cIntangible Heritage Atlas | Crafts\u201d has the potential to enrich the narrative on craftsmanship in the city of Beirut and shed light onto those cultural practices that do not usually make it to relevant policy decisions and documents.": "\u064a\u062a\u0645\u062b\u0644 \u0627\u0644\u0647\u062f\u0641 \u0627\u0644\u0639\u0627\u0645 \u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u062a\u0646\u0627 \u0648\u0645\u0646\u0647\u062c\u064a\u062a\u0646\u0627 \u0644\u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0641\u064a \u062a\u062d\u0642\u064a\u0642 \u0623\u0642\u0635\u0649 \u0642\u062f\u0631 \u0645\u0646 \u0627\u0644\u0634\u0645\u0648\u0644\u064a\u0629 \u0641\u064a \u0623\u0633\u0627\u0644\u064a\u0628\u0646\u0627 \u0648\u0645\u0635\u0627\u062f\u0631 \u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a. \u0648\u0648\u0628\u0634\u0643\u0644 \u0623\u0643\u062b\u0631 \u062a\u062d\u062f\u064a\u062f\u064b\u0627\u060c \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u064a \u062c\u0645\u0639\u0647\u0627 \u0641\u0631\u064a\u0642\u0646\u0627 \u062a\u0634\u0645\u0644 \u0642\u0635\u0635\u0627 \u0634\u0641\u0648\u064a\u0629 \u0648\u0635\u0648\u0631\u0627 \u0634\u062e\u0635\u064a\u0629 \u0645\u0646 \u0648\u0631\u0634 \u0627\u0644\u062d\u0631\u0641\u064a\u064a\u0646 \u0648\u0643\u0630\u0644\u0643 \u0645\u0648\u0627\u062f \u0628\u0635\u0631\u064a\u0629 \u062a\u0645 \u062c\u0645\u0639\u0647\u0627 \u0645\u0646 \u0627\u0644\u0645\u0643\u062a\u0628\u0627\u062a \u0648\u0645\u0646 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0627\u062a \u0627\u0644\u062e\u0627\u0635\u0629. \u0648\u0641\u064a \u0636\u0648\u0621 \u0647\u0630\u0627 \u0627\u0644\u062e\u0644\u064a\u0637 \u0627\u0644\u0641\u0631\u064a\u062f \u0645\u0646 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a\u060c \u064a\u0639\u062a\u0642\u062f \u0641\u0631\u064a\u0642\u0646\u0627 \u0627\u0639\u062a\u0642\u0627\u062f\u0627 \u0631\u0627\u0633\u062e\u0627 \u0623\u0646 \"\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u063a\u064a\u0631 \u0627\u0644\u0645\u0627\u062f\u064a | \u0627\u0644\u062d\u0631\u0641\" \u064a\u0645\u0643\u0646 \u0623\u0646 \u064a\u062b\u0631\u064a \u0627\u0644\u0631\u0648\u0627\u064a\u0629 \u0639\u0646 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0641\u064a \u0645\u062f\u064a\u0646\u0629 \u0628\u064a\u0631\u0648\u062a \u0648\u064a\u0644\u0642\u064a \u0627\u0644\u0636\u0648\u0621 \u0639\u0644\u0649 \u062a\u0644\u0643 \u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0627\u062a \u0627\u0644\u062b\u0642\u0627\u0641\u064a\u0629 \u0627\u0644\u062a\u064a \u0644\u0627 \u062a\u062a\u0641\u0642 \u0639\u0627\u062f\u0629 \u0645\u0639 \u0627\u0644\u0642\u0631\u0627\u0631\u0627\u062a \u0648\u0627\u0644\u0648\u062b\u0627\u0626\u0642 \u0627\u0644\u0633\u064a\u0627\u0633\u064a\u0629 \u0630\u0627\u062a \u0627\u0644\u0635\u0644\u0629.",
                "Discard Record": "\u062d\u0630\u0641 \u0627\u0644\u0633\u062c\u0644",
                "Continue Record": "\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0633\u062c\u0644",
                "Would you like to continue with your existing record or discard it?": "\u0647\u0644 \u062a\u0631\u063a\u0628 \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0641\u064a \u0633\u062c\u0644\u0643 \u0627\u0644\u062d\u0627\u0644\u064a \u0623\u0648 \u062d\u0630\u0641\u0647\u061f",
                "You have an unsubmitted workshop contribution": "\u0644\u062f\u064a\u0643 \u0645\u0633\u0627\u0647\u0645\u0629 \u0648\u0631\u0634\u0629 \u0639\u0645\u0644 \u0644\u0645 \u064a\u062a\u0645 \u0627\u0631\u0633\u0627\u0644\u0647\u0627 ",
                "You have an unsubmitted archive contribution": "\u0644\u062f\u064a\u0643 \u0645\u0633\u0627\u0647\u0645\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0644\u0645 \u064a\u062a\u0645 \u0627\u0631\u0633\u0627\u0644\u0647\u0627 ",
                "Name of Shop": "\u0627\u0633\u0645 \u0627\u0644\u0645\u062d\u0644",
                "About the Craft Workshop": "\u0646\u0628\u0630\u0629 \u0639\u0646 \u0627\u0644\u0648\u0631\u0634\u0629 \u0627\u0644\u062d\u0631\u0641\u064a\u0629",
                "Shop Information": "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646 \u0627\u0644\u0645\u062d\u0644",
                "Shop Name": "\u0627\u0633\u0645 \u0627\u0644\u0645\u062d\u0644",
                "Date Established": "\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u062a\u0623\u0633\u064a\u0633",
                "Shop Status": "\u062d\u0627\u0644\u0629 \u0627\u0644\u0645\u062d\u0644",
                "Shop Contact Information": "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0627\u0644\u062e\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u062d\u0644",
                "Owner Name": "\u0627\u0633\u0645 \u0627\u0644\u0645\u0627\u0644\u0643",
                "Phone Number": "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641",
                "Email Address": "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
                "Website": "\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
                "Social Media": "\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a",
                "": "",
                "Location Information": "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646 \u0627\u0644\u0645\u0648\u0642\u0639",
                "Address Information": "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646",
                "(English Preferred)": "(\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629 \u0645\u0641\u0636\u0644\u0629)",
                "Building Number": "\u0631\u0642\u0645 \u0627\u0644\u0645\u0628\u0646\u0649",
                "Street Name/Number": "\u0627\u0633\u0645 / \u0631\u0642\u0645 \u0627\u0644\u0634\u0627\u0631\u0639 ",
                "Municipality": "\u0627\u0644\u0628\u0644\u062f\u064a\u0629",
                "Point Location": "\u0623\u0634\u0631 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639",
                "Add shop point": "\u0623\u0636\u0641 \u0646\u0642\u0637\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u062d\u0644",
                "Drag marker to change location": "\u0627\u0633\u062d\u0628 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0644\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0645\u0648\u0642\u0639",
                "About the Craft": "\u0646\u0628\u0630\u0629 \u0639\u0646 \u0627\u0644\u062d\u0631\u0641\u0629",
                "Craft Discipline": "\u062a\u062e\u0635\u0635 \u0627\u0644\u062d\u0631\u0641\u0629 ",
                "What categories does the shop produce": "\u0645\u0627 \u0647\u064a \u0627\u0644\u0641\u0626\u0627\u062a \u0627\u0644\u062a\u064a \u064a\u0646\u062a\u062c\u0647\u0627 \u0627\u0644\u0645\u062d\u0644",
                "Your custom tag was invalid. Please enter a tag that contains only letters.": "\u0648\u0633\u0645\u0643 \u0627\u0644\u0645\u062e\u0635\u0635 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d. \u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0648\u0633\u0645 \u064a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u0623\u062d\u0631\u0641 \u0641\u0642\u0637.",
                "Your custom tag is already in the set of default tags.": "\u0648\u0633\u0645\u0643 \u0627\u0644\u0645\u062e\u0635\u0635 \u0645\u0648\u062c\u0648\u062f \u0623\u0635\u0644\u0627 \u0641\u064a \u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0648\u0633\u0648\u0645 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629.",
                "Your custom tag was invalid. Please enter a tag that is less than 50 characters.": "\u0648\u0633\u0645\u0643 \u0627\u0644\u0645\u062e\u0635\u0635 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d. \u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0648\u0633\u0645 \u0623\u0642\u0644 \u0645\u0646 50 \u062d\u0631\u0641\u064b\u0627.",
                "Spaces are not allowed in custom tag.": "\u0627\u0644\u0645\u0633\u0627\u0641\u0627\u062a \u0628\u064a\u0646 \u0627\u0644\u0643\u0644\u0645\u0627\u062a \u063a\u064a\u0631 \u0645\u0633\u0645\u0648\u062d \u0641\u064a \u0627\u0644\u0648\u0633\u0648\u0645 \u0627\u0644\u0645\u062e\u0635\u0635\u0629",
                "Workshop Image Upload": "\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644",
                "Upload an image of the Workshop": "\u0642\u0645 \u0628\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0644\u0644\u0648\u0631\u0634\u0629",
                "Enter a caption or story associated with the image.": "\u0623\u062f\u062e\u0644 \u062a\u0639\u0644\u064a\u0642\u064b\u0627 \u0623\u0648 \u0642\u0635\u0629 \u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u0627\u0644\u0635\u0648\u0631\u0629.",
                "Click to upload image": "\u0625\u0636\u063a\u0637 \u0644\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0635\u0648\u0631\u0629",
                "Upload an archival image related to crafts in Beirut": "\u0642\u0645 \u0628\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0645\u062a\u0639\u0644\u0642\u0629 \u0628\u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a",
                "What is shown in this image?": "\u0645\u0627\u0630\u0627 \u064a\u0638\u0647\u0631 \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629\u061f",
                "Storefront": "\u0648\u0627\u062c\u0647\u0629 \u0627\u0644\u0645\u062d\u0644",
                "Street view": "\u0645\u0646\u0638\u0631 \u0627\u0644\u0634\u0627\u0631\u0639",
                "Craftsperson": "\u062d\u0631\u0641\u064a",
                "Craft object": "\u0645\u0646\u062a\u0648\u062c \u062d\u0631\u0641\u064a",
                "Other outdoor space": "\u0645\u0643\u0627\u0646 \u062e\u0627\u0631\u062c\u064a \u0622\u062e\u0631",
                "Missing Fields Required": "\u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u0645\u0641\u0642\u0648\u062f\u0629 \u0645\u0637\u0644\u0648\u0628\u0629",
                "You are missing the following fields (marked with *):": "\u062a\u0641\u062a\u0642\u062f \u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u062a\u0627\u0644\u064a\u0629 (\u0627\u0644\u0645\u0645\u064a\u0632\u0629 \u0628\u0639\u0644\u0627\u0645\u0629 *):",
                "Go Back": "\u0639\u062f \u0644\u0644\u0648\u0631\u0627\u0621",
                "Continue Anyways": "\u0627\u0644\u0645\u0648\u0627\u0635\u0644\u0629 \u0639\u0644\u0649 \u0623\u064a \u062d\u0627\u0644",
                "Archive Upload": "\u0627\u0644\u062a\u062d\u0645\u064a\u0644 \u0644\u0644\u0627\u0631\u0634\u064a\u0641",
                "Image Information": "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646 \u0627\u0644\u0635\u0648\u0631\u0629",
                "What is the image showing?": "\u0645\u0627\u0630\u0627 \u062a\u0638\u0647\u0631 \u0627\u0644\u0635\u0648\u0631\u0629\u061f",
                "What year was the image taken?": "\u0641\u064a \u0623\u064a \u0633\u0646\u0629 \u0627\u0644\u062a\u0642\u0637\u062a \u0627\u0644\u0635\u0648\u0631\u0629\u061f",
                "Shop Discipline": "\u062a\u062e\u0635\u0635 \u0627\u0644\u0645\u062d\u0644",
                "Please specify other discipline": "\u064a\u0631\u062c\u0649 \u062a\u062d\u062f\u064a\u062f \u062a\u062e\u0635\u0635 \u0622\u062e\u0631",
                "Shop Address": "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u062d\u0644",
                "Shop Location": "\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u062d\u0644",
                "Shop Operation Status": "\u062d\u0627\u0644\u0629 \u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0645\u062d\u0644",
                "Contact Information": "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644",
                "Architectural": "\u0645\u0639\u0645\u0627\u0631\u064a",
                "Cuisine": "\u0637\u0628\u064a\u062e",
                "Decorative": "\u0632\u062e\u0631\u0641\u064a",
                "Fashion": "\u0645\u0648\u0636\u0629",
                "Functional": "\u0639\u0645\u0644\u064a",
                "Furniture": "\u0623\u062b\u0627\u062b",
                "Textiles": "\u0645\u0646\u0633\u0648\u062c\u0627\u062a",
                "Brass": "\u0646\u062d\u0627\u0633 \u0627\u0635\u0641\u0631",
                "Ceramics": "\u062e\u0632\u0641",
                "Copper": "\u0646\u062d\u0627\u0633",
                "Embroidery": "\u062a\u0637\u0631\u064a\u0632",
                "Food": "\u0637\u0639\u0627\u0645",
                "Glass": "\u0632\u062c\u0627\u062c",
                "Jewelry": "\u0627\u0644\u0645\u062c\u0648\u0647\u0631\u0627\u062a",
                "Leather": "\u062c\u0644\u062f",
                "Metalwork": "\u0623\u0639\u0645\u0627\u0644 \u0645\u0639\u062f\u0646\u064a\u0629",
                "Marquetry": "\u0645\u0627\u0631\u0643\u062a\u0631\u064a",
                "Sculpture": "\u0627\u0644\u0646\u062d\u062a",
                "Shoemaker": "\u0627\u0644\u0627\u062d\u0630\u064a\u0647",
                "Soap": "\u0635\u0627\u0628\u0648\u0646",
                "Tailor": "\u062e\u064a\u0627\u0637",
                "Tapestry": "\u0646\u0633\u064a\u062c",
                "Upholstery": "\u0627\u0644\u0645\u0641\u0631\u0648\u0634\u0627\u062a",
                "Wickerwork": "\u0627\u0644\u062e\u064a\u0632\u0631\u0627\u0646",
                "Woodwork": "\u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062e\u0634\u0628\u064a\u0629",
                "Other": "\u0622\u062e\u0631",
                "Open": "\u0641\u062a\u062d",
                "Temporarily Closed": "\u0645\u063a\u0644\u0642 \u0645\u0624\u0642\u062a\u0627",
                "Permanently Closed": "\u0645\u063a\u0644\u0642 \u0628\u0634\u0643\u0644 \u062f\u0627\u0626\u0645",
                "Yes": "\u0646\u0639\u0645",
                "No": "\u0643\u0644\u0627 ",
                "Filter Component (Explore and Discover Page)": "",
                "Filter By": "\u0627\u0644\u062a\u0635\u0646\u064a\u0641 \u062d\u0633\u0628",
                "Enter Shop Name": "\u0623\u062f\u062e\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u062d\u0644",
                "Year Range": "\u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0633\u0646\u0648\u064a",
                "Only Show Active Businesses": "\u0639\u0631\u0636 \u0627\u0644\u062a\u062c\u0627\u0631\u0627\u062a \u0627\u0644\u0646\u0634\u0637\u0629 \u0641\u0642\u0637",
                "Reset Filters": "\u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0627\u0644\u062a\u0635\u0646\u064a\u0641\u0627\u062a ",
                "Map Layer Filter": "\u062a\u0635\u0646\u064a\u0641 \u0627\u0644\u062e\u0631\u064a\u0637\u0629",
                "Historical Maps": "\u0627\u0644\u062e\u0631\u0627\u0626\u0637 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629",
                "Reset Maps": "\u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0627\u0644\u062e\u0631\u0627\u0626\u0637",
                "Map Card": "\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062e\u0631\u064a\u0637\u0629",
                "Handbags": "\u062d\u0642\u0627\u0626\u0628 \u0627\u0644\u064a\u062f",
                "Wigs": "\u0634\u0639\u0631 \u0645\u0633\u062a\u0639\u0627\u0631",
                "Circus Props": "\u062f\u0639\u0627\u0626\u0645 \u0627\u0644\u0633\u064a\u0631\u0643",
                "Antiques": "\u0627\u0644\u062a\u062d\u0641",
                "Printing Press": "\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0635\u062d\u064a\u0641\u0647",
                "Lamp Design and Creation": "\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0645\u0635\u0628\u0627\u062d \u0648\u062e\u0644\u0642\u0647",
                "Carpentry": "\u0646\u062c\u0627\u0631\u0629",
                "Fabric Reseller": "\u0628\u0627\u0626\u0639 \u0623\u0642\u0645\u0634\u0629",
                "Printing and Binding": "\u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0648\u0627\u0644\u062a\u062c\u0644\u064a\u062f",
                "Chocolate": "\u0634\u0648\u0643\u0648\u0644\u0627",
                "Block Printing": "\u0637\u0628\u0627\u0639\u0629 \u0628\u0627\u0644\u062e\u0634\u0628",
                "Artisanal bread": "\u0627\u0644\u062e\u0628\u0632 \u0627\u0644\u062d\u0631\u0641\u064a",
                "Chrome Plating": "\u062a\u0635\u0641\u064a\u062d \u0627\u0644\u0643\u0631\u0648\u0645",
                "Silkscreen Painting": "\u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0628\u0627\u0644\u0634\u0627\u0634\u0629 \u0627\u0644\u062d\u0631\u064a\u0631\u064a\u0629",
                "Aluminum": "\u0627\u0644\u0623\u0644\u0648\u0645\u0646\u064a\u0648\u0645",
                "Art gallery and printing press": "\u0645\u0639\u0631\u0636 \u0627\u0644\u0641\u0646\u0648\u0646 \u0648\u0627\u0644\u0645\u0637\u0628\u0639\u0629",
                "Plastic recycling and resin": "\u0625\u0639\u0627\u062f\u0629 \u062a\u062f\u0648\u064a\u0631 \u0627\u0644\u0628\u0644\u0627\u0633\u062a\u064a\u0643 \u0648\u0627\u0644\u0631\u0627\u062a\u0646\u062c",
                "Plexiglass": "\u0632\u062c\u0627\u062c \u0639\u0636\u0648\u064a",
                "Stainless, silver, stones, porcelain, paintings, antiques maker and repair": "\u0627\u0644\u0627\u0633\u062a\u0627\u0646\u0644\u0633 \u0648\u0627\u0644\u0641\u0636\u0629 \u0648\u0627\u0644\u0623\u062d\u062c\u0627\u0631 \u0648\u0627\u0644\u0628\u0648\u0631\u0633\u0644\u064a\u0646 \u0648\u0627\u0644\u0644\u0648\u062d\u0627\u062a \u0648\u0635\u0627\u0646\u0639 \u0627\u0644\u062a\u062d\u0641 \u0648\u062a\u0635\u0644\u064a\u062d\u0647\u0627",
                "Watchmaking": "\u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0633\u0627\u0639\u0627\u062a",
                "Fashion Design": "\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0623\u0632\u064a\u0627\u0621",
                "Vintage Furniture": "\u0623\u062b\u0627\u062b \u0639\u062a\u064a\u0642",
                "Curtains": "\u0633\u062a\u0627\u0626\u0631",
                "Printing": "\u0637\u0628\u0627\u0639\u0629",
                "Repair": "\u062a\u0635\u0644\u064a\u062d ",
                "Mourakbati of stones": "",
                "Perfumery": "\u0627\u0644\u0639\u0637\u0648\u0631",
                "Jewelry base piece design": "\u062a\u0635\u0645\u064a\u0645 \u0642\u0637\u0639\u0629 \u0645\u062c\u0648\u0647\u0631\u0627\u062a \u0623\u0633\u0627\u0633\u064a\u0629",
                "Shoe repair only": "\u062a\u0635\u0644\u064a\u062d \u0627\u0644\u0623\u062d\u0630\u064a\u0629 \u0641\u0642\u0637",
                "Painting and repair": "\u0627\u0644\u0637\u0644\u0627\u0621 \u0648\u0627\u0644\u0625\u0635\u0644\u0627\u062d",
                "Stainless Steel": "\u0633\u062a\u0627\u0646\u0644\u0633 \u0633\u062a\u064a\u0644",
                "Book binding": "\u062a\u062c\u0644\u064a\u062f \u0627\u0644\u0643\u062a\u0628",
                "Antique watch repair and restoration": "\u0625\u0635\u0644\u0627\u062d \u0648\u062a\u0631\u0645\u064a\u0645 \u0627\u0644\u0633\u0627\u0639\u0627\u062a \u0627\u0644\u0639\u062a\u064a\u0642\u0629",
                "Lamp design and creation": "\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0645\u0635\u0628\u0627\u062d \u0648\u062e\u0644\u0642\u0647",
                "Mens suits fashion design": "\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0623\u0632\u064a\u0627\u0621 \u0644\u0644\u0631\u062c\u0627\u0644",
                "Painting frames": "\u0637\u0644\u0627\u0621 \u0627\u0644\u0625\u0637\u0627\u0631\u0627\u062a",
                "Chandelier making and repair": "\u0635\u0646\u0639 \u0627\u0644\u062b\u0631\u064a\u0627 \u0648\u0625\u0635\u0644\u0627\u062d\u0647\u0627",
                "Gunsmith": "\u0635\u0627\u0646\u0639 \u0627\u0644\u0623\u0633\u0644\u062d\u0629",
                "pipe maker": "\u0635\u0627\u0646\u0639 \u0627\u0644\u0623\u0646\u0627\u0628\u064a\u0628",
                "Fabric reseller": "\u0628\u0627\u0626\u0639 \u0623\u0642\u0645\u0634\u0629",
                "Upcycling": "\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u062f\u0648\u064a\u0631",
                "Calligraphy": "\u0641\u0646 \u0627\u0644\u062e\u0637",
                "Bronze, marble, granite sculpture": "\u0646\u062d\u062a \u0645\u0646 \u0627\u0644\u0628\u0631\u0648\u0646\u0632 \u0648\u0627\u0644\u0631\u062e\u0627\u0645 \u0648\u0627\u0644\u062c\u0631\u0627\u0646\u064a\u062a",
                "Belts, zippers, buttons, wallets": "\u0623\u062d\u0632\u0645\u0629 \u060c \u0633\u062d\u0627\u0628\u0627\u062a \u060c \u0623\u0632\u0631\u0627\u0631 \u060c \u0645\u062d\u0627\u0641\u0638",
                "Mechanic": "\u0645\u064a\u0643\u0627\u0646\u064a\u0643\u064a",
                "Mold Maker": "\u0635\u0627\u0646\u0639 \u0627\u0644\u0642\u0648\u0627\u0644\u0628",
                "Womens shoemaker and repair": "\u0635\u0627\u0646\u0639 \u0627\u0644\u0623\u062d\u0630\u064a\u0629 \u0627\u0644\u0646\u0633\u0627\u0626\u064a\u0629 \u0648 \u0645\u0635\u0644\u062d\u0647\u0627",
                "Explore Similar Shops": "\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u062d\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0627\u0628\u0647\u0629",
                "Image Captions": "\u062a\u0639\u0644\u064a\u0642\u0627\u062a \u0644\u0644\u0635\u0648\u0631\u0629",
                "Captured": "\u0627\u0644\u062a\u0642\u0637\u062a",
                "Established": "\u0623\u0646\u0634\u0626\u062a",
                "Beirut Central District": "\u0648\u0633\u0637 \u0628\u064a\u0631\u0648\u062a",
                "Medawar": "\u0645\u062f\u0648\u0631",
                "Minet el-Hosn": "\u0645\u064a\u0646\u0627 \u0627\u0644\u062d\u0635\u0646",
                "Marfaa": "\u0645\u0631\u0641\u0623",
                "Ain El-Mreisseh": "\u0639\u064a\u0646 \u0627\u0644\u0645\u0631\u064a\u0633\u0647",
                "Ras Beyrouth": "\u0631\u0627\u0633 \u0628\u064a\u0631\u0648\u062a",
                "Zoukak el-Blatt": "\u0632\u0642\u0627\u0642 \u0627\u0644\u0628\u0644\u0627\u0637",
                "Saifeh": "\u0635\u064a\u0641\u064a",
                "Remeil": "\u0631\u0645\u064a\u0644",
                "Moussaytbeh": "\u0645\u0635\u064a\u0637\u0628\u0629",
                "Bachoura": "\u0628\u0627\u0634\u0648\u0631\u0629",
                "Achrafieh": "\u0627\u0644\u0627\u0634\u0631\u0641\u064a\u0629",
                "Mazraa": "\u0645\u0632\u0631\u0639\u0629",
                "Bourj Hammoud": "\u0628\u0631\u062c \u062d\u0645\u0651\u0648\u062f",
                "Baouchriyeh": "\u0628\u0648\u0634\u0631\u064a\u0629",
                "Dekouaneh": "\u062f\u0643\u0648\u0627\u0646\u0629",
                "Sinn El-Fil": "\u0633\u0646 \u0627\u0644\u0641\u064a\u0644",
                "Mar Maroun": "\u0645\u0627\u0631 \u0645\u0627\u0631\u0648\u0646",
                "Kreitem": "\u0642\u0631\u064a\u0637\u0645",
                "Sanayeh": "\u0635\u0646\u0627\u064a\u0639",
                "Snoubra": "\u0635\u0646\u0648\u0628\u0631\u0629",
                "Mar Nkoula": "\u0645\u0627\u0631 \u0646\u064a\u0642\u0648\u0644\u0627",
                "Tallet Druze": "\u062a\u0644\u0629 \u0627\u0644\u062f\u0631\u0648\u0632",
                "Patriarcat": "\u0627\u0644\u0628\u0637\u0631\u0643\u064a\u0629",
                "Ghabi": "\u0627\u0644\u063a\u0627\u0628\u064a",
                "Furn El Hayek": "\u0641\u0631\u0646 \u0627\u0644\u062d\u0627\u064a\u0643",
                "Yessouiyeh": "\u064a\u0627\u0633\u0648\u0639\u064a\u0629",
                "Raoucheh": "\u0631\u0648\u0634\u0647",
                "Mar Mitr": "\u0645\u0627\u0631 \u0645\u062a\u0631",
                "Basta El-Tahta": "\u0628\u0633\u0637\u0629 \u0627\u0644\u062a\u062d\u062a\u0627",
                "Moussaitbe": "\u0645\u0635\u064a\u0637\u0628\u0647",
                "Dar El-Fatwa": "\u062f\u0627\u0631 \u0627\u0644\u0641\u062a\u0648\u0649",
                "Ain El Tine": "\u0639\u064a\u0646 \u0627\u0644\u062a\u064a\u0646\u0647",
                "Achrafiye": "\u0627\u0634\u0631\u0641\u064a\u0629",
                "Nasra": "\u0646\u0635\u0631\u0629",
                "Bourj Abi Haidar": "\u0628\u0631\u062c \u0627\u0628\u064a \u062d\u064a\u062f\u0631",
                "Basta Faouka": "\u0628\u0633\u0637\u0629 \u0627\u0644\u0641\u0648\u0642\u0627",
                "UNESCO": "\u064a\u0648\u0646\u0633\u0643\u0648",
                "Mar Mikhael": "\u0645\u0627\u0631 \u0645\u064a\u062e\u0627\u064a\u0644",
                "Jamia": "",
                "Ras Beirut": "\u0631\u0627\u0633 \u0628\u064a\u0631\u0648\u062a",
                "Ain Mreisse": "\u0639\u064a\u0646 \u0627\u0644\u0645\u0631\u064a\u0633\u064a",
                "Khodr": "\u062e\u0636\u0631",
                "Jisr": "\u0627\u0644\u062c\u0633\u0631",
                "Hamra": "\u062d\u0645\u0631\u0627",
                "Jounblat": "\u062c\u0646\u0628\u0644\u0627\u0637",
                "Manara": "\u0645\u0646\u0627\u0631\u0629",
                "Kantari": "\u0642\u0646\u0637\u0627\u0631\u064a",
                "Bab Idriss": "\u0628\u0627\u0628 \u0625\u062f\u0631\u064a\u0633",
                "Nejmeh": "\u0646\u062c\u0645\u0647",
                "Serail": "\u0627\u0644\u0633\u0631\u0627\u064a",
                "Gemmayzeh": "\u062c\u0645\u064a\u0632\u0647",
                "Geitawi": "\u062c\u0639\u064a\u062a\u0627\u0648\u064a",
                "Hop. Orthodoxe": "",
                "Qobaiyat": "\u0627\u0644\u0642\u0628\u064a\u0627\u062a",
                "Al Hikma": "\u0627\u0644\u062d\u0643\u0645\u0647",
                "El Zarif": "\u0627\u0644\u0638\u0631\u064a\u0641",
                "Ras El Nabaa": "\u0631\u0627\u0633 \u0627\u0644\u0646\u0628\u0639",
                "Sioufi": "\u0633\u064a\u0648\u0641\u064a",
                "Tallet El-Khayat": "\u062a\u0644\u0629 \u0627\u0644\u062e\u064a\u0627\u0637",
                "El Aamiliye": "\u0627\u0644\u0639\u0627\u0645\u0644\u064a\u0647",
                "Hotel Dieu": "\u0627\u0648\u062a\u0644 \u062f\u064a\u0648",
                "Wata": "\u0648\u0637\u0649",
                "Mar Elias": "\u0645\u0627\u0631 \u0625\u0644\u064a\u0627\u0633",
                "Malaab": "\u0627\u0644\u0645\u0644\u0639\u0628",
                "Parc": "",
                "El Horsh": "\u0627\u0644\u062d\u0631\u0634",
                "Tariq El-Jdideh": "\u0637\u0631\u064a\u0642 \u0627\u0644\u062c\u062f\u064a\u062f\u0629",
                "Minet El Hosn": "\u0645\u064a\u0646\u0629 \u0627\u0644\u062d\u0635\u0646",
                "Majidiye": "\u0645\u062c\u064a\u062f\u064a\u0629",
                "Corniche El-Nahr": "\u0643\u0648\u0631\u0646\u064a\u0634 \u0627\u0644\u0646\u0647\u0631",
                "Palais De Justice": "\u0642\u0635\u0631 \u0627\u0644\u0639\u062f\u0644",
                "Shati' Al Bahri": "\u0634\u0627\u0637\u0626 \u0627\u0644\u0628\u062d\u0631\u064a",
                "Dora": "\u0627\u0644\u062f\u0648\u0631\u0629",
                "Maritime Domain": "",
                "Haret Sader ": "\u062d\u0627\u0631\u0629 \u0635\u062f\u0631",
                "Nor Adana": "\u0646\u0648\u0631 \u0627\u0636\u0646\u0629",
                "Ghilane": "\u0627\u0644\u063a\u064a\u0644\u0627\u0646",
                "Nor Sis": "\u0646\u0648\u0631 \u0633\u064a\u0633",
                "Nabaa": "\u0627\u0644\u0646\u0628\u0639\u0629",
                "Mar Doumit": "\u0645\u0627\u0631 \u062f\u0648\u0645\u064a\u062a",
                "Nor Marash": "\u0646\u0648\u0631 \u0645\u0631\u0627\u0634"
            }
        }
    },
    "lng": "ar",
    "fallbackLng": "en",
    "interpolation": {
        "escapeValue": "false"
    }
}


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
  TRANSLATIONS,
  convertWorkshopContributionToSchema,
  convertArchiveContributionToSchema,
  isImage,
  generateId,
  get_distance_between_points,
  isProperlyTruthy,
};
