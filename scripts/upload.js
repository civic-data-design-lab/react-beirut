#!/usr/bin/env node

const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config(); // allows for access to dotenv file
const ImageMetaSchema = require('../models/ImageMeta');
const ImageDataSchema = require('../models/ImageData');
const WorkshopSchema = require('../models/Workshop');
const ArchiveSchema = require('../models/Archive');

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
    'Usage: node scripts/upload.js [--help|-h] [-o|--overwrite] [-u|--update] <path> <type>'
  );

  console.log('\nAvailable types:');
  UPLOAD_TYPES.forEach((type) => {
    console.log(`  ${type}`);
  });

  console.log('\nOptions:');
  console.log(
    '\t-o, --overwrite\tCompletely overwrite existing objects.\n',
    '\t-u, --update\tUpdate existing objects by providing ID, {field:value} pairs.'
  );

  console.log('\nNote:');
  console.log(`
    If using the -u/--update flag, nested object fields must be provided as
    dot-separated names, otherwise the entire object will be overwritten.
    For example, to update the geolocation of an object, instead of using
    {"location": {"geo": <new>}}", you would pass {"location.geo": <new>}
    to preserve the other fields in "location".
  `);

  console.log('\nExamples:');
  console.log(
    '$ node scripts/upload.js -o scrips/data/workshops.json workshops'
  );
  console.log(
    `\tOverwrites the workshops in the database.
    \t"workshops.json" contains a JSON array of workshop objects.
    \tSee the schema for more information.`
  );
  console.log(
    '\n$ node scripts/upload.js -u scripts/data/updated-fields.json archive'
  );
  console.log(
    `\tUpdates the archive objects in the database.
    \t"updated-fields.json" contains a JSON array containing objects with the fields to update.
    \tFor example, [{"ID": "123", field1: "new value", field2: "new value"}] will update
    \tonly field1 and field2 on archive object 123.`
  );
  process.exit(0);
}

// Check for additional options
const overwrite = args.includes('--overwrite') || args.includes('-o');
const update = args.includes('--update') || args.includes('-u');

if (overwrite && update) {
  console.log('Cannot use both --overwrite and --update options.');
  process.exit(0);
}

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
    'Please define the MONGODB_URI environment variable inside .env'
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
    if (existingWorkshop) {
      // Handle the overwrite option
      if (overwrite) {
        console.log(`\t> Overwriting workshop ${workshop.ID}...`);
        await WorkshopSchema.replaceOne({ ID: workshop.ID }, workshop).exec();
        console.log(`\tSuccessfully overwrote workshop ${workshop.ID}.`);
        continue;
      }

      // Handle the update option, this will only update the fields provided
      // and not touch the rest of the object
      if (update) {
        console.log(`\t> Updating workshop ${workshop.ID}...`);
        await WorkshopSchema.updateOne(
          { ID: workshop.ID },
          { $set: workshop }
        ).exec();
        console.log(`\tSuccessfully updated workshop ${workshop.ID}.`);
        continue;
      }

      // If neither overwrite or update is specified, raise a warning
      console.log(
        `Workshop ${workshop.ID} already exists in database. Use -o/--overwrite to overwrite.`
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
 * Uploads the archive information given the JSON filepath.
 */
const uploadArchive = async () => {
  let data;
  try {
    data = fs.readFileSync(path);
  } catch (err) {
    console.error(err);
    console.error('Could not open the file at the specified path!');
    process.exit(1);
  }

  const jsonObj = JSON.parse(data);
  console.log(`Loaded ${jsonObj.length} archive objects from the JSON file.`);

  for (const archiveObj of jsonObj) {
    const archiveObjId = archiveObj.ID;

    // -----------------------------------------------------
    // Any updates to the archive object should be done here
    // -----------------------------------------------------

    console.log(`> Uploading archive response ${archiveObjId}...`);
    const existingArchiveObj = await ArchiveSchema.findOne({
      ID: archiveObjId,
    }).exec();

    if (existingArchiveObj) {
      // Handle the overwrite option
      if (overwrite) {
        console.log(
          `\t> Overwriting archive response ${existingArchiveObj.ID}...`
        );
        await ArchiveSchema.replaceOne({ ID: archiveObjId }, archiveObj).exec();
        console.log(`\tSuccessfully overwrote archive ${archiveObjId}.`);
        continue;
      }

      // Handle the update option, this will only update the fields provided
      // and not touch the rest of the object
      if (update) {
        console.log(`\t> Updating archive object ${archiveObj.ID}...`);
        await ArchiveSchema.updateOne(
          { ID: archiveObj.ID },
          { $set: archiveObj }
        ).exec();
        console.log(`\tSuccessfully updated archive object ${archiveObj.ID}.`);
        continue;
      }

      // If neither overwrite or update is specified, raise a warning
      console.log(
        `Archive response ${existingArchiveObj.ID} already exists in database. Use -o/--overwrite to overwrite.`
      );
      continue;
    }

    const newArchiveObj = new ArchiveSchema(archiveObj);
    await newArchiveObj.save();
    console.log(
      `Successfully uploaded archive response ${archiveObjId} to database!`
    );
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
    `Loaded ${jsonObj.length} image metadata entries from the JSON file.`
  );

  for (const imageMeta of jsonObj) {
    // --------------------------------------------------------------
    // Any updates to the image meta object for upload should go here
    // --------------------------------------------------------------
    // Convert the `path` field to the `src` field by appending the full URL
    // imageMeta.src = `https://cddl-beirut.herokuapp.com/api/images/${imageMeta.img_id}.jpg`;
    // Delete the `path` field (and the name field)
    // delete imageMeta.path;
    // delete imageMeta.img_name;

    // Upload the image meta to the database
    console.log(`> Uploading image-meta ${imageMeta.img_id}...`);
    const existingImageMeta = await ImageMetaSchema.findOne({
      img_id: imageMeta.img_id,
    }).exec();

    if (existingImageMeta) {
      // Handle the overwrite option (uses `replaceOne`)
      if (overwrite) {
        console.log(
          `\t> Overwriting image-meta ${existingImageMeta.img_id}...`
        );
        await ImageMetaSchema.replaceOne(
          { img_id: imageMeta.img_id },
          imageMeta
        ).exec();
        console.log(`\tSuccessfully overwrote image-meta ${imageMeta.img_id}.`);
        continue;
      }

      // Handle the update option, this will only update the fields provided
      // and not touch the rest of the object (uses `updateOne`)
      if (update) {
        console.log(`\t> Updating image meta ${imageMeta.img_id}...`);
        await ImageMetaSchema.updateOne(
          { img_id: imageMeta.img_id },
          { $set: imageMeta }
        ).exec();
        console.log(`\tSuccessfully updated image meta ${imageMeta.img_id}.`);
        continue;
      }

      // If neither overwrite or update is specified, raise a warning
      console.log(
        `Image-meta ${imageMeta.img_id} already exists in database. Use -o/--overwrite to overwrite.`
      );
      continue;
    }

    // Otherwise upload the image meta to the database
    const newImageMeta = new ImageMetaSchema(imageMeta);
    await newImageMeta.save();
    console.log(
      `Successfully uploaded image-meta ${imageMeta.img_id} to database!`
    );
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
    console.log('> Starting archive upload...');
    uploadArchive();
    break;
  default:
    console.log('Invalid type. Run with --help for usage.');
    process.exit(0);
}
