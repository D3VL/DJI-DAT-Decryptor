// takes in the raw .DAT file, parses and spits out FileChunks
import ParseLoghItem from './logh-item.js';
import ParseDatItem from './dat-item.js';
import { offsets } from '../config.js';

class FileParser {
    constructor() {
        this.fileChunks = [];
    }

    parse(file) { // file = uint8array of the raw .DAT file
        const fileLength = file.length;
        let currentOffset = 0;
        // sanity check the first byte is 0xA4 
        if (file[0] !== 0xA4) throw new Error("Invalid file");
        console.log(`File length: ${fileLength}`);

        while (currentOffset < fileLength) {
            console.log(`Current offset: ${currentOffset}`);
            // check the first byte of the current offset is 0xA4, if not go to the next byte
            if (file[currentOffset] !== 0xA4) {
                console.log(`Skipping byte at ${currentOffset} as it is not 0xA4`);
                currentOffset++;
                continue;
            }

            const datItem = new ParseDatItem();
            const parsedBytes = datItem.parse(file, currentOffset);

            if (parsedBytes === -1) { // in theory, unreachable code
                console.log(`Skipping byte at ${currentOffset} as it is not a valid DAT item`);
                currentOffset++;
                continue;
            }

            // check if the datItem contains a LOGH item
            if (datItem.data[0] === 0x4C && datItem.data[1] === 0x4F && datItem.data[2] === 0x47 && datItem.data[3] === 0x48) {
                const loghItem = new ParseLoghItem();
                loghItem.parse(datItem.data);

                this.fileChunks.push({
                    filePath: datItem.filePath,
                    data: loghItem.data,
                });
            } else {
                this.fileChunks.push({
                    filePath: datItem.filePath,
                    data: datItem.data
                });
            }


            currentOffset += parsedBytes;
        }

        return this;
    }

    getFiles() {
        return this.fileChunks;
    }
}

export default FileParser;
