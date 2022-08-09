const fs = require('fs');
const jszip = require('jszip');

import {StatusCodes} from "http-status-codes";

import ImageData from '../../../../models/ImageData';
import dbConnect from "../../../../lib/dbConnect";

export default async (req, res) => {
  await dbConnect();

  let entries = await ImageData.find({}, {filename: 1, data: 1});
  if (!entries) {
    res.status(StatusCodes.NOT_FOUND).send({ message: 'Image Ids not found' });
    return;
  }

  let zip = new jszip();
  let images = zip.folder('images');
  for (const entry of entries) {
    images.file(entry.filename, entry.data, {base64: true});
  }
  zip.generateNodeStream({type: 'nodebuffer', streamFiles: true})
      .pipe(fs.createWriteStream('public/images.zip'))
      .on('finish', () => {
        console.log('finished generating zip')
        res.send({
          message: 'Successfully downloaded images'
        })
      });
};
