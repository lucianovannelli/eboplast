import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = process.argv[2] || 'https://eboplast.pages.dev';
const TARGET_DIR = process.argv[3] || 'before';

const routes = [
  { name: 'home', path: '/' },
  { name: 'tecnologia', path: '/tecnologia' },
  { name: 'productos', path: '/productos' },
  { name: 'compatibilidad-quimica', path: '/compatibilidad-quimica' },
  { name: 'postes-prfv', path: '/postes-prfv' },
  { name: 'servicios', path: '/servicios' },
  { name: 'cotizador', path: '/cotizador' },
  { name: 'contacto', path: '/contacto' },
];

async function run() {
  console.log(`Starting screenshots for ${BASE_URL} into folder: screenshots/${TARGET_DIR}`);
  fs.mkdirSync(`screenshots/${TARGET_DIR}/desktop`, { recursive: true });
  fs.mkdirSync(`screenshots/${TARGET_DIR}/mobile`, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

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
        }, 100);
      });
    });
    await new Promise(r => setTimeout(r, 600));
  }

  // Desktop captures
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  for (const route of routes) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`Capturing Desktop: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await autoScroll(page);
    const outPath = `screenshots/${TARGET_DIR}/desktop/${route.name}.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved -> ${outPath}`);
  }

  // Mobile captures
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  for (const route of routes) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`Capturing Mobile: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await autoScroll(page);
    const outPath = `screenshots/${TARGET_DIR}/mobile/${route.name}.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved -> ${outPath}`);
  }

  await browser.close();
  console.log('Finished capturing all screenshots!');
}

run().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
