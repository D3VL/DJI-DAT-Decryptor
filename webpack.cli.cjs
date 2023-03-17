const path = require('path');

module.exports = {
    entry: './src/cli.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dji-dat-decryptor.js',
    },
    target: 'node',
    mode: 'production',
};
