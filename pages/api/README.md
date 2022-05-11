# CDDL-Beirut API Documentation

## Endpoints

### Images

#### `GET /api/images` ⇒ [`ImageMeta[]`](../../models/ImageMeta.js)
<dd> Gets all of image metadata from the database.</dd>

#### `GET /api/images/<id>` ⇒ [`ImageMeta[]`](../../models/ImageMeta.js)
<dd> 
Gets the image metadata.

Users may provide an image ID (`img_id`), in which case the particular image
metadata object is returned, or a survey response ID (`response_id`), in which
case all image metadata for that response is returned. In either case, an array
of image metadata objects is returned.
</dd>

#### `GET /api/images/<id>.(jpg|png|...)` ⇒ [`ImageData`](../../models/ImageData.js)
<dd>

Retrieves the actual image given the image `filename` formatted as
`img_id.<extension>`. 

</dd>

### Workshops
#### `GET /api/workshops` ⇒ [`Workshop[]`](../../models/Workshop.js)
<dd>Gets all workshops from the database.</dd>

#### `GET /api/workshops/<ID>` ⇒ [`Workshop`](../../models/Workshop.js)
<dd>Retrieves a workshop by its `ID` property from the database.</dd>

### Archive Information
TODO
