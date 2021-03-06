# Scripts and Database Upload
This folder contains scripts used to upload data to the database. Below is some
documentation on these scripts. Click [here](#database-upload-log) to skip to
the database upload log.

## `csv_to_json.py`
This script is used to convert CSV files to JSON for database upload. For
example, it can be used to convert the shared Google Sheet where the archive
information is stored and worked on to a JSON file. 

The script accepts the path to the CSV file and the CSV type as arguments.
Currently the script supports `archive` or `sticker` CSVs from the shared google
sheets.

Note that if `archive` is provided script will also update the primary image
metadata associated with the response.

### Usage:
0. Make sure you have the Python dependencies installed, found in [`requirements.txt`](requirements.txt).
1. Download the CSV data from the Google Sheet as a CSV and save it to a known location, preferably within the [`scripts/data`](/scripts/data) folder.
2. Run the script with the following command:  
    ```
    python3 scripts/csv_to_json.py <path> <type>
    ```
   where `<path>` is the path to the CSV file and `<type>` is either `archive` or `stickers`.
3. The script will create appropriate JSON files in `scripts/data/tmp`, which
   can then be uploaded to the database using the [upload script](#uploadjs).

## `upload.js`
The main script is [`upload.js`](upload.js) and can be used as a command line
tool.

### Usage:

Use the following command to see the help page.
```
node scripts/upload.js --help
```

The basic workflow is to run the script with a JSON filepath as the first
argument and the upload type as the second argument (e.g. `archive` or
`sticker`). The script will convert the JSON objects to Mongoose models and
upload them to the database.

### Examples
Some examples JSON files are provided in the `example-data` folder to show how
the data should be formatted when running the upload script.

#### **Uploading new data:**
  * Example file: [`upload-archive.json`](example-data/upload-archive.json)
  * Command: `node scripts/upload.js example-data/upload-archive.json
    archive`
  * Description: This command will upload the single archive object to the
    database. The archive object has the same fields as outlined in
    [`Types.js`](../models/Types.js).

#### **Overwriting existing data:**
  * Example file: [`overwrite-image-meta.json`](example-data/overwrite-image-meta.json)
  * Command: `node scripts/upload.js --overwrite example-data/overwrite-image-meta.json
    image-meta`
  * Description: This command will overwrite the two image meta objects with the
    given `ID` fields in the example file. Note that the entire objects are
    provided since they will replace the existing objects with the same `ID`.
#### **Updating existing data:**
  * Example file: [`update-workshop-nested.json`](example-data/update-workshop-nested.json)
  * Command: `node scripts/upload.js --update example-data/update-workshop-nested.json
    workshops`
  * Description: This will update the workshop with the ID `A040674864` with the data
    in the file. All other fields will be left as they are. Note that since
    `geo` is a nested field, it is provided as `location.geo` in order to
    preserve the other fields in `location`.


## Updating Data Workflow
The basic workflow for updating data in the database is as follows:

1. Convert the data you want to upload/update to a JSON format. You can use the
   [`csv_to_json.py`](#csv_to_json) script if the data is from a CSV and is from
   the archive sheet or stickers. Otherwise you can write some other script to
   create this JSON file.
2. Note that the JSON file must contain an array of objects to be uploaded.
   These objects should match the schemas found in
   [`Types.js`](../models/Types.js). Nested fields should be written as
   dot-separated strings such as `root.nested.double_nested...`. See the [example
   data](example-data/) folder for examples.   
3. Run the [`upload.js`](upload.js) script with the path to the JSON file to
   update, overwrite, or upload the data. See the [documentation](#uploadjs)
   above. 

## Database Upload Log

### 5/29/2022
* Changed "Najmeh" to "Nejmeh" in the archive responses.
* Made slight edits to the duplicate archive responses based on the FHL
  comments.

### 5/27/2022
* Uploaded sticker data to the database.
  * Created a new sticker model in [`Sticker.js`](../models/Sticker.js)
  * Created a sticker typedef in [`Types.js`](../models/Types.js)
  * Uploaded sticker data to the database by giving them codes. See the shared
    Google Sheet, under the "Stickers" tab. 
### 5/26/2022
* Added an `is_duplicate_of` field to archive objects in case there are
  duplicate shops being referenced in different records.
  * Updated Archive schema and typedef.
  * Uploaded updated archive data to database.
### 5/25/2022
* Update the workshops data by adding the following fields:
  * `year_established`
  * `decade_established`
* Updated `Types.js` and the Mongoose schema to reflect this.
* Updated the database by running the upload script (`node scripts/upload.js -u scripts/data/workshops/workshops_with_year_est.json workshops`) 
### 5/24/2022
* Used the new upload method to update the archive information and archive image
  metadata.
  * Update the archive information to contain the thumbnail image ID (`thumb_img_id`)
  * Updated the archive image metadata to contain the decade taken (`decade_taken`)

### 5/23/2022
* Reuploaded the archive data to the database using the new scripts. The key
  insight was that you can `"."`-separate field names (e.g. `a.b.c`) to create a
  nested object `{a: {b: {c: ...}}}`.
* Replaced shops with name/owner name `"unknown"` and `"-"` with null in the archive data.

### 5/18/2022
* Updated the `Archive` and `ImageMeta` schema to use separate year and decade
  fields: (`primary_year`, `primary_decade`) and (`year_taken`, `decade_taken`),
  respectively. See `Types.js` for more specifics.
* Reuploaded the archive info with the new year fields.
* Reuploaded the archive image metadata with updated craft types and location. 

---
* Uploaded the reference scans to the database (for textual information). NOTE:
  some textual series data did not provide a scan of the reference source, so
  some images may not exist (e.g. `146739591` from the archival information
  survey). 
* Created/updated the corresponding image metadata and archive response data.

### 5/17/2022
* Created a more comprehensive type, `Location`, which includes geolocation,
  address, and administrative regions 1-4.
* Updated the `Workshops` schema: 
  * Combined `location`, `shop_address`, and the administrative region fields
    into a single `location` (object) field (the `Location` type in `Types.js`)
* Updated the `ImageMeta` schema:
  * Created a new location field based on the `Location` type in `Types.js`.
    Deleted all replaced fields.
  * Added a new `craft_category` field. 
* Reuploaded the craft workshops data and workshops image metadata.

---
* Updated the `Archive` information schema and reuploaded the data
* ~~TODO: Reupload archive image metadata~~
* ~~TODO: Add a "decade" field to the archive information~~

### 5/11/2022
* Updated archive info schema, changed `type` to `ref_type` to prevent conflicts
  with MongoDB fields.
* Uploaded all archive information objects to the database.
* Reuploaded, added the craft_discipline_category field and arrayified space
  separated strings (updated schema to reflect this).

---
* Updated the `ImageMeta` schema to include `address` (a multilanguage field), `sector`, and `historic_map`.
* Uploaded the image metadata from the archival information.
* Uploaded the images from the archival information survey.
* ~~TODO: Update the craft types to reflect the new types and categories.~~
* ~~TODO: Reupload the workshops image metadata to fit this new schema.~~
* ~~TODO: Upload all of the reference scans to the database~~ 

### 5/10/2022
* Uploaded all images from combined workshops and the image metadata.
* Uploaded the combined workshops data. 
* Replaced duplicate image `145593040_2` with `145593040_1` in "Combined" Google sheet.
* Replaced duplicate image `143055091_2` (in response `143056445`) with `143056445_5` in "Combined" Google
  sheet.
* Replaced duplicate image `141743929_2` with `141743929_3` in "Combined" Google
  sheet.


