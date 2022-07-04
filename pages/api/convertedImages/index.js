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

    if (req.method === "POST") {
        const body = req.body;
        if (!body) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: 'No body provided',
            });
        }

        const file = req.body
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageBuffer = e.target.result;
            const extension = file.name.split('.').pop();
            console.log('extension is ', extension)
            console.log('buffer is ', imageBuffer);


            if (extension === "HEIC" || extension === "HEIF") {
                try {
                    convertHEIC(imageBuffer)
                        .then((output) => {
                            res([new File(output, "convertedImage.jpeg"), output, "jpeg"]);
                        })
                } catch (e) {
                    console.warn('2')
                    console.warn('couldnt convert HEIC')
                    res([file, null, null]);
                }
            } else {
                res([file, imageBuffer, extension]);
                }
        }
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}