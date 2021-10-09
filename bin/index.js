#! /usr/bin/env node
const fs = require('fs')
const path = require('path');
const PDFParser = require("pdf2json");


const args = process.argv.slice(2);
const pdfPath = args[0];
if (path.extname(pdfPath) !== '.pdf') {
    console.error(`Extension of provided pdf file "${pdfPath}" is invalid. File should end with ".pdf"`);
    return;
}

const sampleData = {
    startPageIdx: undefined,
    endPageIdx: undefined
};

if (args[1] === '--sample') {
    const startPage = parseInt(args[2]), endPage = parseInt(args[3]);
    if (typeof startPage == 'number' && typeof endPage == 'number') {
        sampleData.startPageIdx = startPage - 1;
        sampleData.endPageIdx = endPage - 1;
    } else {
        console.warn('Provided sample args are incorrect. Please use it like:\np2j <pdf file path> --sample <start page number> <end page number>')
    }
}

function getJsonPath(pdfPath, sampleData) {
    let jsonPath = pdfPath.slice(0, pdfPath.length - 4);
    if (sampleData && sampleData.startPageIdx != undefined) {
        jsonPath += `_p${sampleData.startPageIdx + 1}-p${sampleData.endPageIdx + 1}`;
    }
    return jsonPath + '.json';
}

const pdfParser = new PDFParser();
pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    const pages = pdfData.formImage.Pages.slice(sampleData.startPageIdx, sampleData.endPageIdx);
    getLeafNodesSimplified(pages);
    fs.writeFileSync(getJsonPath(pdfPath, sampleData), JSON.stringify(pages, null, 2), 'utf-8');
});

function getLeafNodesSimplified(obj){
    for (const page of obj) {
        if (page.Texts) {
            for (const textObj of page.Texts) {
                for (const r of textObj.R) {
                    r.T = decodeURIComponent(r.T);
                }
            }
        }
    }
}

pdfParser.loadPDF(pdfPath);
