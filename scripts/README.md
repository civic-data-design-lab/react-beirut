TODO: In progress


## Database Upload Log

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
* TODO: Update the craft types to reflect the new types and categories.
* TODO: Reupload the workshops image metadata to fit this new schema.
* TODO: Upload all of the reference scans to the database 

### 5/10/2022
* Uploaded all images from combined workshops and the image metadata.
* Uploaded the combined workshops data. 
* Replaced duplicate image `145593040_2` with `145593040_1` in "Combined" Google sheet.
* Replaced duplicate image `143055091_2` (in response `143056445`) with `143056445_5` in "Combined" Google
  sheet.
* Replaced duplicate image `141743929_2` with `141743929_3` in "Combined" Google
  sheet.


