#!/usr/bin/env node

const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config(); // allows for access to dotenv file
const ImageMetaSchema = require('../models/ImageMeta');
const ImageDataSchema = require('../models/ImageData');
const ImageDataOriginalSchema = require('../models/ImageDataOriginal');
const ImageDataThumbnailSchema = require('../models/ImageDataThumbnail');
const getImageCompressions = require('../lib/getImageCompressions');

const DEBUG_ID = '138936839_1';
const HOST_URL = 'http://localhost:3000';

/**
 * script to pull each of the imagemetas and respective imagedataBackups from MongoDB and essentially
 * repopulate imagedatas, imagedataoriginals, imagedatathumbnails with the correctly processed images
 */

const args = process.argv.slice(2);

// Check for the -h/--help flag
if (args.includes('--help') || args.includes('-h')) {
  console.log(
    'Usage: node scripts/reprocess-db-images.js [--help|-h] [-v|--verbose]'
  );

  console.log('\nOptions:');
  console.log(
    '\t-o, --overwrite\tCompletely overwrite existing objects. (Does not do anything yet)\n',
    '\t-v, --verbose\tPrint additional information.'
  );

  console.log('\nExamples:');
  console.log('$ node scripts/reprocess-db-images.js -o');
  console.log(
    `\tOverwrites the imagedatas, imagedataoriginals, and imagethumbnails in the database.
    \tusing the function defined within the script itself. Do not use this unless you know
    \thow the script itself works.`
  );

  process.exit(0);
}

// Check for additional options
const overwrite = args.includes('--overwrite') || args.includes('-o');
const verbose = args.includes('--verbose') || args.includes('-v');

const GeneralImageSchema = new mongoose.Schema({
  img_id: String,
  from_survey: String,
  filename: String,
  data: Buffer,
});

const ImageDataBackupSchema = mongoose.model(
  'imagedatabackup',
  GeneralImageSchema
);

const printProgress = (progress) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress);
};

const getTime = () => {
  var currentdate = new Date();
  var datetime =
    +(currentdate.getMonth() + 1) +
    '/' +
    currentdate.getDate() +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    zeroPad(currentdate.getHours(), 2) +
    ':' +
    zeroPad(currentdate.getMinutes(), 2) +
    ':' +
    zeroPad(currentdate.getSeconds(), 2);
  return datetime;
};

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
}

/**
 * Returns all the documents in the imagemetas collection
 *
 * @returns {object[]} imageMetas - List of documents from the imagemetas collection
 */
const fetchImageMetas = async (img_id) => {
  console.log('> Fetching imagemetas...');
  let imageMetas = [];
  if (img_id) {
    imageMetas = [await ImageMetaSchema.findOne({ img_id: img_id })];
  } else {
    imageMetas = await ImageMetaSchema.find({});
  }
  if (!imageMetas.length) {
    console.error('No imagemetas were able to be retrieved.');
    process.exit(1);
  }
  console.log(`Loaded ${imageMetas.length} documents from imagemetas.`);

  if (verbose) console.log(`\t(VERBOSE) First document: ${imageMetas[0]}`);

  return imageMetas;
};

/**
 * Searches the imagedatasBackup collection for the img_id in the provided imagemeta.
 *
 * @param {object} imageMeta
 * @returns {object} imageData
 */
const fetchCorrespondingImageDataBackup = async (imageMeta) => {
  const img_id = imageMeta.img_id;
  const imageData = await ImageDataBackupSchema.findOne({ img_id: img_id });
  if (!imageData) {
    console.warn(`Could not find corresponding imageData for img_id ${img_id}`);
  }
  // change to search backup instead
  return imageData;
};

const saveNewImage = async (imgMeta, imgDataOrig) => {
  // console.log(imgDataOrig);
  // imgDataOrig.data = imgDataOrig.data.split(',').pop();
  // imgDataOrig.data = Buffer.from(imgDataOrig.data, 'base64');

  // INFO: Save original image
  let resOrig = undefined;
  try {
    const newImageDataOriginal = new ImageDataOriginalSchema(imgDataOrig);
    newImageDataOriginal._id = imgDataOrig._id;
    newImageDataOriginal.filename = `${imgDataOrig.img_id}_original.${
      imgDataOrig.filename.split('.')[1]
    }`;
    newImageDataOriginal.from_survey = imgMeta.from_survey;
    newImageDataOriginal.isNew = true;

    resOrig = await newImageDataOriginal.save((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        console.log(
          `\tMongoServerError Code 11000 caught. ${imgDataOrig._id} already exists in database under collection imagedataoriginal.`
        );
      }
    });
  } catch (error) {
    // console.log('TEST');
    // console.error('Likely already one in database');
    // console.error(error);
  }
  if (verbose)
    console.log(
      `\t (VERBOSE) ${HOST_URL}/api/original_images/${
        imgDataOrig.img_id
      }_original.${imgDataOrig.filename.split('.')[1]} should now be online`
    );

  // INFO: Get compressions
  const { imageBuffer, imageBufferThumbnail } = await getImageCompressions(
    imgDataOrig.data
  );
  // INFO: Save regular picture
  // let imgData = imgDataOrig;
  // imgData.filename = `${imgData.img_id}.jpeg`;
  // imgData.data = imageBuffer;
  // const newImageData = new ImageData(imgData);
  // newImageData.from_survey = imgMeta.from_survey;
  // newImageData._id = imgDataOrig._id;
  // newImageData.isNew = true;
  // const res = await newImageData.save();
  await ImageDataSchema.findOneAndReplace(
    { img_id: imgDataOrig.img_id },
    {
      img_id: imgDataOrig.img_id,
      filename: `${imgDataOrig.img_id}.jpeg`,
      from_survey: imgMeta.from_survey,
      data: imageBuffer,
    }
  );
  let res = undefined;
  if (verbose)
    console.log(
      `\t (VERBOSE) ${HOST_URL}/api/images/${imgDataOrig.img_id}.jpeg should now be online`
    );

  let resThumbnail = undefined;
  try {
    // INFO: Save thumbnail picture
    let imgDataThumbnail = imgDataOrig;
    imgDataThumbnail.filename = `${imgDataOrig.img_id}_thumbnail.jpeg`;
    imgDataThumbnail.data = imageBufferThumbnail;
    const newImageThumbnail = new ImageDataThumbnailSchema(imgDataThumbnail);
    newImageThumbnail.from_survey = imgMeta.from_survey;
    newImageThumbnail._id = imgDataOrig._id;
    newImageThumbnail.isNew = true;
    resThumbnail = await newImageThumbnail.save((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        console.log(
          `\tMongoServerError Code 11000 caught. ${imgDataOrig._id} already exists in database under collection imagedatathumbnail.`
        );
      }
    });
  } catch (error) {
    // console.error('Likely already one in database');
    // console.error(error);
  }
  if (verbose)
    console.log(
      `\t (VERBOSE) ${HOST_URL}/api/thumbnail_images/${imgDataOrig.img_id}_thumbnail.jpeg should now be online`
    );

  return { resOrig, res, resThumbnail };
};

// -------------------------
// RUN THE MAIN SCRIPT LOGIC
// -------------------------
const main = async () => {
  console.log('> reprocess-db-images script starting...');

  // Connect to the database
  console.log('> Connecting to database...');
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env'
    );
  }
  conn = mongoose.connect(MONGODB_URI);
  console.log('Successfully connected to database.');

  // Fetch imagemetas
  const imageMetas = await fetchImageMetas();

  // Errored on 473-479 Could not find corresponding imageData for img_id 146736171_ref_location_A or somethign around then.
  // Likely already one in database
  // TypeError: Cannot read properties of null (reading '_id')
  //     at saveNewImage (/Users/hugz/Library/CloudStorage/OneDrive-Personal/Desktop/1.Projects-Halagr/Beirut-UROP/react-beirut/scripts/reprocess-db-images.js:133:44)

  // Errored on 613 - 615 ish? and 782 - 787
  const uploadPast_i = 780;
  // Perform uploads + compression for each corresponding imagedata
  console.log(`> Fetching corresponding imageDatas...`);
  let imageDatasUploaded = 0;
  let imageData = null;
  for (const imageMeta of imageMetas) {
    if (imageDatasUploaded >= uploadPast_i) {
      if (verbose && imageDatasUploaded == 0)
        console.log(`\t(VERBOSE) Printing results of first imagedata:`);
      if (verbose && imageDatasUploaded == 0)
        console.log(`\t(VERBOSE) ${JSON.stringify(imageMeta)}`);
      imageData = await fetchCorrespondingImageDataBackup(imageMeta);
      if (verbose && imageDatasUploaded == 0) {
        console.log(
          `\t(VERBOSE) ${JSON.stringify(imageData).substring(0, 500)}...`
        );
      }
      if (!imageData) {
        console.log(`imageData not found, skipping saving this image.`);
        continue;
      }
      await saveNewImage(imageMeta, imageData);
    }
    imageDatasUploaded++;
    console.log(
      `[${getTime()}] Uploaded ${imageMeta.img_id}: ${imageDatasUploaded}/${
        imageMetas.length
      } images.`
    );
    // if (imageDataUploaded % 10 == 9) {
    //   x = 5;
    // }
  }

  console.log(`reprocess-db-images was successful! 🎉🎉🎉 Have a great day 🤠`);

  process.exit(0);
};

main();
