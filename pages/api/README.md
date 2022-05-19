# CDDL-Beirut API Documentation

## Endpoints
All `GET` endpoints return a JSON-formatted string in the form `{"message":
message, "response", response}`, where `response` contains the actual data. The
`message` property is a message indicating success or failure, and may provide
additional information. 

### Images

#### `GET /api/images` ⇒ [`ImageMeta[]`](../../models/ImageMeta.js)
Gets all of image metadata from the database.

#### `GET /api/images/<id>` ⇒ [`ImageMeta[]`](../../models/ImageMeta.js)

Gets the image metadata.

Users may provide an image ID (`img_id`), in which case the particular image
metadata object is returned, or a survey response ID (`response_id`), in which
case all image metadata for that response is returned. In either case, an array
of image metadata objects is returned.


#### `GET /api/images/<id>.(jpg|png|...)` ⇒ [`ImageData`](../../models/ImageData.js)
Retrieves the actual image given the image `filename` formatted as
`img_id.<extension>`. 



### Workshops
#### `GET /api/workshops` ⇒ [`Workshop[]`](../../models/Workshop.js)
Gets all workshops from the database.

#### `GET /api/workshops/<ID>` ⇒ [`Workshop`](../../models/Workshop.js)
Retrieves a workshop by its `ID` property from the database.

### Archive Information
#### `GET /api/archive` ⇒ [`ArchiveObject[]`](../../models/Archive.js)
Gets all of the archive response objects from the database.

#### `GET /api/archive/<ID>` ⇒ [`ArchiveObject`](../../models/Archive.js)
Retrieves and archive object by its `ID` property from the database.
