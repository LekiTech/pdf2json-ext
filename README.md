# pdf2json-ext
This cli is created for quick parsing pdf into json with sampling option using [pdf2json](https://github.com/modesty/pdf2json) package

## Requirements
Installed Node.js, if it is missing download and install from https://nodejs.org/en/

## Installation
1. Clone project
2. Navigate to folder from terminal and install packages: `npm i`
3. Install this project globally: `npm install -g .`
4. Restart terminal

## How to use
Parse everything to json by typing in terminal `p2j <path to pdf file>` e.g.:
```
p2j Словарь_лезгино-русский.pdf
```
The output will be in the same folder and same name as pdf file but with `json` extension

Parse only certain pages  `p2j <path to pdf file> --sample <start page number> <end page number>`:
```
p2j Словарь_лезгино-русский.pdf --sample 1 2
```
The output file name will look like `Словарь_лезгино-русский_p1-p2.json`

## Output JSON format
As defined in https://github.com/modesty/pdf2json:
> ### Page object Reference

> Each page object within 'Pages' array describes page elements and attributes with 5 main fields:
> 
> * 'Height': height of the page in page unit
> * 'HLines': horizontal line array, each line has 'x', 'y' in relative coordinates for positioning, and 'w' for width, plus 'l' for length. Both width and length are in page unit
> * 'Vline': vertical line array, each line has 'x', 'y' in relative coordinates for positioning, and 'w' for width, plus 'l' for length. Both width and length are in page unit;
>     * v0.4.3 added Line color support. Default is 'black', other wise set in 'clr' if found in color dictionary, or 'oc' field if not found in dictionary;
>     * v0.4.4 added dashed line support. Default is 'solid', if line style is dashed line, {dsh:1} is added to line object;
> * 'Fills': an array of rectangular area with solid color fills, same as lines, each 'fill' object has 'x', 'y' in relative coordinates for positioning, 'w' and 'h' for width and height in page unit, plus 'clr' to reference a color with index in color dictionary. More info about 'color dictionary' can be found at 'Dictionary Reference' section.
> * 'Texts': an array of text blocks with position, actual text and styling information:
>     * 'x' and 'y': relative coordinates for positioning
>     * 'clr': a color index in color dictionary, same 'clr' field as in 'Fill' object. If a color can be found in color dictionary, 'oc' field will be added to the field as 'original color" value.
>     * 'A': text alignment, including:
>         * left
>         * center
>         * right
>     * 'R': an array of text run, each text run object has two main fields:
>         * 'T': actual text
>         * 'S': style index from style dictionary. More info about 'Style Dictionary' can be found at 'Dictionary Reference' section
>         * 'TS': [fontFaceId, fontSize, 1/0 for bold, 1/0 for italic]
> 
> v0.4.5 added support when fields attributes information is defined in external xml file. pdf2json will always try load field attributes xml file based on file name convention (pdfFileName.pdf's field XML file must be named pdfFileName_fieldInfo.xml in the same directory). If found, fields info will be injected.
