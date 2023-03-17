
// converts hex string to Uint8Array
export const fromHexString = (hexString) => Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

// converts array to hex string
export const toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

// converts array to ascii string
export const toAscii = (bytes, cleanString = false) => {
    const ascii = new TextDecoder().decode(bytes)
    return cleanString ? ascii.replace(/\0/g, '').trim() : ascii;
}

// returns the start and end offsets for a given offset + an offset, used to slice arrays i.e x.slice(...getOffsets(offsets.header, 0x00))
export const getOffsets = (offsets, offset = 0x00) => [
    offset + offsets[0],
    offset + offsets[0] + offsets[1]
];

export const toIntLE = (data) => data.reduce((acc, byte, i) => acc + (byte << (i * 8)), 0);
