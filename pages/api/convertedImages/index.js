const { promisify } = require('util');
const fs = require('fs');
const path = "./convertedImage.jpeg"
const convert = require('heic-convert');
import {StatusCodes} from "http-status-codes";


const convertHEIC = async (inputFile) => {
  // console.log("input buffer ", inputBuffer)
  const inputBuffer = await promisify(fs.readFile)(inputFile);
  const outputBuffer = await convert({
    buffer: inputBuffer, // the HEIC file buffer
    format: 'JPEG',      // output format
    quality: 1           // the jpeg compression quality, between 0 and 1
  });

  return outputBuffer
}



export default async (req, res) => {
  console.log("check if here")
  if (req.method==="POST") {
      console.log("hereee")
      // console.log("body is ", req.body)

    let outputBuffer

    await convertHEIC(req.body)
        .then((output)=>{
          outputBuffer = output
          console.log("__________________________________________________")
          console.log("outputBuffer is ", outputBuffer)
        })
        .then(()=> {
          res(outputBuffer)
        }
        )
  }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}