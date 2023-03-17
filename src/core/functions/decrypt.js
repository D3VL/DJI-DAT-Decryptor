import AES from 'aes-js';
import { keys } from '../../config.js';

const decrypt = (data, productCode) => {
    console.log("Decrypting data for product code: " + productCode);
    console.log("Data length: " + data.length);
    // find the key for the product code
    const found = keys[productCode];
    // if there is no key for the product code, throw an error
    if (!found) throw new Error("No key found for product code: " + productCode);

    // create a new AES object with the key
    const aes = new AES.ModeOfOperation.cbc(found.key, found.iv);

    // decrypt the data
    const decrypted = aes.decrypt(data);

    // return the decrypted data
    return decrypted;
}

export default decrypt;
