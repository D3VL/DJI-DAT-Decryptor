import { zipSync } from 'fflate';
import FileParser from './core/parse-file.js';

export const parseFile = async (fileData) => {
    const fileParser = new FileParser();
    await fileParser.parse(fileData);
    return fileParser.getFiles();
}

export const zipResults = (results) => {
    // clean up the file names
    const cleanedResults = results.map((result) => {
        const filePath = result.filePath
            .split('/') // split on /
            .filter((item) => item !== '') // remove empty items (i.e. //)
            .join('/') // join back together
            .replace(/\.enc$/, ''); // removefrom the file name


        // if file ends with .empty, it's an empty file, make it empty
        if (filePath.endsWith('.empty')) return {
            filePath: filePath.replace(/\.empty$/, ''),
            data: new Uint8Array()
        }

        // else return the data
        return {
            filePath,
            data: result.data
        }
    }).reduce((acc, result) => {
        // convert into a key value pair, zipSync will take care of the folder structure
        acc[result.filePath] = result.data;
        return acc;
    }, {});


    const zipped = zipSync({ ...cleanedResults }, {
        level: 1,
        mtime: new Date()
    });

    return zipped;
}
