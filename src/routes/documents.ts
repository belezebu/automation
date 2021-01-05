import {Request, Router} from 'express';
import {EOL} from 'os';
import neatCsv from 'neat-csv'
import {Fields, File, Files} from "formidable";
import {readFile as fsReadFile} from 'fs'
import {promisify} from 'util'

const readFile = promisify(fsReadFile)

const router = Router();
const separator = ";"

const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
    return value !== null && value !== undefined;
}

const isString = (value: string | null | undefined): value is string => {
    return typeof value === 'string' && value.length > 0
}

const sanitizeInput = (value: string) => value.replace(/[ €%]/g, "").replace(",", ".")

const round = (value: number) => Math.round(value * 100) / 100

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

const buildItem = ({dossierId, designation, unit, quantity, unitCost, totalCost, vat, totalCostWithVat}: Record<string, string>): Item => {
    if (designation === 'Total') {
        return {
            designation,
            dossierId: '1',
            totalCost: parseFloat(sanitizeInput(totalCost)),
            totalCostWithVat: parseFloat(sanitizeInput(totalCostWithVat))
        }
    }
    return {
        dossierId,
        designation,
        unit,
        quantity: parseInt(quantity),
        unitCost: parseFloat(sanitizeInput(unitCost)),
        totalCost: parseFloat(sanitizeInput(totalCost)),
        vat: round(parseFloat(sanitizeInput(vat)) / 100),
        totalCostWithVat: parseFloat(sanitizeInput(totalCostWithVat)),
    }

}

const buildLocation = async (location: string []) => {
    const number = location[0]?.split(separator)[0]
    const [name, type, size, unitMeasure] = location?.[1]?.split(separator).filter(isString)

    if (location.length < 0) {
        return location
    }

    const rawItems = await neatCsv(location.join(EOL), {
        separator,
        skipLines: 3,
        headers: ['dossierId', 'designation', 'unit', 'quantity', 'unitCost', 'totalCost', 'vat', 'totalCostWithVat']
    })
    const items = rawItems
        .filter(({designation}) => isString(designation))
        .map(buildItem)
    return {
        number,
        name,
        type,
        size,
        unitMeasure,
        items
    }
}

const buildPersonalInformation = (lines: string []) => {
    return ["name" + lines[0], lines[1]].map(line => line?.split(separator)
        .filter(isString)
        .map(line => line.trim()))
        .filter(notEmpty)
        .reduce<Record<string, string>>((accumulator, [key, value]) => {
            accumulator[key.toLowerCase()] = value
            return accumulator
        }, {});

}

router.post('/', async (req: Request, res, next) => {
    const {files} = req.body as Request & { fields: Fields, files: Files }
    const file = Object.values(files).shift() as File

    if (!file) {
        const errorMessage = 'File does not exists'
        res.sendStatus(404)
        res.send({errorMessage})
        return
    }

    const data = await readFile( file.path, 'utf8')
    const lines = data.split(EOL)
    const personalInformation = buildPersonalInformation(lines)
    const firstLocal = data.indexOf("Local")
    const localEnding = data.indexOf("TOTAL PLANTAÇÕES")
    const locations = data.substring(firstLocal, localEnding).split("Local")
        .map(local => local.trim())
        .filter(isString)
        .map(location => location.split(EOL))
        .map(location => buildLocation(location))

    const parsedLocations = await Promise.all(locations)
    res.send({locations: parsedLocations, personalInformation})
});

export default router;