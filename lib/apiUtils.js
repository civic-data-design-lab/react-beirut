import dbConnect from './dbConnect';
import Workshop from '../models/Workshop';
import ImageMeta from '../models/ImageMeta';
import {
  Workshop as WorkshopType,
  ImageMeta as ImageMetaType,
  ArchiveObject as ArchiveType,
} from '../models/Types';
import Archive from '../models/Archive';
import { generateId } from './utils';

/**
 * Gets all workshops from the database.
 *
 * @returns {WorkshopType[]} - A list of all workshops.
 */
export const getAllWorkshops = async () => {
  await dbConnect();

  const result = await Workshop.find({});
  const workshops = result.map((doc) => {
    const workshop = doc.toObject();
    workshop._id = workshop._id.toString();
    return workshop;
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

  const result = await Workshop.findOne({ ID: id });
  return result;
};

/**
 * Saves the given workshop to the database.
 *
 * @param {WorkshopType} workshop - The workshop object to save
 * @returns {WorkshopType | null} Returns the saved workshop object if
 *    successful, otherwise returns null.
 */
export const saveNewWorkshop = async (workshop) => {
  await dbConnect();

  // Generate the new ID for the workshop. Prepend a 'A' to the beginning to
  // indicate that it was created using the API, not via upload.
  const newWorkshopId = generateId();
  workshop.ID = `A${newWorkshopId}`;

  let res;
  try {
    const newWorkshop = new Workshop(workshop);
    res = await newWorkshop.save();
  } catch (err) {
    console.error(err);
    return;
  }

  return res;
};

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

  const result = await ImageMeta.find({
    $or: [{ img_id: id }, { response_id: id }],
  });
  return result;
};

/**
 * Gets all archive records from the database.
 *
 * @returns {ArchiveType[]} A list of all the archive objects.
 */
export const getAllArchives = async () => {
  await dbConnect();

  const result = await Archive.find({});
  const archiveObjs = result.map((doc) => {
    const archiveObj = doc.toObject();
    archiveObj._id = archiveObj._id.toString();
    return archiveObj;
  });

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
  return result;
};

/**
 * Saves the given archival information object to the database.
 *
 * @param {ArchiveType} workshop - The archive object to save
 * @returns {ArchiveType | null} Returns the saved archive object if
 *    successful, otherwise returns null.
 */
export const saveNewArchive = async (archiveObj) => {
  await dbConnect();

  // Generate the new ID for the archive object. Prepend a 'A' to the beginning
  // to indicate that it was created using the API, not via upload.
  const newArchiveObjId = generateId();
  archiveObj.ID = `A${newArchiveObjId}`;

  let res;
  try {
    const newArchiveObj = new Archive(archiveObj);
    res = await newArchiveObj.save();
  } catch (err) {
    console.error(err);
    return;
  }

  return res;
};
