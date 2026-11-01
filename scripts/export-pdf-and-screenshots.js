import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'https://eboplast.pages.dev';
const EXPORT_DIR = path.resolve('export');
const PAGES_DIR = path.join(EXPORT_DIR, 'imagenes');

const routes = [
  { name: '01_Home', path: '/' },
  { name: '02_Productos', path: '/productos' },
  { name: '03_Tecnologia', path: '/tecnologia' },
  { name: '04_Servicios', path: '/servicios' },
  { name: '05_Cotizador', path: '/cotizador' },
  { name: '06_Postes_PRFV', path: '/postes-prfv' },
  { name: '07_Compatibilidad_Quimica', path: '/compatibilidad-quimica' },
  { name: '08_Contacto', path: '/contacto' },
];

async function run() {
  console.log(`Iniciando exportación de ${BASE_URL}...`);
  fs.mkdirSync(PAGES_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Helper para hacer scroll y disparar animaciones / lazy loading
  async function autoScroll(p) {
    await p.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 80);
      });
    });
    await new Promise(r => setTimeout(r, 600));
  }

  // 1. Capturas PNG de alta calidad (1440px desktop)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  for (const route of routes) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`Capturando imagen: ${route.name} (${url})`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await autoScroll(page);

    const outPng = path.join(PAGES_DIR, `${route.name}.png`);
    await page.screenshot({ path: outPng, fullPage: true });
    console.log(`  -> Guardado: ${outPng}`);
  }

  // 2. Generar PDF completo de la Home
  console.log('Generando PDF de la Home...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await autoScroll(page);
  const homePdfPath = path.join(EXPORT_DIR, 'eboplast-home.pdf');
  await page.pdf({
    path: homePdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true
  });
  console.log(`  -> Guardado: ${homePdfPath}`);

  await browser.close();
  console.log('Exportación finalizada con éxito.');
}

run().catch(err => {
  console.error('Error durante la exportación:', err);
  process.exit(1);
});
