# DJI .DAT Decryption Tool

This tool is used to decrypt the .DAT files exported by DJI assistant. 

Currently only supports the following models:
- DJI Goggles 2
- DJI O3 Air Unit
- DJI Avata

## Usage

#### Web 
Visit https://dji-dat-decryptor.d3vl.com/

#### CLI
download the latest release from [here](https://github.com/D3VL/DJI-DAT-Decryptor/releases) and run the following command

```bash
node dji-dat-decryptor.js <path to .DAT file> <folder output>
```

## Building

```bash
npm install --include=dev

# build for web
npm run build::web

# build for cli
npm run build::cli
```

## Thanks
Massive thanks to Joonas @j005u from [fpv.wtf](https://fpv.wtf/) without whom this would not have been possible.