const ArchiveSchema = require('../../models/Archive');
const WorkshopSchema = require('../../models/Workshop');
const mongoose = require('mongoose');

console.log(ArchiveSchema);
console.log(WorkshopSchema);

// // Connect to the database
// // Connect to the database
// console.log('> Connecting to database...');
// const MONGODB_URI = process.env.MONGODB_URI;
// if (!MONGODB_URI) {
//     throw new Error(
//         'Please define the MONGODB_URI environment variable inside .env'
//     );
// }

// conn = mongoose.connect(MONGODB_URI);
// console.log('Successfully connected to database.');