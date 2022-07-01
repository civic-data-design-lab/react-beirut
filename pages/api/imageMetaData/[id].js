import {getImageMeta} from "../../../lib/apiUtils";
import { StatusCodes } from 'http-status-codes';

export default async (req, res) => {
    const {id} = req.query;

    getImageMeta(id)
        .then((metadata) => {
                if (!metadata || metadata.length < 1) {
                    res.status(StatusCodes.NOT_FOUND).send({message: 'Metadata not found'});
                    return;
                }
                res.send({
                    message: 'Succesfully retrieved metadata',
                    response: metadata,
                })
            return
            }
        )

}

