import {getCraftTypes} from "../../lib/apiUtils";
import { StatusCodes } from 'http-status-codes';
import dbConnect from "../../lib/dbConnect";
import Archive from "../../models/Archive";
import Workshop from "../../models/Workshop";

export default async (req, res) =>{


    await dbConnect();
  let craftTypes = new Set();
  Archive.find({}, {craft_discipline: 1, craft_discipline_other: 1}).exec((err, archives)=>{
    for (let archive of archives) {
    if (archive.craft_discipline) {
      for (const craft of archive.craft_discipline) {
      craftTypes.add(craft.charAt(0).toUpperCase()+craft.slice(1).toLowerCase());}
    }
    if (archive.craft_discipline_other) {
      if (Array.isArray(archive.craft_discipline_other)) {
        for (const craft of archive.craft_discipline_other) {
          if (craft !== '') {
            craftTypes.add(craft.charAt(0).toUpperCase()+craft.slice(1).toLowerCase());
          }
        } }
      else {
          craftTypes.add(archive.craft_discipline_other.charAt(0).toUpperCase() + archive.craft_discipline_other.slice(1).toLowerCase());
      }
    }
  }
    Workshop.find({}, {craft_discipline: 1, craft_discipline_other: 1}).exec((err, workshops)=>{
    for (let workshop of workshops) {
    if (workshop.craft_discipline) {
      for (const craft of workshop.craft_discipline) {
      craftTypes.add(craft.charAt(0).toUpperCase()+craft.slice(1).toLowerCase());}}
    if (workshop.craft_discipline_other) {
      if (Array.isArray(workshop.craft_discipline_other)) {
        for (const craft of workshop.craft_discipline_other) {
          if (craft !== '') {
            craftTypes.add(craft.charAt(0).toUpperCase()+craft.slice(1).toLowerCase());
          }
        } }
      else {
          console.log('craft disc other ', workshop.craft_discipline_other)
          craftTypes.add(workshop.craft_discipline_other.charAt(0).toUpperCase() + workshop.craft_discipline_other.slice(1).toLowerCase());
      }
    }
  }

    console.log("crafttupes ", Array.from(craftTypes))
    res.send({
    //message: 'Succesfully retrieved craft-types',
    response: Array.from(craftTypes),
  });

  })

  })





}