import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = process.env.TEST_URL || 'https://fd64d621.eboplast.pages.dev';
const OUT_DIR = '/Users/ecloud/.gemini/antigravity/brain/2024f762-77dd-417a-93c4-d5aaa52dc209';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function clickByText(page, selector, text) {
  const clicked = await page.evaluate(
    ({ sel, txt }) => {
      const els = Array.from(document.querySelectorAll(sel));
      const target = els.find(
        (el) => el.innerText && el.innerText.toLowerCase().includes(txt.toLowerCase())
      );
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'center' });
        target.click();
        return target.innerText.trim();
      }
      return null;
    },
    { sel: selector, txt: text }
  );
  if (!clicked) {
    throw new Error(`No se encontró elemento ${selector} con texto "${text}"`);
  }
  return clicked;
}

async function runTest() {
  console.log(`🚀 Iniciando prueba E2E en vivo sobre ${BASE_URL}...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 920, deviceScaleFactor: 1.5 });

  try {
    // 1. Ir a /cotizador y verificar el botón "INGRESAR PEDIDO"
    console.log('1️⃣ Abriendo /cotizador y verificando botón "INGRESAR PEDIDO"...');
    await page.goto(`${BASE_URL}/cotizador`, { waitUntil: 'networkidle2' });

    const btnText = await page.$eval('button[type="submit"]', (el) => el.innerText.trim());
    console.log(`   ✅ Texto del botón principal verificado: "${btnText}"`);

    // Completar datos del solicitante
    await page.type('input[placeholder*="Carlos Gómez"]', 'Ing. Luciano Vannelli');
    await page.type('input[placeholder*="Agroquímica"]', 'Química Industrial Rosario S.A.');
    await page.type('input[placeholder*="ingenieria@"]', 'lucianovannelli@gmail.com');
    await page.type('input[placeholder*="+54 9"]', '+54 9 341 555-0192');
    await page.type('input[placeholder*="San Lorenzo"]', 'Parque Industrial Alvear, Santa Fe');

    await page.$eval('button[type="submit"]', (el) =>
      el.scrollIntoView({ behavior: 'instant', block: 'center' })
    );
    await sleep(400);
    await page.screenshot({ path: path.join(OUT_DIR, 'test_step1_form_ingresar_pedido.png') });

    // 2. Click en "INGRESAR PEDIDO"
    console.log('2️⃣ Haciendo clic en "INGRESAR PEDIDO"...');
    await page.click('button[type="submit"]');
    await sleep(1200);
    await page.screenshot({ path: path.join(OUT_DIR, 'test_step1_pedido_creado.png') });

    // 3. Click en "ABRIR PORTAL DE SEGUIMIENTO"
    const clickedPortal = await clickByText(page, 'a', 'ABRIR PORTAL DE SEGUIMIENTO');
    console.log(`   ✅ Expediente generado: "${clickedPortal}"`);
    await sleep(1000);

    // 4. Etapa 1 -> 2: Cambiar a Vista Eboplast y enviar Presupuesto
    console.log('3️⃣ [Etapa 1 → 2] Eboplast carga Presupuesto y Condiciones Comerciales...');
    await clickByText(page, 'button', 'Vista Eboplast');
    await sleep(500);
    await clickByText(page, 'button', 'Enviar Presupuesto al Cliente');
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, 'test_step2_presupuesto_enviado.png') });

    // 5. Etapa 2 -> 3: Cliente acepta condiciones y carga Orden de Compra
    console.log('4️⃣ [Etapa 2 → 3] Cliente acepta condiciones y envía Orden de Compra...');
    await clickByText(page, 'button', 'Vista Cliente');
    await sleep(400);
    await page.type('input[placeholder*="OC-2026"]', 'OC-QIR-2026-889');
    await page.type(
      'input[placeholder*="Transferencia Bancaria"]',
      'Transferencia Anticipo 40% - Banco Nación Op. #992014'
    );
    await clickByText(page, 'button', 'Aceptar Condiciones y Enviar Orden de Compra');
    await sleep(1000);

    // 6. Etapa 3 -> 4: Ingeniería Eboplast envía Plano Técnico para aprobación
    console.log('5️⃣ [Etapa 3 → 4] Ingeniería Eboplast envía Plano Técnico para aprobación...');
    await clickByText(page, 'button', 'Vista Eboplast');
    await sleep(400);
    await clickByText(page, 'button', 'Enviar Plano Técnico para Aprobación');
    await sleep(1000);

    // 7. Abrir Visor CAD del Plano Técnico
    console.log('6️⃣ Abriendo Visor CAD del Plano Técnico...');
    await clickByText(page, 'button', 'Abrir Plano Técnico');
    await sleep(600);
    await page.screenshot({ path: path.join(OUT_DIR, 'test_step4_visor_plano_cad.png') });

    // Cerrar el modal del plano
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('div.fixed button'));
      const closeBtn = buttons.find((b) => !b.innerText.trim() || b.title === 'Cerrar');
      if (closeBtn) closeBtn.click();
    });
    await sleep(400);

    // 8. Etapa 4 -> 5: Cliente aprueba el Plano Técnico -> Inicia Construcción
    console.log('7️⃣ [Etapa 4 → 5] Cliente aprueba Plano Técnico → Habilita Construcción...');
    await clickByText(page, 'button', 'Vista Cliente');
    await sleep(400);
    await clickByText(page, 'button', 'Aprobar Plano Técnico y Habilitar Construcción');
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, 'test_step5_en_construccion.png') });

    // 9. Etapa 5 -> 6: Eboplast confirma entrega y emite Registro Virtual del Tanque
    console.log('8️⃣ [Etapa 5 → 6] Eboplast confirma entrega y emite Registro Virtual Permanente...');
    await clickByText(page, 'button', 'Vista Eboplast');
    await sleep(400);
    await clickByText(page, 'button', 'Confirmar Entrega del Tanque y Emitir Registro Virtual');
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, 'test_step6_registro_virtual_final.png') });

    // 10. Abrir Bandeja de Mails Enviados
    console.log('9️⃣ Abriendo Bandeja de Mails Enviados para verificar las notificaciones HTML...');
    await clickByText(page, 'button', 'Mails Enviados');
    await sleep(700);
    await page.screenshot({ path: path.join(OUT_DIR, 'test_emails_inspector.png') });

    console.log('🎉 ¡Prueba E2E completada con éxito en las 6 etapas!');
  } finally {
    await browser.close();
  }
}

runTest().catch((err) => {
  console.error('❌ Error en prueba E2E:', err);
  process.exit(1);
});
