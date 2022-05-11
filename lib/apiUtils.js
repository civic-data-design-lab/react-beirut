import dbConnect from './dbConnect';
import Workshop from '../models/Workshop';
import { Workshop as WorkshopType } from '../models/Types';

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
