const puppeteer = require('puppeteer');
const ptp = require('pdf-to-printer');
const path = require('path');

async function printHTML() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial; padding: 20px; }
                h1 { color: #333; }
            </style>
        </head>
        <body>
            <h1>Factura #123</h1>
            <p>Cliente: Juan Pérez</p>
        </body>
        </html>
    `);
    
    const pdfPath = path.join(__dirname, 'temp.pdf');
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
    await browser.close();
    
    // Imprimir directamente
    await ptp.print(pdfPath);
    console.log('Documento enviado a impresora');
}

module.exports = printHTML;