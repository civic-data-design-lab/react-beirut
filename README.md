# CDDL-Beirut
## Project Setup
This digital platform is made using the [Next.js](https://nextjs.org/) React framework. It was bootstrapped
with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
from the
[`with-mongodb-mongoose`](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose)
example (`npx create-next-app --example with-mongodb-mongoose cddl-beirut`).

For the API, the [`mongoose`](https://mongoosejs.com/) object modeling library
is used to make creating/retrieving data from the MongoDB database easier. 

### File Structure
The diagram below shows a high-level view of the file structure (not all files
and folders are shown).
```
📦cddl-beirut
 ┣ 📂components
 ┣ 📂lib
 ┣ 📂models
 ┣ 📂pages
 ┃ ┣ 📂api
 ┃ ┣ 📜index.js
 ┃ ┗ 📜_app.js
 ┣ 📂public
 ┣ 📂scripts
 ┣ 📂styles
 ┣ 📜.env
 ┗ 📜package.json
 ```

 * `📂components` contains the React components for the frontend.
 * `📂lib` stores helper files, such as [`dbConnect.js`](lib/dbConnect.js) which
   connects to the MongoDB database.
 * `📂models` contains the Mongoose schemas for each of the datatypes. It also
   contains [`Types.js`](models/Types.js) which defines the attributes of each
   model using [JSDoc](https://jsdoc.app/) formatting.
* `📂pages` stores all of the primary files used for the fontend. See the
  [Next.js pages documentation](https://nextjs.org/docs/basic-features/pages)
  for details on how to work with pages. The entry point is
  [`_app.js`](pages/_app.js), and the root page is built from
  [`index.js`](pages/index.js). This folder also contains the
  [`📂api/`](pages/api/) folder which serves the API.
* `📂public` just contains public files, such as icons and logos.
* `📂scripts` contains scripts used separately from the main project, such as
  local file upload to the database ([visit the folder](scripts/) for more
  details).
 * `📂styles` contains the SCSS stylesheets. They must be imported in
   [`globals.scss`](styles/globals.scss) so they can be used globally among all
   React components.
* `📜.env` **(IMPORTANT)** contains the URI for connecting to the MongoDB
  database. It is not pushed to the remote repo so it will not appear here. See
  the [local development section](#local-development) for more information.
* `📜package.json` defines the dependencies and start scripts.


### Local Development
Go through the following steps to get started:

0. Make sure you have [Node](https://nodejs.org/en/download/) installed and that
   you can run the `npm` command in your terminal.
1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
the repository using `git clone` into your local workspace.
2. Once you are in the project root directory, run `npm install` to install the
   dependencies. 
3. **(IMPORTANT)** In order for the app to be able to connect to the database,
   create a `.env` file in the root directory and add the MongoDB connection
   string (URI) in the following format: `MONGODB_URI=<URI>`. To find this URI,
   navigate to the CDDL-Beirut cluster in the MongoDB dashboard and click
   `Connect > Connect your application` and follow the instructions to get the
   correct string (replace `<URI>` with the string).
4. For the maps to work, you must also add the Mapbox access token to the `.env`
   file. Add the following line: `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=<TOKEN>`.
5. Lastly, run the command `npm run dev` to start the app, which is served by
   default on http://localhost:3000.

If everything works, you should be able to navigate to
http://localhost:3000/api/images/github-logo.png and see an image of the Github
logo.

**Note:** If you want to use the features in the `scripts/` directory, use the
following additional steps to get set up. 

6. Install the dependencies by running `pip install -r
   scripts/requirements.txt`.  
7. Read the README file in the [`scripts/`](scripts/) directory for more
   information.

## Deployment
See [Documentation for
Heroku](https://civic-data-design-lab.github.io/CDDL-Wiki/LCAU%20&%20CDDL%20Engineering%20Wiki%20530f30eb6f734518bc2c11f9c67d9863/Documentation%20for%20Heroku%200c9064ea27b44e459ef9843b7414fa95.html)
for deployment. Make sure to add the MongoDB connection string to the config
vars.

## Database
This application uses MongoDB as its primary database, with Mongoose for schema
creation and support. Data was initially uploaded to this database using Node JS
scripts. See [`scripts/`](scripts/) for more information on this, as well as for
a database upload log. 

Data is stored in the database as objects defined in Mongoose schemas, such as
archival information objects or workshop objects. See the [`models/`](models/)
directory for all relevant files, or check [`Types.js`](models/Types.js) for
documentation on all these types.
## API
API documentation can be found in the [`pages/api/`](pages/api/) directory. See
its [`README`](pages/api/README.md).


## Frontend Routes
### `/explore` 
Contains the map.

### `/contribute/workshop?page=<page>`
