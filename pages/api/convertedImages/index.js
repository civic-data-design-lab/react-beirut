const { promisify } = require('util');
const fs = require('fs');
const path = "./convertedImage.jpeg"
const convert = require('heic-convert');
import {StatusCodes} from "http-status-codes";


const convertHEIC = async (inputBuffer) => {
  const outputBuffer = await convert({
    buffer: inputBuffer, // the HEIC file buffer
    format: 'JPEG',      // output format
    quality: 1           // the jpeg compression quality, between 0 and 1
  });

  return outputBuffer
}



export default async (req, res) => {

  if (req.method==="POST") {
    const body = req.body;
    if (!body) {
      res.status(StatusCodes.BAD_REQUEST).send({
          message: 'No body provided',
        });
    }

    convertHEIC(req.body)
        .then((output)=>{
          res(output);
        })
  }



}