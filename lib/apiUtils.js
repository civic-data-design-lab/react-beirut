import dbConnect from './dbConnect';
import Workshop from '../models/Workshop';
import ImageMeta from '../models/ImageMeta';
import {
  Workshop as WorkshopType,
  ImageMeta as ImageMetaType,
} from '../models/Types';

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
 * @returns {WorkshopType} - The workshop object
 */
export const getWorkshop = async (id) => {
  await dbConnect();

  const result = await Workshop.findOne({ ID: id });
  return result;
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
 * @returns {ImageMetaType[]} - The image metadata objects
 */
export const getImageMeta = async (id) => {
  await dbConnect();

  const result = await ImageMeta.find({
    $or: [{ img_id: id }, { response_id: id }],
  });
  return result;
};
