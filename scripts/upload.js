const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config(); // allows for access to dotenv file
const ImageSchema = require('../models/Image');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

// TODO: In progress, upload all images and data from the data cleaning to
// MongoDB

conn = mongoose.connect(MONGODB_URI);

const IMAGES_FOLDER = './scripts/data/images';

// https://stackoverflow.com/a/2727191
fs.readdir(IMAGES_FOLDER, (err, files) => {
  files.forEach((filename) => {
    console.log(`Uploading ${filename} to database...`);
    fs.readFile(`${IMAGES_FOLDER}/${filename}`, (err, data) => {
      // data = Buffer.from(file, 'utf-8');
      // console.log(data);
      ImageSchema.findOne({ img_id: filename }, (err, response) => {
        if (response) {
          console.log('> Image already exists in database');
          return;
        }
        const image = new ImageSchema({
          img_id: filename,
          src: data,
        });
        image.save();
        console.log(`> Successfully uploaded ${filename} to database`);
      });
    });
  });
});
