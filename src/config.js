export const offsets = {
    DAT: {
        magic: [0x00, 0x01], // first byte of header
        dataLength: [0x01, 0x04], // how many bytes of data is there after the DAT header
        unknownA: [0x05, 0x02], // not too sure what these 2 bytes are
        product: [0x07, 0x05], // looks like G-E3T
        filePath: [0x0C, 0xFF], // 255 bytes of file path
        unknownB: [0x10B, 0x10], // not too sure what these 16 bytes are, maybe flags?
    },
    LOGH: {
        magic: [0x00, 0x04], // Always LOGH (4C 4F 47 48)
        unknownC: [0x04, 0x03], // not too sure what these 3 bytes are, padding for the magic?
        dataOffset: [0x08, 0x08], // How long the LOGH header is before we get to the data
        dataLength: [0x10, 0x08], // How long the data is
        modelType: [0x18, 0x10], // Model number of the device
        serialNumber: [0x28, 0x10], // Serial number of the device
        cmacBytes: [0x18, 0x44]
    }
}

export const keys = {
    "e3t_zv900": { // Goggles 2
        key: [181, 44, 153, 102, 153, 211, 91, 20, 228, 205, 88, 106, 232, 120, 176, 109], // -> b52c996699d35b14e4cd586ae878b06d
        iv: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "e3t_wm169": { // Avata and O3 Air Unit
        key: [181, 44, 153, 102, 153, 211, 91, 20, 228, 205, 88, 106, 232, 120, 176, 109], // -> b52c996699d35b14e4cd586ae878b06d
        iv: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}
