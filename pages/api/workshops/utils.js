import dbConnect from '../../../lib/dbConnect';
import Workshop from '../../../models/Workshop';

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
