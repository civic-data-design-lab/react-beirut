# How the Contribute Section Works

Depending on whether the user clicks on "Add an Archival Image" or "Add a Craft Workshop", the entry point will either be `/pages/contribute/archive` or `/pages/contribute/workshop` respectively.

# React Call Stack

### MultipageForm
The central component of both forms is the `MultipageForm` component. The most important props of this component is a `formSchema` object, a `formData`+`onUpdate` object/function combo, and any number of components as children to act as the different pages.


- `formData` - A state belonging to either the archive or workshop page. This is an object that contains all of the entries from the form. This will be saved to local storage on update and read from local storage upon reopening the form. All fields store their value in this object.

- `onUpdate` - A poorly named function that essentially accepts subsets new data to incorporate into or overwrite formData. It is easiest to see what it does from the code:

```js
const onUpdate = (data) => {
    setForm((prevForm) => {
        const updatedFormData = { ...prevForm, ...data };

        // INFO: Update the local storage
        localStorage.setItem(
        WORKSHOP_CONTRIBUTION_NAME,
        JSON.stringify(updatedFormData)
        ); //!! This errors if cookies are disabled.

        return updatedFormData;
    });
};

```

- `formSchema` - Defined near the top of both archive.js and workshop.js. This outlines the structure of the form, generates titles, and requirements for each page and the form overall. This schema DOES NOT always change labels or titles in the form and you do not necessarily need to use it when editing the sub-forms though it is helpful.
The overall structure looks like this:

```js
{
    pages: {
        // Key name does not effect the form. Only used to reference values.
        <page_name>: {
            // Used as title at the top of the page
            title: string,

            // (optional) To be used in the mutiform page navbar 
            short_title: string,

            // (optional) Used to define requirements more complicated
            //  than simply requiring a field not be empty.
            // If the requirement fails, it will display a missing
            //  field notification upon moving to the next page
            //  and will not allow user to submit the form.
            custom_reqs: {
                <custom_req_name>: {
                // Function used to to check
                // @param {object} formData - The current state of the form data
                // @returns {object} {requirementFulfilled: boolean, errorMessage: string} -
                //  if requirementFulfilled, user will be able to submit form at end.
                //  errorMessage is what can optionally be displayed as an inline error.
                //  Implement it wherever you may like.
                function: Function,

                // This what will display to the user when this requirement is not fulfilled
                title: string,

                },
                <custom_req_name>: {...},
                ...
            },
            // This refers to the fields on the current page.
            fields: {
                <field_name>: {
                    // Typically displayed above the input interface
                    title: string,

                    // Name to read/save data under in the formData
                    field_name: string,

                    // (optional) If true, MultiformPage will require this field
                    // to not be empty, ie: '', null, undefined, [], etc.
                    required: boolean,
                },
                <field_name>: {...},
                ...
            },
        },
        <page_name>: {...},
        ...
    }
}
```
**Example**:
```js
{
    pages: {
        image_upload: {
            title: 'Archival Image Upload',
            short_title: 'Archive Upload',
            custom_reqs: {
                time_req: {
                function: (formData) => {
                    const fields = formSchema.pages.image_upload.fields;
                    if (
                    formData[fields.year_taken.field_name] ||
                    (formData[fields.start_decade.field_name] &&
                        formData[fields.end_decade.field_name])
                    ) {
                    return {
                        requirementFulfilled: true,
                        errorMessage: '',
                    };
                    }

                    return {
                    requirementFulfilled: false,
                    errorMessage:
                        'Either a year or range of decades must be provided.',
                    };
                },
                title: 'Time Frame',
                },
            },
            fields: {
                    year_taken: {
                        title: 'Year Taken',
                        field_name: 'year_taken',
                    },
                    start_decade: {
                        title: 'Start Decade',
                        field_name: 'start_decade',
                    },
                    end_decade: {
                        title: 'End Decade',
                        field_name: 'end_decade',
                    }
                }
            }
        location: {
            title: 'Location of Archival Image',
            fields: {
                building_number: {
                    title: 'Building Number',
                    field_name: 'building_number',
                },
                street: {
                    title: 'Street Name/Number',
                    field_name: 'street',
                },
            }
        }
    }
}
```

### MultipageForm / child components (sub-forms)

Subforms are passed into MultipageForm and given some of the props that were originally given to MultipageForm. So all of them have access to formData, onUpdate, and formSchema.

### MultipageForm / child components (sub-forms) / InputField

`InputField` is one a few premade inputs that will update the formData under a name given by the prop 'fieldName.' InputField is also given a 'type' prop which determines what interface it has (combobox, text, email, number, etc.). Best to take a look at the InputField.js to fully understand. Other prebuilt inputs include `ImageUploadForm` and `BooleanButtonForm`.

## Submission

On the preview page, the formData will be converted to imageMeta, imageData, and workshop/archive json objects which will be uploaded to database. Example:

formData
```js
{
    "survey_origin": "workshop_contribution",
    "shop_name": "Testing",
    "status": "closed_perm",
    "phone": "8437540521",
    "quarter": "Saifeh",
    "sector": "Mar Maroun",
    "craft_category": [
        "Decorative",
        "Fashion"
    ],
    "type_of_craft": [
        "Shoemaker",
        "Soap"
    ],
    "image_content": [],
    "images": [
        {
            "imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABuwAAAaICAYAAABv0/ghAAAMbGlDQ1BJQ0MgUHJvZmlsZQAASI...",
            "imageExtension": "png"
        }
    ],
    "caption": "test",
    "consent": true,
    "year_established": "2012",
    "building_number": "",
    "street": "",
    "email": "",
    "lat": 33.88889431584944,
    "lng": 35.48310644940031
}
```

...Becomes...

workshop object list
```js
{
    "ID": "2111445169",
    "survey_origin": "workshop_contribution",
    "ID_craftspeople": null,
    "shop_name": {
        "content": "Testing",
        "content_ar": null,
        "content_orig": "Testing",
        "content_orig_lang": "en"
    },
    "shop_owner_name": null,
    "contact_info": {
        "email": null,
        "phone": "8437540521",
        "website": null,
        "social_media": null
    },
    "craft_discipline_category": [
        "Decorative",
        "Fashion"
    ],
    "craft_discipline": [
        "Shoemaker",
        "Soap"
    ],
    "craft_discipline_other": null,
    "location": {
        "geo": {
            "lat": 33.88889431584944,
            "lng": 35.48310644940031
        },
        "address": {
            "content": null,
            "content_ar": null,
            "content_orig": null,
            "content_orig_lang": "en"
        },
        "adm1": null,
        "adm2": null,
        "adm3": "Saifeh",
        "adm4": "Mar Maroun"
    },
    "shop_status": "closed_perm",
    "year_established": "2012",
    "decade_established": [
        2010,
        2010
    ],
    "data_collection_comments": null,
    "produced_here": true,
    "thumb_img_id": "2111445169_1",
    "images": [
        "2111445169_1"
    ]
}
```
...and...
imageMeta object list
```js
[
    {
        "img_id": "2111445169_1",
        "response_id": "2111445169",
        "from_survey": "workshop_contribution",
        "is_thumbnail": true,
        "type": [],
        "craft_category": [
            "Decorative",
            "Fashion"
        ],
        "craft_type": [
            "Shoemaker",
            "Soap"
        ],
        "keywords": [
            "Shoemaker",
            "Soap",
            "Decorative",
            "Fashion"
        ],
        "is_series": false,
        "location": {
            "geo": {
                "lat": 33.88889431584944,
                "lng": 35.48310644940031
            },
            "address": {
                "content": null,
                "content_ar": null,
                "content_orig": null,
                "content_orig_lang": "en"
            },
            "adm1": null,
            "adm2": null,
            "adm3": "Saifeh",
            "adm4": "Mar Maroun"
        },
        "year_taken": 2022,
        "decade_taken": [
            2020,
            2020
        ],
        "caption": "test",
        "src": "http://cddl-beirut.herokuapp.com/api/images/2111445169_1.png"
    }
]
```
...and...

imageData object
```js
[
    {
        "img_id": "2111445169_1",
        "filename": "2111445169_1.png",
        "data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABuwAAAaICAYAAABv0/ghAAAMbGlDQ1BJQ0MgUHJvZmlsZQAASImVVwdYU..."
    }
]
```



When the "submit" button is pressed on the final page, these newly created objects are uploaded to MongoDB via the HTTP interface (aka API Endpoint). More specficially: a POST request is sent to `/api/workshops` or `/api/archives` containing the new data as a JSON object.

If you check the console, you will notice a set of helpful messages about the submission of this new workshop or archive including: a link to view it on the website and queries to enter into MongoDB to retrieve the newly submitted data.

