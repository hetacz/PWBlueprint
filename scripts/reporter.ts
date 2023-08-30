import * as fs from 'fs';
import Utils from '../src/utils/Utils';

const getDate = (): string => Utils.convertDateToFolderName();

const currentDir1 = 'playwright-report';
const newDir1 = `reports/${(getDate())}/playwright-report`;

const currentDir2 = 'reports/temp';
const newDir2 = `reports/${(getDate())}`;

fs.rename(currentDir1, newDir1, (err) => err && console.error(err));

fs.rename(currentDir2, newDir2, (err) => err && console.error(err));
