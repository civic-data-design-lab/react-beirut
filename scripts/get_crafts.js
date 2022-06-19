import dbConnect from '../lib/dbConnect';

const mongoose = require('mongoose');
require('dotenv').config(); // allows for access to dotenv file



const Archive = require("../models/Archive")

await dbConnect();

let craftsSet = new Set();

const documents = await Archive.find({}, {craft_discipline: 1, craft_discipline_other:1})
    .exec((err, doc) => {
        if (err || !doc) {
            console.log('null')
        } else {
            console.log("not null")
            console.log(doc)
        }
    });
