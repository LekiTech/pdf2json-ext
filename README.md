# pdf2json-ext
This cli is created for quick parsing pdf into json with sampling option.

## Requirements
Installed Node.js, if it is missing download and install from https://nodejs.org/en/

## Installation
1. Clone project
2. Navigate to folder from terminal and install packages: `npm i`
3. Install this project globally: `npm install -g .`
4. Restart terminal

## How to use
Parse everything to json `p2j <path to pdf file>` e.g.:
```
p2j Словарь_лезгино-русский.pdf
```
The output will be in the same folder and same name as pdf file but with `json` extension

Parse only certain pages  `p2j <path to pdf file> --sample <start page number> <end page number>`:
```
p2j Словарь_лезгино-русский.pdf --sample 1 2
```
The output file name will look like `Словарь_лезгино-русский_p1-p2.json`
