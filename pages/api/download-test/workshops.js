import { connectToDatabase } from '../../../lib/mongodb';

export default async(req, res) => {
    const { db } = await connectToDatabase();
    console.log('successfully connected to db');

    const workshops = await db
        .collection('workshops')
        .find({})
        .sort({})
        //.limit(20)
        .toArray();

    const getDocuments =
        (db,
            function(docs) {
                //console.log('Closing connection.');
                // client.close();

                // Write to file
                try {
                    fs.writeFileSync('out_file.json', JSON.stringify(docs));
                    console.log('Done writing to file.');
                } catch (err) {
                    console.log('Error writing to file', err);
                }
            });
    res.json(workshops);
    console.log('workshops', workshops);
};