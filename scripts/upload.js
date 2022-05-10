#!/usr/bin/env node

const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config(); // allows for access to dotenv file
const ImageSchema = require('../models/Image');
const WorkshopSchema = require('../models/Workshop');

const UPLOAD_TYPES = ['images', 'workshops', 'archive'];

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
    'Please define the MONGODB_URI environment variable inside .env.local',
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
 * Uploads the image files to the database.
 */
const uploadImages = async () => {
  // https://stackoverflow.com/a/2727191
  fs.readdir(path, (err, files) => {
    files.forEach((filename) => {
      console.log(`Uploading ${filename} to database...`);
      fs.readFile(`${path}/${filename}`, (err, data) => {
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
};

switch (type) {
  case 'images':
    console.log('> Starting image upload...');
    uploadImages(path);
    break;
  case 'workshops':
    console.log('> Starting workshop upload...');
    uploadWorkshops(path);
    break;
  case 'archive':
    console.log('TODO');
    break;
  default:
    console.log('Invalid type. Run with --help for usage.');
    process.exit(0);
}