import { parse, resolve } from 'node:path';
import { expect, test } from 'vitest';
import { PngPageOutput, pdfToPng } from '../src';

const pdfFilePath: string = resolve('./test-data/large_pdf.pdf');

test(`should apply file mask if defined for pdf file path`, async () => {
    const pngPages: PngPageOutput[] = await pdfToPng(pdfFilePath, {
        outputFileMaskFunc: (pageNumber: number) => `pdf_file_${pageNumber}.png`,
    });

    pngPages.forEach((pngPage: PngPageOutput, index: number) => {
        expect(pngPage.name).to.equal(`pdf_file_${index + 1}.png`);
    });
});

test(`should apply default buffer name if outputFileMaskFunc is not defined for pdf buffer`, async () => {
    const pngPages: PngPageOutput[] = await pdfToPng(pdfFilePath);

    pngPages.forEach((pngPage: PngPageOutput, index: number) => {
        expect(pngPage.name).to.equal(`${parse(pdfFilePath).name}_page_${index + 1}.png`);
    });
});
