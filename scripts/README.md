# Scripts and Database Upload
This folder contains scripts used to upload data to the database. Click
[here](#database-upload-log) to skip to the database upload log.

## `archive_csv_to_json.py`
This script is used to convert the shared Google Sheet where the archive
information is stored and worked on to a JSON file.

### Usage:
1. Download the Archive data from the Google Sheet as a CSV and save it to a known location, preferably within the [`scripts/data`](/scripts/data) folder.
2. Run the script with the following command:  
    ```
    python3 scripts/archive_csv_to_json.py <path>
    ```
  where `<path>` is the path to the CSV file.
3. The script will create a JSON file in
   [`scripts/data/archive`](/scripts/data/archive), which can then be uploaded
   to the database using the [upload script](#uploadjs).
    
TODO: Note that this does not save the image metadata.

## `upload.js`
The main script is [`upload.js`](upload.js) and can be used as a command line
tool.

### Usage:

Use the following command to see the help page.
```
node scripts/upload.js --help
```

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
  * Example file: [`override-image-meta.json`](example-data/override-image-meta.json)
  * Command: `node scripts/upload.js --override example-data/override-image-meta.json
    image-meta`
  * Description: This command will override the two image meta objects with the
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


## Database Upload Log

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


