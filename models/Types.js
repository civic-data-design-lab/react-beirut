/**
 * Module outlining the different types used throughout the project.
 */

/**
 * @typedef {Object} Multilanguage
 *
 * A multilanguage field is a string field that has been translated into
 * multiple languages either by the survey collectors or during the data
 * cleaning process.
 *
 * @property {string} content - The field content in English if possible
 * @property {string} content_orig - The field content in the original language
 * @property {string} content_orig_lang - The original language ISO code
 * @property {string} content_ar - The field content in Arabic if possible
 */

/**
 * @typedef {Object} Reference
 *
 * A reference field contains information about the object that it is attached
 * to. For example, archive information pieces may have a reference indicating
 * that it was taken from a library or museum.
 *
 * @property {string} name - Name of reference source
 * @property {string} ref_type - Type of reference source ('ref'-prefixed to
 *    prevent conflicts with MongoDB)
 * @property {string} type_other - Other source type
 * @property {string} location - Where this reference was found
 * @property {string} catalog - Catalog ID used to find this reference if from a
 *    library or archive
 * @property {string} link - Link to the reference if it available (for digital
 *    sources)
 * @property {string} keywords - Keywords for this reference, space/comma separated
 * @property {string} citation - Reference source citation (if possible includes
 *    the author, title, publisher, publication location, and date - with
 *    month/day/year - of publication
 * @property {string} year - Year of publication for text sources
 * @property {string} copyright - Copyright details
 * @property {string} scan - Image name of scanned reference
 */

/**
 * @typedef {Object} LngLat
 *
 * Basic latitude (`lat`) and longitude (`lng`) coordinates.
 *
 * @property {number} lat
 * @property {number} lng
 */


/**
 * @typedef {Object} Location
 * 
 * A location field contains the geolocation of a datapoint as well as an
 * address and additional location information.
 * 
 * @property {LngLat} geolocation - The actual lat/lng location
 * @property {Multilanguage} address - The address as a string,
 *    if available. This may be provided in mutliple languages.
 * @property {string} adm1 - The first administrative level, the
 *    governorate/Muhafazah (e.g. "Beirut" or "Mount Lebanon")
 * @property {string} adm2 - The second administrative level, the
 *    district/Qada’a (e.g. "Beirut" or "El Meten")
 * @property {string} adm3 - The third administrative level, the quarter (e.g. "Ras Beyrouth")
 * @property {string} adm4 - The fourth administrative level, the zone/sector
 *    (e.g. Hamra)
 */


/**
 * @typedef {Object} Workshop
 *
 * Defines a workshop object.
 *
 * @property {string} ID - The workshop ID (from the "workshops" Kobo survey)
 * @property {string} ID_craftspeople - The workshop ID (from "craftspeople"
 *    Kobo survey)
 * @property {Multilanguage} shop_name - The name of the workshop
 * @property {string} shop_owner_name - The name of the workshop owner
 * @property {number} year_established - The year the workshop was established
 * @property {string[]} craft_discipline_category - The overarching
 *    category/categories of crafts this workshop produces
 * @property {string[]} craft_discipline - The specific craft discipline(s) for
 *    this workshop
 * @property {string} craft_discipline_other - Other craft discipline
 * @property {Location} location - The location of the workshop
 * @property {string} shop_status - The status of the workshop (e.g. "open")
 * @property {Boolean} produced_here - Whether the workshop produces its crafts
 *    at this location or not
 * @property {string} data_collection_comments - Any additional comments about
 *    the workshop from data collection
 * @property {string} survey_origin - The original survey this workshop was
 *    found in
 * @property {string} thumb_img_id - The ID of the image used as a thumbnail
 * @property {string[]} images - The IDs of the images associated with this workshop
 */

/**
 * @typedef {Object} ArchiveObject
 *
 * Defines an archive information object.
 * TODO: Describe fields
 *
 * @property {string} ID
 * @property {string} info_type
 * @property {boolean} is_series
 * @property {Multilanguage} shop_name
 * @property {Multilanguage} owner_name
 * @property {string[]} craft_discipline_category
 * @property {string[]} craft_discipline
 * @property {string} craft_discipline_other
 * @property {Reference} reference
 * @property {number | number[]} primary_year
 * @property {Location} primary_location
 * @property {Multilanguage} primary_address:
 * @property {string} primary_sector
 * @property {string} primary_historic_map
 * @property {string} thumb_img_id
 * @property {string[]} images
 */

/**
 * @typedef {Object} ImageMeta
 *
 * Defines an image metadata object.
 * TODO: Describe fields
 *
 * @property {string} img_id
 * @property {string} response_id
 * @property {string} from_survey
 * @property {boolean} is_thumbnail
 * @property {string[]} type
 * @property {string[]} craft_category
 * @property {string[]} craft_type
 * @property {string[]} keywords
 * @property {boolean} is_series
 * @property {number} series_idx
 * @property {Location} location
 * @property {number | number[]} year_taken
 * @property {string} historic_map
 * @property {string} caption
 * @property {string} src - URL to the image
 */

/**
 * @typedef {Object} ImageData
 *
 * Defines the image data object. An image data object simply contains the
 * image data in the form of a binary buffer.
 *
 * @property {string} img_id - The image ID this image is associated with
 * @property {string} filename - The full file name with the extension
 * @property {Buffer} data
 *
 */

module.exports = {};
