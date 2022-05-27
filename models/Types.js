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
 * @typedef {Object} LatLng
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
 * @property {LatLng} geo - The actual lat/lng location
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


//------------
// STORED DATA
//------------

/**
 * @typedef {Object} Workshop
 *
 * Defines a workshop object.
 * 
 * Primary API endpoint: https://cddl-beirut.herokuapp.com/api/workshops
 * 
 * Workshop objects contain information about craft workshops in Beirut. The
 * primary attributes are the workshop/owner name (`shop_name`,
 * `shop_owner_name`), the location (`location`), and the craft disciplines
 * (`craft_discipline*`).
 * 
 * Workshops also have images associated with them with even more information such
 * as image captions, image type, and keywords; these are given by the `images`
 * field which is an array of image IDs that can be mapped to image metadata
 * objects (see `ImageMeta`).
 *
 * @property {string} ID - The workshop ID (from the "workshops" Kobo survey)
 * @property {string} ID_craftspeople - The workshop ID (from "craftspeople"
 *    Kobo survey)
 * @property {Multilanguage} shop_name - The name of the workshop
 * @property {string} shop_owner_name - The name of the workshop owner
 * @property {number} year_established - The year the workshop was established
 * @property {number[]} decade_established - The decade the range the workshop
 *    was established in. If a single year is given in decade `x`, the decade
 *    range is `[x, x]`
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
 * 
 * Primary API endpoint: https://cddl-beirut.herokuapp.com/api/archive
 * 
 * Each archive information object contains information about a response from
 * the archive survey. For responses with visual content, more information such
 * as the image caption, type, and keywords are provided in the associated image
 * metadata objects, given by the `images` field. See `ImageMeta` for more
 * details on this. 
 *
 * @property {string} ID - The archive information ID (from the "archive" Kobo survey)
 * @property {string} info_type - The type of information (e.g. "visual")
 * @property {boolean} is_series - Whether or not this archive information is a
 *    series piece. That is, if it contains either more than one image at different
 *    locations or time.
 * @property {string} is_duplicate_of - The ID of the archive information object
 *    this entry is a duplicate of. Some archive information objects are
 *    referencing the exact same shop name, but in different records.
 * @property {Multilanguage} shop_name - The name of the associated workshop
 * @property {Multilanguage} owner_name - The name of the owner of the workshop
 * @property {string[]} craft_discipline_category - The overarching category/categories
 * @property {string[]} craft_discipline - The specific craft discipline(s) for
 *    the workshop or archive piece
 * @property {string} craft_discipline_other - Other craft discipline
 * @property {Reference} reference - The reference information for this archive
 * @property {number} primary_year - The specific year for this info, must be a single year
 * @property {number[]} primary_decade - The decade or range of decades
 *    this archive object is from (a single decade `x` is represented by `(x, x)`)
 * @property {Location} primary_location - The primary location of this archive.
 *    Series information could have multiple locations but may want to be grouped
 *    into a single point for the map
 * @property {Multilanguage} primary_address - The primary address of this archive
 * @property {string} primary_historic_map - The historic map associated with
 *    the primary location of this archive. Stored as a link to the map on Kobo.
 * @property {string} thumb_img_id - The ID of the image in `images` used as a thumbnail
 * @property {string[]} images - The IDs of the images associated with this archive
 */

/**
 * @typedef {Object} ImageMeta
 *
 * Defines an image metadata object.
 * 
 * Primary API endpoint: https://cddl-beirut.herokuapp.com/api/images
 * 
 * Image metadata contains information about specific images from either
 * workshops or archive information, or can be generic images. Image metadata is
 * tied to images from a survey response by the `response_id` field. Survey
 * response objects (`Workshop`, `ArchiveObject`) contain pointers to image
 * metadata objects by the IDs (the `img_id` here) in `images` field. 
 *
 * @property {string} img_id - The image ID
 * @property {string} response_id - What response the image is tied to
 * @property {string} from_survey - What survey the image is from (e.g. "archival_info")
 * @property {boolean} is_thumbnail - Whether or not, among a set of other
 *    images, this image can be considered a thumbnail. Usually true for the best
 *    looking images.
 * @property {string[]} type - The image type(s), what it is showing.
 * @property {string[]} craft_category - The overarching craft
 *    category/categories shown in this image
 * @property {string[]} craft_type - The specific craft type(s) shown in this image
 * @property {string[]} keywords - The keywords associated with this image
 * @property {boolean} is_series - Whether or not this image is part of a series
 * @property {number} series_idx - The index of this image in the series,
 *    specifies the order among other images. Note that multiple images from one
 *    response may have the same index. 
 * @property {Location} location - The image location  
 * @property {number} year_taken - The specific year the image was taken
 * @property {number | number[]} decade_taken - The decade or range of decades
 *    this image was taken in
 * @property {string} historic_map - The historic map associated with this
 *    image, stored as a URL to the map on Kobo.
 * @property {string} caption - The caption for this image
 * @property {string} src - URL to the image (e.g. `/api/images/<img_id>.jpg`)
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
