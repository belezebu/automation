"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var os_1 = require("os");
var neat_csv_1 = __importDefault(require("neat-csv"));
var fs_1 = require("fs");
var util_1 = require("util");
var busboy_1 = __importDefault(require("busboy"));
var readFile = util_1.promisify(fs_1.readFile);
var separator = ";";
var notEmpty = function (value) {
    return value !== null && value !== undefined;
};
var isString = function (value) {
    return typeof value === 'string' && value.length > 0;
};
var sanitizeInput = function (value) { return value.replace(/[ €%]/g, "").replace(",", "."); };
var round = function (value) { return Math.round(value * 100) / 100; };
var buildItem = function (_a) {
    var dossierId = _a.dossierId, designation = _a.designation, unit = _a.unit, quantity = _a.quantity, unitCost = _a.unitCost, totalCost = _a.totalCost, vat = _a.vat, totalCostWithVat = _a.totalCostWithVat;
    if (designation === 'Total') {
        return {
            designation: designation,
            dossierId: '1',
            totalCost: parseFloat(sanitizeInput(totalCost)),
            totalCostWithVat: parseFloat(sanitizeInput(totalCostWithVat))
        };
    }
    return {
        dossierId: dossierId,
        designation: designation,
        unit: unit,
        quantity: parseInt(quantity),
        unitCost: parseFloat(sanitizeInput(unitCost)),
        totalCost: parseFloat(sanitizeInput(totalCost)),
        vat: round(parseFloat(sanitizeInput(vat)) / 100),
        totalCostWithVat: parseFloat(sanitizeInput(totalCostWithVat)),
    };
};
var buildLocation = function (location) { return __awaiter(void 0, void 0, void 0, function () {
    var locationInfo, number, _a, name, type, size, unitMeasure, rawItems, items;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                locationInfo = location.split(os_1.EOL);
                number = (_b = locationInfo[0]) === null || _b === void 0 ? void 0 : _b.split(separator)[0];
                _a = (_c = locationInfo === null || locationInfo === void 0 ? void 0 : locationInfo[1]) === null || _c === void 0 ? void 0 : _c.split(separator).filter(isString), name = _a[0], type = _a[1], size = _a[2], unitMeasure = _a[3];
                if (locationInfo.length < 0) {
                    return [2 /*return*/, locationInfo];
                }
                return [4 /*yield*/, neat_csv_1.default(locationInfo.join(os_1.EOL), {
                        separator: separator,
                        skipLines: 3,
                        headers: ['dossierId', 'designation', 'unit', 'quantity', 'unitCost', 'totalCost', 'vat', 'totalCostWithVat']
                    })];
            case 1:
                rawItems = _d.sent();
                items = rawItems
                    .filter(function (_a) {
                    var designation = _a.designation;
                    return isString(designation);
                })
                    .map(buildItem);
                return [2 /*return*/, {
                        number: number,
                        name: name,
                        type: type,
                        size: size,
                        unitMeasure: unitMeasure,
                        items: items
                    }];
        }
    });
}); };
var buildPersonalInformation = function (lines) {
    return ["name;" + lines[0], lines[1]].map(function (line) { return line === null || line === void 0 ? void 0 : line.split(separator).filter(isString).map(function (line) { return line.trim(); }); })
        .filter(notEmpty)
        .reduce(function (accumulator, _a) {
        var key = _a[0], value = _a[1];
        accumulator[key.toLowerCase()] = value;
        return accumulator;
    }, {});
};
var parseUploadedFile = function (_a) {
    var body = _a.body, headers = _a.headers, isBase64Encoded = _a.isBase64Encoded;
    return new Promise(function (resolve, reject) {
        var contentType = headers['Content-Type'] || headers['content-type'];
        var busboy = new busboy_1.default({
            headers: {
                'content-type': contentType,
            }
        });
        var result = {};
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            file.on('data', function (data) {
                if (data)
                    result.file += data;
            });
            file.on('end', function () {
                result.filename = filename;
                result.contentType = mimetype;
            });
        });
        busboy.on('error', function (error) { return reject("Parse error: " + error); });
        busboy.on('finish', function () { return resolve(result); });
        busboy.write(body || '', 'utf-8');
        busboy.end();
    });
};
var documentsHandler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var file, errorMessage, data, lines, personalInformation, firstLocal, localEnding, locations, parsedLocations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, parseUploadedFile(event)];
            case 1:
                file = (_a.sent()).file;
                if (!file) {
                    errorMessage = 'File does not exists';
                    return [2 /*return*/, {
                            statusCode: 404,
                            headers: { 'Access-Control-Allow-Origin': '*' },
                            body: JSON.stringify({ errorMessage: errorMessage })
                        }];
                }
                data = file.toString('latin1');
                console.log({ data: data });
                lines = data.split(os_1.EOL);
                personalInformation = buildPersonalInformation(lines);
                firstLocal = data.indexOf("Local");
                localEnding = data.indexOf("TOTAL PLANTAÇÕES");
                locations = data.substring(firstLocal, localEnding).split("Local")
                    .map(function (local) { return local.trim(); })
                    .filter(isString)
                    .map(function (location) { return buildLocation(location); });
                return [4 /*yield*/, Promise.all(locations)];
            case 2:
                parsedLocations = _a.sent();
                console.log({ locations: parsedLocations, personalInformation: personalInformation });
                return [2 /*return*/, {
                        statusCode: 200,
                        headers: { 'Access-Control-Allow-Origin': '*' },
                        body: JSON.stringify({ locations: parsedLocations, personalInformation: personalInformation })
                    }];
        }
    });
}); };
exports.handler = documentsHandler;
