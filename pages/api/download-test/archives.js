import { connectToDatabase } from '../../../lib/mongodb';

export default async(req, res) => {
    const { db } = await connectToDatabase();
    console.log('successfully connected to db');

    const archives = await db
        .collection('archives')
        .find({}) //to specify criteria here
        .sort({})
        // .limit(20) //to specify criteria here
        .toArray();

    const getDocuments =
        (db,
            function(docs) {
                //console.log('Closing connection.');
                // client.close();

                // Write to file
                try {
                    fs.writeFileSync(
                        '../../../public/out_archives_file.json',
                        JSON.stringify(docs)
                    );
                    console.log('Done writing to file.');
                } catch (err) {
                    console.log('Error writing to file', err);
                }
            });
    console.log(archives);
    res.json(archives);
    // console.log(res);
};