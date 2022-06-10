const Workshop = require('../../../models/Workshop');

export default async(req, res) => {
    const allWorkshops = await Workshop.find({}).lean();
    res.send({ message: 'Workshop data', response: allWorkshops });
};