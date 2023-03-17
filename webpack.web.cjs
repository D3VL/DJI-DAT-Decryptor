const path = require('path');

module.exports = {
    entry: './src/web.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'decryptor.bundle.js',
        libraryTarget: 'var',
        library: 'DjiDatDecryptor'
    },
    target: 'web',
    mode: 'production',
};
