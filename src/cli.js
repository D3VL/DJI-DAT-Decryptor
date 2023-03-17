import FileParser from './core/parse-file.js';
import fs from 'fs';

// get parameter 0 for input file
const IN = process.argv[2];
const OUT = process.argv[3];

if ((!IN || !OUT) || (IN === '--help' || IN === '-h')) {
    console.log("DJI DAT Decryptor by D3VL");
    console.log("Usage: node dji-dat-decryptor <input file> <output dir>");
    process.exit(1);
}

const file = fs.readFileSync(IN);

(async () => {
    console.log("Parsing file");
    console.log("This may take a while, please be patient...");

    const fileParser = new FileParser();

    try {
        await fileParser.parse(file);
    } catch (e) {
        console.log(e.toString());
        process.exit(1);
    }

    const files = fileParser.getFiles();

    // make dir OUT
    if (!fs.existsSync(OUT)) {
        console.log("Creating output directory");
        fs.mkdirSync(OUT);
    }

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

                // remove .enc and .empty from the file name
                const filePathClean = currentPathString.replace(/\.enc$/, '').replace(/\.empty$/, '');

                // if file ends with .empty, it's an empty file, make it empty
                if (currentPathString.endsWith('.empty')) {
                    fs.writeFileSync(filePathClean, '');
                } else {
                    fs.writeFileSync(filePathClean, file.data);
                }

                console.log("Wrote file: " + filePathClean);
            } else {
                // check if the dir exists, if not, create it
                if (!fs.existsSync(currentPathString)) {
                    console.log("Creating directory: " + currentPathString);
                    fs.mkdirSync(currentPathString);
                }
            }
        }
    }

    console.log("Done!");
    console.log("Files written to: " + OUT);
})();
