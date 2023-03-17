import { offsets } from '../config.js';
import { toAscii, getOffsets, toIntLE } from './functions/helpers.js';

const headerLength = 0x11B;

class DatItem {

    constructor() {
        this.isParsed = false;
        this.data = [];
        this.product = "";
        this.filePath = "";
    }

    parse(datain, offset = 0) { // returns the number of bytes parsed, -1 if error
        if (this.isParsed) return -1;
        // check the first byte is 0xA4, our magic number
        if (datain[0] !== 0xA4) return -1;

        // extract 
        this.product = toAscii(datain.slice(...getOffsets(offsets.DAT.product, offset)), true);
        this.filePath = toAscii(datain.slice(...getOffsets(offsets.DAT.filePath, offset)), true);

        const dataLength = toIntLE(datain.slice(...getOffsets(offsets.DAT.dataLength, offset)));

        this.data = datain.slice(offset + headerLength, offset + headerLength + dataLength);

        this.isParsed = true;

        return dataLength + headerLength;
    }


}

export default DatItem;
