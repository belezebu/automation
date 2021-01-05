import {NextFunction, Request, Response} from "express";
import {Fields, Files } from "formidable";

const { IncomingForm } = require('formidable');


const parseUploadedFile = async (request: Request, response: Response, next: NextFunction) => {
    // parse a file upload
    const form = new IncomingForm({multiples: false});
    try {
        const files = await new Promise(function (resolve, reject) {
            form.parse(request,  (err: Error, fields: Fields, files: Files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(files);
            });
        });
        request.body = { files }
        next()
    } catch (e) {
        const errorMessage = 'Error parsing files'
        console.error(errorMessage, e.stack)
        response.header('Access-Control-Allow-Origin', '*')
        response.send({errorMessage})
        response.sendStatus(500)
    }
}

export default parseUploadedFile