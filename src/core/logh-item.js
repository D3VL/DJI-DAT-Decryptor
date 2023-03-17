import { offsets } from '../config.js';
import decrypt from './functions/decrypt.js';
import { toAscii, getOffsets, toIntLE } from './functions/helpers.js';

class LoghItem {

    constructor() {
        this.isParsed = false;
        this.data = [];
        this.serialNumber = "";
        this.modelType = "";
    }

    parse(data) {
        if (this.isParsed) throw new Error("LoghItem is already parsed");

        // check the first 4 bytes are 0x4C4F4748, our magic number
        if (data[0] !== 0x4C || data[1] !== 0x4F || data[2] !== 0x47 || data[3] !== 0x48) throw new Error("Invalid LOGH");

        // extract the product code
        this.modelType = toAscii(data.slice(...getOffsets(offsets.LOGH.modelType))).replace(/\0/g, '').trim();
        this.serialNumber = toAscii(data.slice(...getOffsets(offsets.LOGH.serialNumber))).replace(/\0/g, '').trim();

        // this is where the data starts
        const dataOffset = toIntLE(data.slice(...getOffsets(offsets.LOGH.dataOffset)));

        // this is how long the data is
        const dataLength = toIntLE(data.slice(...getOffsets(offsets.LOGH.dataLength)));

        // extract the data
        const slicedData = data.slice(dataOffset, dataOffset + dataLength);

        // decrypt the data
        this.data = decrypt(slicedData, this.modelType);

        this.isParsed = true;
    }


}

export default LoghItem;
