import Workshop from "../../../../models/Workshop";

const fs = require('fs');
const jszip = require('jszip');

import {StatusCodes} from "http-status-codes";
import {getImageMeta} from "../../../../lib/apiUtils";

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
  let a = ["other outdoor space", "storefront", "street view",  "street"]
  for (const entry of entries) {
      let meta = await getImageMeta(entry.filename.split('.')[0]);
      if (meta && meta[0] && meta[0].type) {
          let b = meta[0].type
          const doc = await Workshop.findOne({ID: meta[0].response_id});
          if (!doc) continue;
          let intersect = b.filter(item=>{return a.includes(item.toLowerCase())})
          console.log("b", b)
          console.log("intersect ", intersect)
          if (intersect.length>0) {images.file(entry.filename, entry.data, {base64: true})};
      }
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
