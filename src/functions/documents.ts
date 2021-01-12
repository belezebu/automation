import neatCsv from 'neat-csv'
import {APIGatewayProxyHandler} from "aws-lambda";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda/trigger/api-gateway-proxy";
import Busboy from 'busboy';

const separator = ","
const EOL = "\n"

const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
    return value !== null && value !== undefined;
}

const isString = (value: string | null | undefined): value is string => {
    return typeof value === 'string' && value.length > 0
}

const sanitizeInput = (value: string) => value.replace(/[ €%]/g, "").replace(",", ".")

const round = (value: number) => Math.round(value * 100) / 100

type Location = {
    number: string
    name: string
    type: string
    isNew: boolean
    plantType: string
    slope: number
    watering: boolean
    waterCounters: string
    waterCatchment: string
    plantationYear: string
    area: number
}

type BaseItem = {
    dossierId: string,
    designation: string,
    totalCost: number,
    totalCostWithVat: number
}

type DossierItem = {
    unit: string,
    quantity: number,
    unitCost: number,
    vat: number,
} & BaseItem

type TotalItem = {
    dossierId: '1'
    designation: 'Total'
} & BaseItem

type Item = DossierItem | TotalItem

const buildLocation = async (location: string) => {
    const buildlocationInformation = async (location: string): Promise<Location>  => {
        const locationLines = location.split(EOL)
        const number = locationLines?.[0]?.split(separator)[0]
        const locationInformation = [ locationLines[0], locationLines[1]].join(EOL)
        const rawItems = await neatCsv(locationInformation, {
            separator,
            skipLines: 1,
            headers: ['', 'name', 'type', 'slope', 'area', 'plantType', 'isNew', 'plantationYear', 'watering', 'waterCounters', 'waterCatchment']
        })
        const { name, type, isNew, plantType, slope, watering, area, waterCounters, waterCatchment, plantationYear } = rawItems[0]
        return {
            number,
            name,
            type,
            isNew: isNew === 'Sim' ,
            plantType,
            watering: watering === 'Sim',
            slope: parseInt(slope),
            area: parseFloat(sanitizeInput(area)),
            waterCounters,
            waterCatchment,
            plantationYear
        }
    }
    const buildItem = ({dossierId, designation, unit, quantity, unitCost, totalCost, vat, totalCostWithVat}: Record<string, string>): Item => ({
        dossierId,
        designation,
        unit,
        quantity: parseInt(quantity),
        unitCost: parseFloat(sanitizeInput(unitCost)),
        totalCost: parseFloat(sanitizeInput(totalCost)),
        vat: parseInt(sanitizeInput(vat)),
        totalCostWithVat: parseFloat(sanitizeInput(totalCostWithVat)),
    })
    const locationProperties = await buildlocationInformation(location);
    const rawItems = await neatCsv(location, {
        separator,
        skipLines: 3,
        headers: ['dossierId', 'designation', 'unit', 'quantity', 'unitCost', 'totalCost', 'vat', 'totalCostWithVat']
    })
    const items = rawItems
        .filter(({designation}) => isString(designation) && designation !== 'Total')
        .map(buildItem)

    console.log('Successfully build location', { name: locationProperties.name })

    return {
        ...locationProperties,
        items
    }
}

const buildPersonalInformation = (data: string) => {
    const lines = data.split(EOL)
    return ["name;" + lines[0], lines[1]]
        .map(line => line?.split(separator).map(line => line.trim()).filter(value => isString(value) && value !== 'undefined'))
        .filter(notEmpty)
        .reduce<Record<string, string>>((accumulator, [key, value]) => {
            accumulator[key.toLowerCase()] = value
            return accumulator
        }, {});

}

type File = {
    file?: Buffer,
    filename?: string,
    contentType?: string
}

const parseUploadedFile = ({body, headers, isBase64Encoded}: APIGatewayProxyEvent): Promise<File> => new Promise((resolve, reject) => {
    const contentType = headers['Content-Type'] || headers['content-type'];
    const busboy = new Busboy({
        headers: {
            'content-type': contentType,
        }
    });

    const result: File = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        file.on('data', data => {
            result.file += data;
        })

        file.on('end', () => {
            result.filename = filename;
            result.contentType = mimetype;
        });
    });

    busboy.on('error', (error: any) => reject(`Parse error: ${error}`));
    busboy.on('finish', () => resolve(result));

    console.log({ isBase64Encoded })
    busboy.write(body || '', isBase64Encoded ? 'base64' : 'utf-8');
    busboy.end();
});

const documentsHandler: APIGatewayProxyHandler = async (event, context) => {
    const {file} = await parseUploadedFile(event)
    if (!file) {
        const errorMessage = 'File does not exists'
        return {
            statusCode: 404,
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({errorMessage})
        };
    }
    const data = file.toString()
    const personalInformation = buildPersonalInformation(data)

    console.log({ data })
    const firstLocal = data.indexOf("Local")
    const localEnding = data.indexOf("TOTAL PLANTAÇÕES")
    const locations = data.substring(firstLocal, localEnding).split("Local")
        .map(local => local.trim())
        .filter(isString)
        .map(location => buildLocation(location))

    const parsedLocations = await Promise.all(locations)
    return {
        statusCode: 200,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({locations: parsedLocations, personalInformation})
    } as APIGatewayProxyResult;
}

export const handler = documentsHandler;