import dbConnect from './dbConnect';
import Workshop from '../models/Workshop';
import ImageMeta from '../models/ImageMeta';
import ImageData from '../models/ImageData';
import Archive from '../models/Archive';
import {
  Workshop as WorkshopType,
  ImageMeta as ImageMetaType,
  ArchiveObject as ArchiveType,
  ImageData as ImageDataType,
  LatLng,
} from '../models/Types';
import {
  get_distance_between_points,
  ARCHIVE_CONTRIBUTION_NAME,
  WORKSHOP_CONTRIBUTION_NAME,
} from './utils';
import Sticker from '../models/Sticker';

// --------------
// WORKSHOP UTILS
// --------------

/**
 * Gets all workshops from the database.
 *
 * @returns {WorkshopType[]} - A list of all workshops.
 */
export const getAllWorkshops = async (config) => {
  await dbConnect();

  const result = await Workshop.find({});
  const workshops = result
    .map((doc) => {
      /**
       * @type {WorkshopType}
       */
      const workshop = doc.toObject();
      workshop._id = workshop._id.toString();

      if (config?.idsOnly) {
        return {
          ID: workshop.ID,
        };
      }

      if (config?.lean) {
        const leanWorkshop = {
          ID: workshop.ID,
          shop_name: workshop.shop_name,
          craft_discipline_category: workshop.craft_discipline_category,
          location: {
            geo: workshop.location.geo,
          },
          shop_status: workshop.shop_status,
          decade_established: workshop.decade_established,
          thumb_img_id: workshop.thumb_img_id,
        };
        return leanWorkshop;
      }
      return workshop;
    })
    .filter((workshop) => {
      // Filter out workshops that are not verified.
      return workshop.survey_origin !== WORKSHOP_CONTRIBUTION_NAME;
    });

  return workshops;
};

/**
 * Retrieves a workshop by its `ID` property from the database.
 *
 * @param {string} id - The id of the workshop to retrieve
 * @returns {WorkshopType} The workshop object
 */
export const getWorkshop = async (id) => {
  await dbConnect();

  const doc = await Workshop.findOne({ ID: id });
  const workshop = doc.toObject();
  workshop._id = workshop._id.toString();
  return workshop;
};

/**
 * Saves the given workshop to the database. If `data.imageMetas` is null, does
 * not save it and the image data.
 *
 * @param {{workshop: WorkshopType, imageMetas: ImageMetaType[], imageData:
 *    ImageDataType[]}} data - The workshop data to save, including image meta
 *    and image data.
 * @returns {{workshop: WorkshopType, imageMetas: ImageMetaType[], imageData:
 *    ImageDataType[]}} Returns the saved workshop object and corresponding
 *    image objects if successful, otherwise returns null.
 */
export const saveNewWorkshop = async (data) => {
  await dbConnect();

  let savedWorkshop;
  const savedImageMetas = [];
  const savedImageData = [];
  try {
    // Save the workshop to the database.
    const newWorkshop = new Workshop(data.workshop);
    savedWorkshop = await newWorkshop.save();

    if (data.imageMetas?.length > 0) {
      // Save the image metadata for the workshop.
      for (const imageMeta of data.imageMetas) {
        const newImageMeta = new ImageMeta(imageMeta);
        const res = await newImageMeta.save();
        savedImageMetas.push(res);
      }

      // Save the image data for the workshop.
      for (const imgData of data.imageData) {
        imgData.data = imgData.data.split(',').pop();
        console.log(imgData.data.slice(0, 100));
        imgData.data = Buffer.from(imgData.data, 'base64');
        console.log(imgData.data.slice(0, 100));
        const newImageData = new ImageData(imgData);
        const res = await newImageData.save();
        savedImageData.push(res);
      }
    }
  } catch (err) {
    console.error(err);
    return;
  }

  return {
    workshop: savedWorkshop,
    imageMetas: savedImageMetas,
    imageData: savedImageData,
  };
};



/**
 *
 * @param {WorkshopType} workshop
 */
export const getSimilarWorkshops = async (workshop, config) => {
  await dbConnect();

  const allWorkshops = await getAllWorkshops();
  const thisCraftDisciplineSet = new Set(workshop.craft_discipline);

  // Sort the workshops by distance from the given workshop.
  const similarWorkshops = allWorkshops
    .filter((w) => w.ID !== workshop.ID)
    .map((w) => {
      // Get the intersecting craft disciplines
      const intersect = w.craft_discipline.filter((x) =>
        thisCraftDisciplineSet.has(x)
      ).length;

      const distance = get_distance_between_points(
        workshop.location.geo,
        w.location.geo
      );
      return {
        workshop: w,
        intersect,
        distance,
      };
    })
    .sort((a, b) => {
      // Sort by the number of intersecting craft disciplines in descending order.
      const disciplineComp = b.intersect - a.intersect;
      if (disciplineComp !== 0) {
        return disciplineComp;
      }

      // If same, sort by distance in ascending order.
      return a.distance - b.distance;
    });

  return similarWorkshops.slice(0, config?.count || 6).map((x) => x.workshop);
};

// -----------
// IMAGE UTILS
// -----------

/**
 * Gets the image metadata.
 *
 * Users may provide an image ID (`img_id`), in which case the particular image
 * metadata object is returned, or a survey response ID (`response_id`), in
 * which case all image metadata for that response is returned. In either case,
 * an array of image metadata objects is returned.
 *
 * @param {string} id - The image or response ID
 * @returns {ImageMetaType[]} The image metadata objects
 */
export const getImageMeta = async (id) => {
  await dbConnect();

  const docs = await ImageMeta.find({
    $or: [{ img_id: id }, { response_id: id }],
  });
  const imageMetas = docs.map((doc) => {
    const imageMeta = doc.toObject();
    imageMeta._id = imageMeta._id.toString();
    return imageMeta;
  });

  return imageMetas;
};

// --------------
// ARCHIVE UTILS
// --------------

/**
 * Gets all archive records from the database.
 *
 * @returns {ArchiveType[]} A list of all the archive objects.
 */
export const getAllArchives = async (config) => {
  await dbConnect();

  const result = await Archive.find({});
  const archiveObjs = result
    .map((doc) => {
      /**
       * @type {ArchiveType}
       */
      const archiveObj = doc.toObject();
      archiveObj._id = archiveObj._id.toString();

      if (config?.idsOnly) {
        return {
          ID: archiveObj.ID,
        };
      }

      if (config?.lean) {
        return {
          ID: archiveObj.ID,
          info_type: archiveObj.info_type,
          craft_discipline_category: archiveObj.craft_discipline_category,
          primary_location: {
            geo: archiveObj.primary_location.geo,
          },
          primary_decade: archiveObj.primary_decade,
          thumb_img_id: archiveObj.thumb_img_id,
        };
      }
      return archiveObj;
    })
    .filter((archive) => {
      // Filter out archives that are not verified.
      return archive.info_type !== ARCHIVE_CONTRIBUTION_NAME;
    });

  if (config?.visualOnly) {
    return archiveObjs.filter((obj) => obj.thumb_img_id);
  }

  return archiveObjs;
};

/**
 * Retrieves an archive response by its `ID` property from the database.
 *
 * @param {string} id - The id of the archive object to retrieve
 * @returns {ArchiveType} The archive response object
 */
export const getArchive = async (id) => {
  await dbConnect();

  const result = await Archive.findOne({ ID: id });
  result._id = result._id.toString();
  return result;
};

/**
 * Saves the given archival information to the database along with image
 * metadata and image data. If `data.imageMetas` is null, does not save it nor
 * the image data.
 *
 * @param {{archive: ArchiveType, imageMetas: ImageMetaType[], imageData:
 *    ImageDataType[]}} data - The archive data to save, including image meta
 *    and image data.
 * @returns {{archive: ArchiveType, imageMetas: ImageMetaType[], imageData:
 *    ImageDataType[]}} Returns the saved archive object and corresponding
 *    image objects if successful, otherwise returns null.
 */
export const saveNewArchive = async (data) => {
  await dbConnect();

  let savedArchive;
  const savedImageMetas = [];
  const savedImageData = [];
  try {
    // Save the archive to the database.
    const newArchive = new Archive(data.archive);
    savedArchive = await newArchive.save();

    if (data.imageMetas?.length > 0) {
      // Save the image metadata for the archive
      for (const imageMeta of data.imageMetas) {
        const newImageMeta = new ImageMeta(imageMeta);
        const res = await newImageMeta.save();
        savedImageMetas.push(res);
      }

      // Save the image data for the archive.
      for (const imgData of data.imageData) {
        // Convert image data to a buffer.
        imgData.data = imgData.data.split(',').pop();
        imgData.data = Buffer.from(imgData.data, 'base64');
        const newImageData = new ImageData(imgData);
        const res = await newImageData.save();
        savedImageData.push(res);
      }
    }
  } catch (err) {
    console.error(err);
    return;
  }

  return {
    archive: savedArchive,
    imageMetas: savedImageMetas,
    imageData: savedImageData,
  };
};

// -------------
// STICKER UTILS
// -------------

/**
 * Given the code, returns the sticker data.
 *
 * @param {string} code
 * @returns
 */
export const getStickerData = async (code) => {
  // TODO: Finish implementing this.
  const sticker = await Sticker.findOne({ code });
  if (!sticker) {
    return {
      stickerData: null,
      message: `Sticker with code ${code} not found`,
    };
  }

  // Check if the corresponding archive info is a duplicate.
  const archive = await getArchive(sticker.response_id);
  if (!archive) {
    return {
      stickerData: null,
      message: `No associated archive response found for sticker, looked for ${sticker.response_id}`,
    };
  }

  // Get the associated duplicate response IDs, getting all of the image
  // metadata
  const primary_duplicate = archive.is_duplicate_of;
  const associatedResponseIds = [archive.ID];
  if (primary_duplicate) {
    console.log('Found duplicate', primary_duplicate);
    const associatedArchives = await Archive.find({
      is_duplicate_of: primary_duplicate,
    });
    associatedResponseIds.push(
      ...associatedArchives.filter((a) => a.ID !== archive.ID).map((a) => a.ID)
    );
  }

  console.log('Associated response IDs', associatedResponseIds);
  // Get the image metadata for the sticker across all of the associated
  // responses. Find the oldest image in the responses.
  const archiveImageMetas = await ImageMeta.find({
    response_id: { $in: associatedResponseIds },
  });
  archiveImageMetas.sort((a, b) => {
    return a.decade_taken[0] - b.decade_taken[0];
  });
  const oldestImage = archiveImageMetas[0];

  // Create the final message body using the sticker content
  let body = sticker.content || '';
  body = body.concat('\n See more at https://livingheritage.mit.edu/');

  // Return the sticker data.
  return {
    stickerData: {
      response_id: sticker.response_id,
      code,
      body,
      imageSrc: oldestImage.src,
    },
    message: 'Successfully retrieved sticker data',
  };
};
