import neatCsv from 'neat-csv'
import {APIGatewayProxyHandler} from "aws-lambda";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda/trigger/api-gateway-proxy";
import Busboy from 'busboy';
const parser = require('lambda-multipart-parser');
import xlsx from 'node-xlsx';
const separator = ";"
const EOL = "\n"

const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
    return value !== null && value !== undefined;
}

const isString = (value: string | null | undefined): value is string => {
    return typeof value === 'string' && value.length > 0
}

const sanitizeInput = (value: string) => value.replace(/[ ,€%]/g, "")

const round = (value: number) => Math.round(value * 100) / 100

type Location = {
    number: string
    name: string
    type: string
    isNew: boolean
    plantType: string
    slope: number
    watering: boolean
    waterCounters: number
    waterCatchment: number
    plantationYear: string
    area: number
}

type BaseItem = {
    dossierId: string,
    designation: string,
    totalCost: number,
    totalCostWithVat: number,
}

type DossierItem = {
    unit: string,
    quantity: number,
    unitCost: number,
    vat: number,
    investmentDate: string
} & BaseItem

type TotalItem = {
    dossierId: '1'
    designation: 'Total'
} & BaseItem

type Item = DossierItem | TotalItem

const buildLocation = async (location: string) => {

    console.log("start location")
    console.log(location)
    console.log("end")

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
        const hasWatering = watering === 'Sim'
        return {
            number,
            name,
            type,
            isNew: isNew === 'Sim' ,
            plantType,
            watering: hasWatering,
            slope: parseInt(slope),
            area: parseFloat(sanitizeInput(area)),
            waterCounters: hasWatering ? parseInt(waterCounters || "0") : 0,
            waterCatchment: hasWatering ? parseInt(waterCatchment || "0") : 0,
            plantationYear
        }
    }
    const buildItem = ({dossierId, designation, unit, quantity, unitCost, totalCost, vat, totalCostWithVat, investmentDate}: Record<string, string>): Item => ({
        dossierId,
        designation,
        unit,
        quantity: parseInt(quantity),
        unitCost: parseFloat(sanitizeInput(unitCost)),
        totalCost: parseFloat(sanitizeInput(totalCost)),
        vat: parseFloat(vat) * 100,
        totalCostWithVat: parseFloat(sanitizeInput(totalCostWithVat)),
        investmentDate
    })
    const locationProperties = await buildlocationInformation(location);
    const rawItems = await neatCsv(location, {
        separator,
        skipLines: 3,
        headers: ['dossierId', 'designation', 'unit', 'quantity', 'unitCost', 'totalCost', 'vat', 'totalCostWithVat', 'investmentDate']
    })

    console.log('Raw items', rawItems)
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
            if(typeof key === 'string') {
                accumulator[key.toLowerCase()] = value
            }
            return accumulator
        }, {});

}

type File = {
    file?: Buffer,
    filename?: string,
    contentType?: string
}
const documentsHandler: APIGatewayProxyHandler = async (event, context) => {
    const result = await parser.parse(event);
    const workSheetsFromBuffer =  xlsx.parse(result.files[0].content)
    // @ts-ignore
    const data = workSheetsFromBuffer[0].data.filter( (line) => line.length > 0).map( (line) => line.join(separator) ).join("\n")
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
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        body: JSON.stringify({locations: parsedLocations, personalInformation})
    } as APIGatewayProxyResult;
}

export const handler = documentsHandler;