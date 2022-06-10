#!/usr/bin/env node

const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config(); // allows for access to dotenv file
const ImageMetaSchema = require('../models/ImageMeta');
const ImageDataSchema = require('../models/ImageData');
const ImageDataOriginalSchema = require('../models/ImageDataOriginal');
const ImageDataThumbnailSchema = require('../models/ImageDataThumbnail');
const getImageCompressions = require('../lib/getImageCompressions');

const DEBUG_ID = '138936398_1';

/**
 * script to pull each of the imagemetas and respective imagedataBackups from MongoDB and essentially
 * repopulate imagedatas, imagedataoriginals, imagedatathumbnails with the correctly processed images
 */

const args = process.argv.slice(2);

// Check for the -h/--help flag
if (args.includes('--help') || args.includes('-h')) {
  console.log(
    'Usage: node scripts/reprocess-db-images.js [--help|-h] [-o|--overwrite] [-v|--verbose]'
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
    \tusing the function defined within the script itself.`
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

  if (verbose) console.log(`(VERBOSE) First document: ${imageMetas[0]}`);

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
  debugger;

  // console.log(imgDataOrig);
  // imgDataOrig.data = imgDataOrig.data.split(',').pop();
  // imgDataOrig.data = Buffer.from(imgDataOrig.data, 'base64');

  // INFO: Save original image
  const newImageDataOriginal = new ImageDataOriginalSchema(imgDataOrig);
  newImageDataOriginal._id = imgDataOrig._id;
  newImageDataOriginal.filename = `${imgDataOrig.img_id}_original.${
    imgDataOrig.filename.split('.')[1]
  }`;
  newImageDataOriginal.from_survey = imgMeta.from_survey;
  newImageDataOriginal.isNew = true;
  debugger;
  const resOrig = await newImageDataOriginal.save();

  // INFO: Get compressions
  const { imageBuffer, imageBufferThumbnail } = await getImageCompressions(
    imgDataOrig.data,
    true
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
  // await ImageDataSchema.findOneAndReplace({img_id: })

  debugger;

  // INFO: Save thumbnail picture
  let imgDataThumbnail = imgDataOrig;
  imgDataThumbnail.filename = `${imgDataOrig.img_id}_thumbnail.jpeg`;
  imgDataThumbnail.data = imageBufferThumbnail;
  const newImageThumbnail = new ImageDataThumbnailSchema(imgDataThumbnail);
  newImageThumbnail.from_survey = imgMeta.from_survey;
  newImageThumbnail._id = imgDataOrig._id;
  newImageThumbnail.isNew = true;
  const resThumbnail = await newImageThumbnail.save();

  debugger;

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
  const imageMetas = await fetchImageMetas(DEBUG_ID);

  // Perform uploads + compression for each corresponding imagedata
  console.log(`> Fetching corresponding imageDatas...`);
  let imageDatasUploaded = 0;
  let imageData = null;
  for (const imageMeta of [imageMetas[0]]) {
    if (verbose && imageDatasUploaded == 0)
      console.log(`(VERBOSE) Printing results of first imagedata:`);
    if (verbose && imageDatasUploaded == 0)
      console.log(`(VERBOSE) ${JSON.stringify(imageMeta)}`);
    imageData = await fetchCorrespondingImageDataBackup(imageMeta);
    if (verbose && imageDatasUploaded == 0) {
      console.log(
        `(VERBOSE) ${JSON.stringify(imageData).substring(0, 500)}...`
      );
      await saveNewImage(imageMeta, imageData);
    }
    imageDatasUploaded++;
  }

  process.exit(0);
};

main();