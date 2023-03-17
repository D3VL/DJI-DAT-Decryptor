import FileParser from './core/parse-file.js';
import fs from 'fs';

const OUT = './tempout2';

// make dir OUT
if (!fs.existsSync(OUT)) {
    fs.mkdirSync(OUT);
}

const file = fs.readFileSync('./test.DAT');

const fileParser = new FileParser();

fileParser.parse(file);

const files = fileParser.getFiles();

for (const file of files) {
    const path = file.filePath
        .replace(/\/\//g, '/')
        .split('/')
        .filter((item) => item !== '');

    let currentPath = [OUT]
    let depth = 0;
    for (const dir of path) {
        depth++;
        currentPath.push(dir);
        const currentPathString = currentPath.join('/');

        // if this is the last item, it's a file, not a dir we need to write
        if (depth === path.length) {
            // replace .enc and .empty endings with nothing
            const fileName = currentPathString.replace(/\.enc$/, '').replace(/\.empty$/, '');
            fs.writeFileSync(fileName, file.data);
        } else {
            // check if the dir exists, if not, create it
            if (!fs.existsSync(currentPathString)) {
                fs.mkdirSync(currentPathString);
            }
        }
    }

}
