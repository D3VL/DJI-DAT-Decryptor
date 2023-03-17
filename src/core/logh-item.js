import { offsets } from '../config.js';
import decrypt from './functions/decrypt.js';
import { toAscii, getOffsets, toIntLE } from './functions/helpers.js';

class LoghItem {

    constructor() {
        this.isParsed = false;
        this.data = [];
        this.cmacBytes = null;
        this.serialNumber = "";
        this.modelType = "";
    }

    async parse(data) {
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

        this.cmacBytes = data.slice(...getOffsets(offsets.LOGH.cmacBytes));

        // decrypt the data
        this.data = await decrypt(slicedData, this.modelType, this.cmacBytes);

        // count how many trailing 0x0C bytes there are for padding
        let padding = 0;
        for (let i = this.data.length - 1; i >= 0; i--) {
            if (this.data[i] === 0x0C) padding++;
            else break;
        }

        // cut the first 0x10 bytes off the data, this is garbage
        this.data = this.data.slice(0x10, this.data.length - padding);

        this.isParsed = true;
    }


}

export default LoghItem;
