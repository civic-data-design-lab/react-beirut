#!/usr/bin/env node

const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config(); // allows for access to dotenv file
const ImageMetaSchema = require('../models/ImageMeta');
const ImageDataSchema = require('../models/ImageData');
const WorkshopSchema = require('../models/Workshop');

const UPLOAD_TYPES = ['image-data', 'image-meta', 'workshops', 'archive'];

console.log('> Upload script starting...');

const args = process.argv.slice(2);

// Make sure at least one argument is provided
if (args.length === 0) {
  console.log('No arguments provided. Run with --help for usage.');
  process.exit(0);
}

// Check for the -h/--help flag
if (args.includes('--help') || args.includes('-h')) {
  console.log(
    'Usage: npm run upload [--help|-h] [-o|--overwrite] <path> <type>',
  );

  console.log('\nAvailable types:');
  UPLOAD_TYPES.forEach((type) => {
    console.log(`  ${type}`);
  });

  console.log('\nOptions:');
  console.log('\t-o, --overwrite\tOverwrite existing images');

  process.exit(0);
}

// Check for additional options
const overwrite = args.includes('--overwrite') || args.includes('-o');

// Validate the type argument
const type = args.pop();
if (!UPLOAD_TYPES.includes(type)) {
  console.log('Invalid type. Run with --help for usage.');
  process.exit(0);
}
console.log(`You selected "${type}"`);

// Validate the path argument
const path = args.pop();
if (!fs.existsSync(path)) {
  console.log(`Invalid path "${path}". Run with --help for usage.`);
  process.exit(0);
}
console.log(`Path ${path} found.`);

// Connect to the database
console.log('> Connecting to database...');
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env',
  );
}

conn = mongoose.connect(MONGODB_URI);
console.log('Successfully connected to database.');

/**
 * Uploads the workshops given the JSON filepath.
 */
const uploadWorkshops = async () => {
  let data;
  try {
    data = fs.readFileSync(path);
  } catch (err) {
    console.error(err);
    console.error('Could not open the file at the specified path!');
    process.exit(1);
  }

  const jsonObj = JSON.parse(data);
  console.log(`Loaded ${jsonObj.length} workshops from the JSON file.`);

  for (const workshop of jsonObj) {
    console.log(`> Uploading workshop ${workshop.ID}...`);
    const existingWorkshop = await WorkshopSchema.findOne({
      ID: workshop.ID,
    }).exec();
    // console.log(result);
    if (existingWorkshop) {
      if (overwrite) {
        console.log(`\t> Overwriting workshop ${workshop.ID}...`);
        await WorkshopSchema.replaceOne({ ID: workshop.ID }, workshop).exec();
        console.log(`\tSuccessfully overwrote workshop ${workshop.ID}.`);
        continue;
      }
      console.log(
        `Workshop ${workshop.ID} already exists in database. Use -o/--overwrite to overwrite.`,
      );
      continue;
    }

    const newWorkshop = new WorkshopSchema(workshop);
    await newWorkshop.save();
    console.log(`Successfully uploaded workshop ${workshop.ID} to database!`);
  }
  console.log('done');
  process.exit(0);
};

/**
 * Uploads the image files to the database. This simply uploads the image data
 * to the database in the `src` field and does not include any metadata.
 */
const uploadImages = async () => {
  let filenames;
  try {
    // https://stackoverflow.com/a/2727191
    filenames = fs.readdirSync(path);
  } catch (err) {
    console.log('Could not read the directory!');
  }

  for (const filename of filenames) {
    console.log(`> Uploading ${filename} to database...`);
    const data = fs.readFileSync(`${path}/${filename}`);

    // Remove the extension from the filename to get the ID
    const img_id = filename.split('.')[0];

    const existingImage = await ImageDataSchema.findOne({
      img_id,
    }).exec();
    if (existingImage) {
      console.log('Image already exists in database');
      continue;
    }
    const image = new ImageDataSchema({
      img_id,
      filename,
      data,
    });
    await image.save();
    console.log(`Successfully uploaded ${filename} to database`);
  }
  console.log('done');
  process.exit(0);
};

/**
 * Uploads the image metadata files to the database.
 */
const uploadImageMeta = async () => {
  let data;
  try {
    data = fs.readFileSync(path);
  } catch (err) {
    console.error(err);
    console.error('Could not open the file at the specified path!');
    process.exit(1);
  }

  const jsonObj = JSON.parse(data);
  console.log(
    `Loaded ${jsonObj.length} image metadata entries from the JSON file.`,
  );

  for (const imageMeta of jsonObj) {
    // ----------------------------------------
    // Prepare the image meta object for upload
    // ----------------------------------------
    // Convert the `path` field to the `src` field by appending the full URL
    imageMeta.src = `https://cddl-beirut.herokuapp.com/api/images/${imageMeta.path}`;
    // Delete the `path` field (and the name field)
    delete imageMeta.path;
    delete imageMeta.img_name;

    console.log(`> Uploading image-meta ${imageMeta.img_id}...`);
    const existingImageMeta = await ImageMetaSchema.findOne({
      img_id: imageMeta.img_id,
    }).exec();

    if (existingImageMeta) {
      if (overwrite) {
        console.log(
          `\t> Overwriting image-meta ${existingImageMeta.img_id}...`,
        );
        await ImageMetaSchema.replaceOne(
          { img_id: imageMeta.img_id },
          imageMeta,
        ).exec();
        console.log(`\tSuccessfully overwrote image-meta ${imageMeta.img_id}.`);
        continue;
      }
      console.log(
        `Image-meta ${imageMeta.img_id} already exists in database. Use -o/--overwrite to overwrite.`,
      );
      continue;
    }

    const newImageMeta = new ImageMetaSchema(imageMeta);
    await newImageMeta.save();
    console.log(
      `Successfully uploaded image-meta ${imageMeta.img_id} to database!`,
    );
  }
  console.log('done');
  process.exit(0);
};

switch (type) {
  case 'image-data':
    console.log('> Starting image upload...');
    uploadImages();
    break;
  case 'image-meta':
    console.log('> Starting image metadata upload...');
    uploadImageMeta();
    break;
  case 'workshops':
    console.log('> Starting workshop upload...');
    uploadWorkshops();
    break;
  case 'archive':
    console.log('TODO');
    break;
  default:
    console.log('Invalid type. Run with --help for usage.');
    process.exit(0);
}
