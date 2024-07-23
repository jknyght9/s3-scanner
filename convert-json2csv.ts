import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'json2csv';

const jsonFilePath = resolve(process.cwd(), 's3_objects.json');
const jsonData = readFileSync(jsonFilePath, 'utf8');
const data = JSON.parse(jsonData);
const csv = parse(data);
const csvFilePath = resolve(process.cwd(), 's3_objects.csv');
writeFileSync(csvFilePath, csv, 'utf8');
console.log(`CSV file written to ${csvFilePath}`);
