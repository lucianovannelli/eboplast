import { companyInfo } from '../data/eboplastData';

const STORAGE_KEY_ORDERS = 'eboplast_workflow_orders_v1';
const STORAGE_KEY_EMAILS = 'eboplast_workflow_emails_v1';
const STORAGE_KEY_EMAIL_CONFIG = 'eboplast_workflow_email_config_v1';

export const WORKFLOW_STAGES = [
  {
    step: 1,
    id: 'cotizacion_solicitada',
    shortLabel: 'Pedido Cotización',
    title: '1. Pedido de Cotización / Requerimiento',
    actor: 'Cliente',
    description: 'El cliente ingresa el requerimiento técnico con especificaciones de fluido, volumen y formato.',
  },
  {
    step: 2,
    id: 'presupuesto_enviado',
    shortLabel: 'Presupuesto',
    title: '2. Presupuesto y Condiciones Comerciales',
    actor: 'Eboplast S.A.',
    description: 'Eboplast envía la cotización formal con precio, plazos, normas constructivas y condiciones.',
  },
  {
    step: 3,
    id: 'oc_recibida',
    shortLabel: 'Orden de Compra',
    title: '3. Orden de Compra / Comprobante',
    actor: 'Cliente',
    description: 'El cliente acepta las condiciones comerciales y adjunta su Orden de Compra o comprobante.',
  },
  {
    step: 4,
    id: 'plano_en_aprobacion',
    shortLabel: 'Aprobación Plano',
    title: '4. Envío y Aprobación de Plano Técnico',
    actor: 'Eboplast ↔ Cliente',
    description: 'Ingeniería envía el plano técnico de fabricación y el cliente lo aprueba antes de construir.',
  },
  {
    step: 5,
    id: 'en_construccion',
    shortLabel: 'Construcción',
    title: '5. Fabricación en Planta (Filament Winding)',
    actor: 'Eboplast S.A.',
    description: 'Con el plano aprobado, se inicia el bobinado continuo sin soldadura entre fondo y cilindro.',
  },
  {
    step: 6,
    id: 'entregado_registro',
    shortLabel: 'Registro Virtual',
    title: '6. Tanque Entregado · Registro Virtual Permanente',
    actor: 'Legajo Digital',
    description: 'Entrega finalizada. Queda el registro virtual perpetuo con todos los documentos, serie y garantía.',
  },
];

export const DEFAULT_MILESTONES = [
  {
    id: 'm1',
    title: '1. Preparación de Matriz y Barrera Química Interior',
    desc: 'Aplicación de gelcoat/velo rico en resina según fluido químico.',
    done: false,
    date: null,
  },
  {
    id: 'm2',
    title: '2. Bobinado Filament Winding (Fondo y Cilindro Monolítico)',
    desc: 'Conformado en una sola pieza sin soldadura entre fondo y cilindro para disminuir riesgo de ataque químico.',
    done: false,
    date: null,
  },
  {
    id: 'm3',
    title: '3. Colocación de Casquete Superior, Bridas y Accesorios',
    desc: 'Soldadura superior a 0 kPa, bocas de inspección, escalera y banda traslúcida.',
    done: false,
    date: null,
  },
  {
    id: 'm4',
    title: '4. Control de Calidad, Dureza Barcol y Prueba de Estanqueidad',
    desc: 'Verificación dimensional según norma aplicable y liberación para despacho.',
    done: false,
    date: null,
  },
];

const INITIAL_DEMO_ORDERS = [
  {
    code: 'EBO-2026-1048',
    createdAt: '2026-10-12T09:15:00-03:00',
    updatedAt: '2026-10-18T14:30:00-03:00',
    currentStep: 4,
    stageId: 'plano_en_aprobacion',
    blueprintStatus: 'pendiente_cliente', // 'pendiente_cliente' | 'observado' | 'aprobado'
    client: {
      name: 'Ing. Martín Ferraro',
      company: 'Agroquímica del Litoral S.A.',
      cuit: '30-71248910-4',
      email: 'mferraro@agrolitoral.com.ar',
      phone: '+54 9 341 582-9104',
      location: 'Parque Industrial San Lorenzo, Santa Fe',
    },
    technicalSpec: {
      format: 'Vertical Cilíndrico (Fondo Plano)',
      capacityLiters: 50000,
      diameter: '4.000 mm',
      height: '4.780 mm',
      fluid: 'Fertilizante Líquido UAN 32 / SolMix',
      density: '1.32 g/cm³',
      temperature: '45 °C máx.',
      accessories: [
        'Escalera c/ Guardahombre',
        'Banda Traslúcida de Nivel',
        'Brida de Carga y Descarga 3" ANSI 150',
        'Boca Paso Hombre Ø 500 mm',
      ],
      notes: 'Necesitamos que la brida de descarga esté orientada a 0° respecto a la escalera de acceso.',
      attachment: {
        name: 'Croquis_Playa_Tanques_SanLorenzo.pdf',
        type: 'application/pdf',
        size: '412 KB',
        uploadedAt: '2026-10-12T09:15:00-03:00',
        docType: 'spec',
      },
    },
    quote: {
      quoteNumber: 'PRE-2026-0891',
      sentAt: '2026-10-14T11:20:00-03:00',
      amount: '28.400',
      currency: 'USD',
      taxNote: '+ IVA (10.5% Bien de Capital)',
      deliveryTime: '30 a 35 días desde aprobación de plano',
      paymentTerms: '40% Anticipo con Orden de Compra / 30% a los 15 días / 30% contra aviso de listo para despacho',
      validity: '15 días corridos',
      standardApplied: 'ASTM D3299 / CIRSOC 102',
      resinSelected: 'Viniléster / Isoftálica Reforzada para UAN',
      warranty: '1 Año de Garantía Escrita de Fábrica',
      conditionsNotes: 'Incluye cáncamos de izaje, anclajes calculados por viento según CIRSOC 102 y carga sobre carretón en planta Rosario.',
      file: {
        name: 'Presupuesto_Eboplast_PRE-2026-0891.pdf',
        type: 'application/pdf',
        size: '620 KB',
        uploadedAt: '2026-10-14T11:20:00-03:00',
        docType: 'quote',
      },
    },
    purchaseOrder: {
      poNumber: 'OC-44910',
      uploadedAt: '2026-10-16T16:05:00-03:00',
      acceptedBy: 'Ing. Martín Ferraro (Jefe de Planta)',
      paymentReference: 'Transferencia Anticipo 40% - Banco Nación Op. #8839201',
      notes: 'Adjuntamos Orden de Compra autorizada por directorio y comprobante de transferencia de anticipo.',
      file: {
        name: 'Orden_De_Compra_OC-44910_AgroLitoral.pdf',
        type: 'application/pdf',
        size: '385 KB',
        uploadedAt: '2026-10-16T16:05:00-03:00',
        docType: 'po',
      },
    },
    blueprint: {
      drawingNumber: 'PL-EBO-1048-RevA',
      revision: 'Rev. A',
      sentAt: '2026-10-18T14:30:00-03:00',
      engineer: 'Dpto. Ingeniería Eboplast S.A.',
      notes: 'Plano general de fabricación para Tanque Vertical 50 m³ (Ø 4.000 x H 4.780 mm). Fondo y cilindro monolítico sin soldadura inferior. Verificar posición de brida de descarga de 3" y orientación de escalera a 0°.',
      specs: {
        diameter: '4.000 mm',
        cylinderHeight: '4.200 mm',
        totalHeight: '4.780 mm',
        wallThicknessBase: '14.5 mm',
        wallThicknessTop: '7.0 mm',
        nozzles: 'Carga 3" / Descarga 3" / Venteo 4" / Rebalse 3" / Paso Hombre 20"',
      },
      file: {
        name: 'Plano_Tecnico_PL-EBO-1048-RevA.pdf',
        type: 'application/pdf',
        size: '1.1 MB',
        uploadedAt: '2026-10-18T14:30:00-03:00',
        docType: 'blueprint',
      },
      approval: null,
      observations: [],
    },
    production: {
      startedAt: null,
      estimatedReadyDate: null,
      milestones: DEFAULT_MILESTONES,
    },
    virtualRecord: null,
    timeline: [
      {
        id: 'ev-1',
        date: '2026-10-12T09:15:00-03:00',
        step: 1,
        actor: 'Cliente (Ing. Martín Ferraro)',
        title: 'Pedido de Cotización Ingresado',
        detail: 'Requerimiento técnico para Tanque Vertical 50.000 L (Fertilizante UAN 32). Email disparado a Eboplast y al cliente.',
      },
      {
        id: 'ev-2',
        date: '2026-10-14T11:20:00-03:00',
        step: 2,
        actor: 'Eboplast S.A. (Comercial)',
        title: 'Presupuesto Formal PRE-2026-0891 Enviado',
        detail: 'Cotización por USD 28.400 + IVA con condiciones comerciales adjuntas. Email enviado a mferraro@agrolitoral.com.ar.',
      },
      {
        id: 'ev-3',
        date: '2026-10-16T16:05:00-03:00',
        step: 3,
        actor: 'Cliente (Ing. Martín Ferraro)',
        title: 'Orden de Compra OC-44910 Recibida',
        detail: 'Cliente aceptó condiciones y adjuntó Orden de Compra + comprobante. Email disparado a Administración e Ingeniería.',
      },
      {
        id: 'ev-4',
        date: '2026-10-18T14:30:00-03:00',
        step: 4,
        actor: 'Eboplast S.A. (Oficina Técnica)',
        title: 'Plano Técnico PL-EBO-1048-RevA Enviado para Aprobación',
        detail: 'Plano cargado en portal y notificado por correo electrónico. Esperando conformidad del cliente para iniciar bobinado.',
      },
    ],
  },
  {
    code: 'EBO-2026-1035',
    createdAt: '2026-09-02T10:00:00-03:00',
    updatedAt: '2026-10-10T17:00:00-03:00',
    currentStep: 6,
    stageId: 'entregado_registro',
    blueprintStatus: 'aprobado',
    client: {
      name: 'Ing. Laura Benítez',
      company: 'Lácteos San Carlos S.R.L.',
      cuit: '30-68912045-9',
      email: 'ingenieria@lacteossancarlos.com.ar',
      phone: '+54 9 342 478-3310',
      location: 'Ruta Prov. 6 Km 24, San Carlos Centro, Santa Fe',
    },
    technicalSpec: {
      format: 'Vertical Sanitario con Aislación Térmica',
      capacityLiters: 30000,
      diameter: '3.000 mm',
      height: '4.720 mm',
      fluid: 'Leche Cruda y Suero Lácteo (Grado Alimenticio)',
      density: '1.04 g/cm³',
      temperature: '4 °C a 45 °C (Lavado CIP)',
      accessories: [
        'Aislación Térmica (Poliuretano 2")',
        'Piso Inclinado Drenaje Total',
        'Bocha Rotativa CIP Spray-Ball Inox',
        'Escalera c/ Guardahombre',
      ],
      notes: 'Terminación interior espejo sanitaria para limpieza CIP diaria.',
      attachment: {
        name: 'Especificacion_Sanitaria_Planta_LSC.pdf',
        type: 'application/pdf',
        size: '290 KB',
        uploadedAt: '2026-09-02T10:00:00-03:00',
        docType: 'spec',
      },
    },
    quote: {
      quoteNumber: 'PRE-2026-0814',
      sentAt: '2026-09-04T12:10:00-03:00',
      amount: '24.900',
      currency: 'USD',
      taxNote: '+ IVA (10.5%)',
      deliveryTime: '30 días desde aprobación de plano',
      paymentTerms: '50% Anticipo con OC / 50% contra entrega en planta',
      validity: '15 días',
      standardApplied: 'ASTM / ASME / IRAM / CIRSOC',
      resinSelected: 'Isoftálica de Grado Sanitario Alimenticio y otras',
      warranty: '1 Año de Garantía Escrita de Fábrica',
      conditionsNotes: 'Incluye aislación térmica de espuma de poliuretano de alta densidad y revestimiento exterior PRFV.',
      file: {
        name: 'Presupuesto_Eboplast_PRE-2026-0814.pdf',
        type: 'application/pdf',
        size: '540 KB',
        uploadedAt: '2026-09-04T12:10:00-03:00',
        docType: 'quote',
      },
    },
    purchaseOrder: {
      poNumber: 'OC-LSC-2026-119',
      uploadedAt: '2026-09-07T09:45:00-03:00',
      acceptedBy: 'Ing. Laura Benítez (Gerencia Técnica)',
      paymentReference: 'Comprobante Echeq / Transferencia Banco Santa Fe #441902',
      notes: 'Orden de compra aprobada. Favor enviar plano de implantación de boquillas sanitarias.',
      file: {
        name: 'OC-LSC-2026-119_Firmada.pdf',
        type: 'application/pdf',
        size: '310 KB',
        uploadedAt: '2026-09-07T09:45:00-03:00',
        docType: 'po',
      },
    },
    blueprint: {
      drawingNumber: 'PL-EBO-1035-RevA',
      revision: 'Rev. A (Aprobado)',
      sentAt: '2026-09-09T15:00:00-03:00',
      engineer: 'Dpto. Ingeniería Eboplast S.A.',
      notes: 'Plano constructivo Tanque Lácteo 30 m³ con pendiente de fondo 3%, boca sanitaria inox paso hombre y cuadro CIP.',
      specs: {
        diameter: '3.000 mm',
        cylinderHeight: '4.150 mm',
        totalHeight: '4.720 mm',
        wallThicknessBase: '12.0 mm + 50 mm PU',
        wallThicknessTop: '6.5 mm + 50 mm PU',
        nozzles: 'Entrada CIP 2" / Descarga Sanitaria 3" / Nivel / Respiradero Sanitario',
      },
      file: {
        name: 'Plano_Aprobado_PL-EBO-1035-RevA.pdf',
        type: 'application/pdf',
        size: '980 KB',
        uploadedAt: '2026-09-09T15:00:00-03:00',
        docType: 'blueprint',
      },
      approval: {
        approvedBy: 'Ing. Laura Benítez',
        role: 'Gerente de Ingeniería y Mantenimiento',
        approvedAt: '2026-09-11T10:22:00-03:00',
        comment: 'Plano verificado y aprobado sin observaciones. Cotas de bridas sanitarias coinciden con cañería existente.',
        digitalSignatureHash: 'SHA256-9F82A10C4E8B-EBOPLAST',
      },
      observations: [],
    },
    production: {
      startedAt: '2026-09-12T08:00:00-03:00',
      estimatedReadyDate: '2026-10-08',
      milestones: [
        {
          id: 'm1',
          title: '1. Preparación de Matriz y Barrera Química Interior',
          desc: 'Acabado espejo sanitario apto alimentos.',
          done: true,
          date: '16/09/2026',
        },
        {
          id: 'm2',
          title: '2. Bobinado Filament Winding (Fondo y Cilindro Monolítico)',
          desc: 'Conformado en una sola pieza sin soldadura entre fondo y cilindro.',
          done: true,
          date: '23/09/2026',
        },
        {
          id: 'm3',
          title: '3. Aislación Térmica Poliuretano 2" y Accesorios Inox',
          desc: 'Inyección de poliuretano y colocación de bocas sanitarias.',
          done: true,
          date: '01/10/2026',
        },
        {
          id: 'm4',
          title: '4. Control de Calidad, Dureza Barcol y Prueba Hidrostática',
          desc: 'Ensayo 100% aprobado sin filtraciones.',
          done: true,
          date: '07/10/2026',
        },
      ],
    },
    virtualRecord: {
      serialNumber: 'SN-EBO-1978-4821',
      deliveryDate: '10/10/2026',
      warrantyExpiration: '10/10/2027 (Garantía Escrita 1 Año)',
      resinBatch: 'LOTE-ISO-SAN-2026-992',
      glassFiberBatch: 'ROVING-EGLASS-4410',
      barcolHardness: '42 Barcol (Aprobado > 38)',
      hydrostaticTest: 'APROBADO (24 hs a carga máxima - 0% pérdidas)',
      dispatchRemito: 'Remito Oficial N° 0004-00019284',
      receivedBy: 'Ing. Laura Benítez — Planta San Carlos Centro',
      normApplied: 'ASTM / ASME / IRAM / CIRSOC',
      certificateFile: {
        name: 'Certificado_Garantia_y_Calidad_SN-EBO-1978-4821.pdf',
        type: 'application/pdf',
        size: '750 KB',
        uploadedAt: '2026-10-10T17:00:00-03:00',
        docType: 'certificate',
      },
    },
    timeline: [
      {
        id: 'ev-101',
        date: '2026-09-02T10:00:00-03:00',
        step: 1,
        actor: 'Cliente (Ing. Laura Benítez)',
        title: 'Pedido de Cotización Ingresado',
        detail: 'Solicitud para Tanque Vertical Lácteo 30.000 L con aislación térmica.',
      },
      {
        id: 'ev-102',
        date: '2026-09-04T12:10:00-03:00',
        step: 2,
        actor: 'Eboplast S.A. (Comercial)',
        title: 'Presupuesto PRE-2026-0814 Enviado',
        detail: 'Presupuesto y condiciones comerciales enviadas vía email.',
      },
      {
        id: 'ev-103',
        date: '2026-09-07T09:45:00-03:00',
        step: 3,
        actor: 'Cliente (Ing. Laura Benítez)',
        title: 'Orden de Compra OC-LSC-2026-119 Cargada',
        detail: 'Recepción de OC y comprobante de anticipo.',
      },
      {
        id: 'ev-104',
        date: '2026-09-09T15:00:00-03:00',
        step: 4,
        actor: 'Eboplast S.A. (Ingeniería)',
        title: 'Plano Técnico PL-EBO-1035-RevA Enviado',
        detail: 'Envío de plano constructivo para revisión del cliente.',
      },
      {
        id: 'ev-105',
        date: '2026-09-11T10:22:00-03:00',
        step: 5,
        actor: 'Cliente (Ing. Laura Benítez)',
        title: 'Plano Técnico Aprobado Formalmente',
        detail: 'Aprobación digital registrada. Pasa a fabricación en nave Rosario.',
      },
      {
        id: 'ev-106',
        date: '2026-10-10T17:00:00-03:00',
        step: 6,
        actor: 'Eboplast S.A. (Calidad y Despacho)',
        title: 'Tanque Entregado y Registro Virtual Emitido',
        detail: 'Equipo N° Serie SN-EBO-1978-4821 entregado en planta. Legajo virtual perpetuo habilitado.',
      },
    ],
  },
  {
    code: 'EBO-2026-1051',
    createdAt: '2026-10-19T10:15:00-03:00',
    updatedAt: '2026-10-19T16:40:00-03:00',
    currentStep: 2,
    stageId: 'presupuesto_enviado',
    blueprintStatus: 'sin_enviar',
    client: {
      name: 'Ing. Roberto Salgado',
      company: 'Química Industrial del Sur S.A.',
      cuit: '30-70991823-1',
      email: 'compras@quimicasur.com.ar',
      phone: '+54 9 11 4920-8812',
      location: 'Polo Petroquímico Bahía Blanca, Buenos Aires',
    },
    technicalSpec: {
      format: 'Vertical Cilíndrico (Fondo Plano)',
      capacityLiters: 25000,
      diameter: '2.740 mm',
      height: '4.790 mm',
      fluid: 'Ácido Clorhídrico (HCl 33%)',
      density: '1.18 g/cm³',
      temperature: '60 °C máx.',
      accessories: [
        'Velo Sintético Antiácido Interior',
        'Escalera c/ Guardahombre PRFV',
        'Banda Traslúcida de Nivel',
        'Venteo con Lavador de Gases',
      ],
      notes: 'Requerimos fabricación sin soldadura entre fondo y cilindro para minimizar riesgo de ataque químico por HCl.',
      attachment: null,
    },
    quote: {
      quoteNumber: 'PRE-2026-0904',
      sentAt: '2026-10-19T16:40:00-03:00',
      amount: '19.850',
      currency: 'USD',
      taxNote: '+ IVA (10.5%)',
      deliveryTime: '25 a 30 días desde aprobación de plano',
      paymentTerms: '40% Anticipo con Orden de Compra / 60% previo al despacho',
      validity: '15 días corridos',
      standardApplied: 'ASTM / BS / ASME / CIRSOC',
      resinSelected: 'Viniléster de Alta Resistencia Química y otras',
      warranty: '1 Año de Garantía Escrita de Fábrica',
      conditionsNotes: 'Doble barrera química interior rica en resina viniléster sin soldadura entre fondo y cilindro.',
      file: {
        name: 'Presupuesto_Eboplast_PRE-2026-0904.pdf',
        type: 'application/pdf',
        size: '590 KB',
        uploadedAt: '2026-10-19T16:40:00-03:00',
        docType: 'quote',
      },
    },
    purchaseOrder: null,
    blueprint: null,
    production: {
      startedAt: null,
      estimatedReadyDate: null,
      milestones: DEFAULT_MILESTONES,
    },
    virtualRecord: null,
    timeline: [
      {
        id: 'ev-201',
        date: '2026-10-19T10:15:00-03:00',
        step: 1,
        actor: 'Cliente (Ing. Roberto Salgado)',
        title: 'Pedido de Cotización Ingresado',
        detail: 'Requerimiento para Tanque 25.000 L para Ácido Clorhídrico HCl 33%.',
      },
      {
        id: 'ev-202',
        date: '2026-10-19T16:40:00-03:00',
        step: 2,
        actor: 'Eboplast S.A. (Comercial)',
        title: 'Presupuesto PRE-2026-0904 Enviado',
        detail: 'Presupuesto enviado al cliente. Esperando carga de Orden de Compra.',
      },
    ],
  },
];

const INITIAL_DEMO_EMAILS = [
  {
    id: 'mail-104',
    timestamp: '2026-10-18T14:30:05-03:00',
    orderCode: 'EBO-2026-1048',
    stageStep: 4,
    stageName: '4. Plano Técnico Enviado para Aprobación',
    from: 'ingenieria@eboplast.com.ar',
    to: 'mferraro@agrolitoral.com.ar',
    cc: 'info@eboplast.com.ar',
    subject: '[Eboplast S.A.] Plano Técnico PL-EBO-1048-RevA listo para su aprobación — Pedido EBO-2026-1048',
    status: 'Entregado',
    html: buildEmailHtml({
      orderCode: 'EBO-2026-1048',
      badge: 'ETAPA 4 DE 6 · REVISIÓN DE PLANO TÉCNICO',
      title: 'Plano Técnico Disponible para Aprobación',
      recipientName: 'Ing. Martín Ferraro (Agroquímica del Litoral S.A.)',
      intro:
        'A partir de su Orden de Compra OC-44910, nuestro Departamento de Ingeniería ha confeccionado el plano constructivo de su tanque de PRFV. Para dar inicio a la fabricación en planta, necesitamos su revisión y aprobación formal.',
      specs: [
        ['Código de Pedido', 'EBO-2026-1048'],
        ['N° de Plano', 'PL-EBO-1048-RevA (Rev. A)'],
        ['Equipo', 'Tanque Vertical 50.000 Litros (Ø 4.000 x H 4.780 mm)'],
        ['Fluido', 'Fertilizante Líquido UAN 32 / SolMix'],
        ['Normas Aplicadas', 'ASTM D3299 / CIRSOC 102'],
        ['Diseño de Base', 'Fondo y cilindro en 1 pieza sin soldadura (menor riesgo de ataque químico)'],
      ],
      ctaLabel: 'VER Y APROBAR PLANO TÉCNICO EN EL PORTAL',
      ctaPath: '/seguimiento/EBO-2026-1048',
      footerNote:
        'Una vez aprobado el plano en el portal, su tanque ingresará inmediatamente al cronograma de bobinado Filament Winding.',
    }),
  },
  {
    id: 'mail-103',
    timestamp: '2026-10-16T16:05:10-03:00',
    orderCode: 'EBO-2026-1048',
    stageStep: 3,
    stageName: '3. Orden de Compra Recibida',
    from: 'notificaciones@eboplast.com.ar',
    to: 'info@eboplast.com.ar',
    cc: 'mferraro@agrolitoral.com.ar',
    subject: '[Eboplast S.A.] Nueva Orden de Compra OC-44910 Cargada — Pedido EBO-2026-1048',
    status: 'Entregado',
    html: buildEmailHtml({
      orderCode: 'EBO-2026-1048',
      badge: 'ETAPA 3 DE 6 · ORDEN DE COMPRA RECIBIDA',
      title: 'El cliente cargó la Orden de Compra OC-44910',
      recipientName: 'Departamento Comercial e Ingeniería — Eboplast S.A.',
      intro:
        'El cliente Agroquímica del Litoral S.A. ha aceptado las condiciones del Presupuesto PRE-2026-0891 y adjuntó la Orden de Compra junto con la referencia de pago de anticipo.',
      specs: [
        ['Código de Pedido', 'EBO-2026-1048'],
        ['Orden de Compra', 'OC-44910'],
        ['Archivo Adjunto', 'Orden_De_Compra_OC-44910_AgroLitoral.pdf'],
        ['Referencia Anticipo', 'Transferencia Anticipo 40% - Banco Nación Op. #8839201'],
        ['Próximo Paso', 'Ingeniería Eboplast debe cargar el Plano Técnico para aprobación'],
      ],
      ctaLabel: 'ABRIR EXPEDIENTE Y SUBIR PLANO TÉCNICO',
      ctaPath: '/gestion',
      footerNote: 'Recuerde que la fabricación inicia únicamente tras la aprobación del plano por parte del cliente.',
    }),
  },
  {
    id: 'mail-102',
    timestamp: '2026-10-10T17:00:12-03:00',
    orderCode: 'EBO-2026-1035',
    stageStep: 6,
    stageName: '6. Entrega y Registro Virtual Emitido',
    from: 'calidad@eboplast.com.ar',
    to: 'ingenieria@lacteossancarlos.com.ar',
    cc: 'info@eboplast.com.ar',
    subject: '[Eboplast S.A.] Entrega Finalizada y Registro Virtual Disponible — Tanque SN-EBO-1978-4821',
    status: 'Entregado',
    html: buildEmailHtml({
      orderCode: 'EBO-2026-1035',
      badge: 'ETAPA 6 DE 6 · REGISTRO VIRTUAL PERMANENTE',
      title: 'Legajo Técnico Digital y Certificado de Garantía',
      recipientName: 'Ing. Laura Benítez (Lácteos San Carlos S.R.L.)',
      intro:
        'Se ha completado la entrega de su tanque en PRFV. A partir de este momento queda habilitado el Registro Virtual permanente de la unidad con toda su trazabilidad de fabricación, planos aprobados y certificado de garantía escrita por 1 año.',
      specs: [
        ['Código de Expediente', 'EBO-2026-1035'],
        ['N° de Serie de Fábrica', 'SN-EBO-1978-4821'],
        ['Lote de Resina', 'LOTE-ISO-SAN-2026-992'],
        ['Normas Constructivas', 'ASTM / ASME / IRAM / CIRSOC'],
        ['Garantía Escrita', 'Vigente hasta 10/10/2027 (Certificado Oficial)'],
      ],
      ctaLabel: 'ACCEDER AL REGISTRO VIRTUAL DEL TANQUE',
      ctaPath: '/seguimiento/EBO-2026-1035',
      footerNote: 'Este enlace permanece activo de forma indefinida como respaldo técnico e historial de auditoría de planta.',
    }),
  },
];

export function buildEmailHtml({
  orderCode,
  badge,
  title,
  recipientName,
  intro,
  specs = [],
  ctaLabel,
  ctaPath,
  footerNote,
}) {
  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://eboplast.pages.dev';
  const fullUrl = `${origin}${ctaPath || `/seguimiento/${orderCode}`}`;

  const rowsHtml = specs
    .map(
      ([label, val]) => `
      <tr>
        <td style="padding: 9px 12px; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-size: 12px; color: #64748b; text-transform: uppercase; width: 38%;">${label}</td>
        <td style="padding: 9px 12px; border-bottom: 1px solid #e2e8f0; font-family: sans-serif; font-size: 13px; color: #0f172a; font-weight: 600;">${val}</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
</head>
<body style="margin:0; padding:24px; background-color:#f4f4f0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; margin:0 auto; background-color:#ffffff; border:1px solid #cbd5e1; border-radius:12px; overflow:hidden;">
    <tr>
      <td style="background-color:#0c0d0f; padding:20px 28px; color:#ffffff;">
        <div style="font-family:monospace; font-size:11px; color:#84cc16; letter-spacing:1px; text-transform:uppercase; font-weight:bold;">
          ${badge || 'SISTEMA DE TRAZABILIDAD EBOPLAST S.A.'}
        </div>
        <div style="font-size:20px; font-weight:900; text-transform:uppercase; margin-top:4px; letter-spacing:-0.5px;">
          EBOPLAST S.A. · INGENIERÍA EN PRFV (DESDE 1978)
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px;">
        <p style="font-size:13px; color:#475569; margin:0 0 8px 0;">Estimado/a <strong>${recipientName}</strong>,</p>
        <h1 style="font-size:22px; color:#0f172a; margin:0 0 14px 0; font-weight:800;">${title}</h1>
        <p style="font-size:14px; line-height:1.6; color:#334155; margin:0 0 20px 0;">
          ${intro}
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #cbd5e1; border-radius:8px; overflow:hidden; margin-bottom:24px; background:#f8fafc;">
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div style="text-align:center; margin:26px 0;">
          <a href="${fullUrl}" style="display:inline-block; background-color:#5b8314; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:999px; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:0.6px;">
            ${ctaLabel || 'ABRIR SEGUIMIENTO ONLINE'}
          </a>
        </div>

        <p style="font-size:12px; color:#64748b; line-height:1.5; margin:20px 0 0 0; padding-top:16px; border-top:1px solid #e2e8f0;">
          ${footerNote || 'Normas de fabricación: ASTM, BS, ASME, NBS, IRAM y CIRSOC. Planta Industrial: Av. Pte. Perón 5938, Rosario, Santa Fe.'}
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color:#f8fafc; padding:14px 28px; border-top:1px solid #e2e8f0; font-family:monospace; font-size:11px; color:#64748b; text-align:center;">
        EBOPLAST S.A. · Av. Pte. Perón 5938, Rosario · Tel: 0341 - 431 1112 / 1113 · info@eboplast.com.ar
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getEmailConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMAIL_CONFIG);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return {
    adminEmail: companyInfo.contacts.email || 'info@eboplast.com.ar',
    ccEmail: '',
    resendApiKey: '',
    fromEmail: 'Eboplast Ingeniería <onboarding@resend.dev>',
    autoOpenMailto: false,
  };
}

export function saveEmailConfig(config) {
  localStorage.setItem(STORAGE_KEY_EMAIL_CONFIG, JSON.stringify(config));
  return config;
}

export function getOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error loading orders from storage:', e);
  }
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(INITIAL_DEMO_ORDERS));
  return INITIAL_DEMO_ORDERS;
}

export function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  window.dispatchEvent(new CustomEvent('eboplast-orders-updated'));
}

export function getOrderByCode(code) {
  if (!code) return null;
  const orders = getOrders();
  const normalized = code.trim().toUpperCase();
  return orders.find((o) => o.code.toUpperCase() === normalized) || null;
}

export function getSentEmails() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMAILS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEY_EMAILS, JSON.stringify(INITIAL_DEMO_EMAILS));
  return INITIAL_DEMO_EMAILS;
}

export function saveSentEmails(emails) {
  localStorage.setItem(STORAGE_KEY_EMAILS, JSON.stringify(emails));
  window.dispatchEvent(new CustomEvent('eboplast-emails-updated'));
}

export function resetDemoWorkflowData() {
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(INITIAL_DEMO_ORDERS));
  localStorage.setItem(STORAGE_KEY_EMAILS, JSON.stringify(INITIAL_DEMO_EMAILS));
  window.dispatchEvent(new CustomEvent('eboplast-orders-updated'));
  window.dispatchEvent(new CustomEvent('eboplast-emails-updated'));
  return INITIAL_DEMO_ORDERS;
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        dataUrl: reader.result,
        uploadedAt: new Date().toISOString(),
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function dispatchWorkflowEmail({
  orderCode,
  stageStep,
  stageName,
  to,
  cc,
  subject,
  html,
}) {
  const cfg = getEmailConfig();
  const emailRecord = {
    id: `mail_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    orderCode,
    stageStep,
    stageName,
    from: cfg.fromEmail || 'notificaciones@eboplast.com.ar',
    to: to || cfg.adminEmail,
    cc: cc || cfg.ccEmail || cfg.adminEmail,
    subject,
    status: 'Enviando...',
    html,
  };

  // Llamada real a la Cloudflare Pages Function (/api/send-email)
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: emailRecord.to,
        cc: emailRecord.cc,
        subject: emailRecord.subject,
        html: emailRecord.html,
        orderCode,
        stageName,
        resendApiKey: cfg.resendApiKey,
        fromEmail: cfg.fromEmail,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      emailRecord.status =
        data.mode === 'live'
          ? 'Enviado vía Resend API'
          : 'Despachado y Registrado';
      emailRecord.providerId = data.id;
    } else {
      emailRecord.status = 'Registrado en Bandeja';
    }
  } catch {
    emailRecord.status = 'Registrado en Bandeja';
  }

  const currentEmails = getSentEmails();
  saveSentEmails([emailRecord, ...currentEmails]);

  if (cfg.autoOpenMailto && typeof window !== 'undefined') {
    const plainBody = `Pedido: ${orderCode}\nEtapa: ${stageName}\nSeguimiento online: ${window.location.origin}/seguimiento/${orderCode}`;
    window.open(
      `mailto:${encodeURIComponent(emailRecord.to)}?cc=${encodeURIComponent(emailRecord.cc || '')}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainBody)}`,
      '_blank'
    );
  }

  return emailRecord;
}

/**
 * ETAPA 1: Crear nuevo pedido de cotización / requerimiento técnico
 */
export async function createOrderFromRequirement({
  clientName,
  company,
  cuit,
  email,
  phone,
  location,
  format,
  capacityLiters,
  diameter,
  height,
  fluid,
  density,
  temperature,
  accessories = [],
  notes,
  attachmentFile,
}) {
  const orders = getOrders();
  const nextNum = 1052 + orders.length;
  const code = `EBO-2026-${nextNum}`;
  const now = new Date().toISOString();

  const attachment = attachmentFile
    ? { ...attachmentFile, docType: 'spec' }
    : null;

  const newOrder = {
    code,
    createdAt: now,
    updatedAt: now,
    currentStep: 1,
    stageId: 'cotizacion_solicitada',
    blueprintStatus: 'sin_enviar',
    client: {
      name: clientName || 'Cliente Industrial',
      company: company || 'Empresa Solicitante',
      cuit: cuit || 'Sin especificar',
      email: email || 'cliente@empresa.com.ar',
      phone: phone || 'Sin especificar',
      location: location || 'Argentina',
    },
    technicalSpec: {
      format: format || 'Vertical Cilíndrico',
      capacityLiters: Number(capacityLiters) || 25000,
      diameter: diameter || 'A calcular',
      height: height || 'A calcular',
      fluid: fluid || 'Fluido Industrial',
      density: density || 'A evaluar',
      temperature: temperature || 'Ambiente',
      accessories,
      notes: notes || 'Sin observaciones adicionales.',
      attachment,
    },
    quote: null,
    purchaseOrder: null,
    blueprint: null,
    production: {
      startedAt: null,
      estimatedReadyDate: null,
      milestones: DEFAULT_MILESTONES,
    },
    virtualRecord: null,
    timeline: [
      {
        id: `ev_${Date.now()}`,
        date: now,
        step: 1,
        actor: `Cliente (${clientName || company})`,
        title: 'Pedido de Cotización / Requerimiento Ingresado',
        detail: `Equipo solicitado: ${format} de ${Number(capacityLiters).toLocaleString('es-AR')} L para ${fluid}. Se disparó notificación por correo a Eboplast y al cliente.`,
      },
    ],
  };

  saveOrders([newOrder, ...orders]);

  const cfg = getEmailConfig();
  const html = buildEmailHtml({
    orderCode: code,
    badge: 'ETAPA 1 DE 6 · NUEVO PEDIDO DE COTIZACIÓN',
    title: `Requerimiento Técnico Recibido (${code})`,
    recipientName: `${newOrder.client.name} — ${newOrder.client.company}`,
    intro:
      'Hemos recibido su requerimiento técnico en Eboplast S.A. Nuestro departamento de ingeniería está evaluando los espesores, compatibilidad de resinas y normas aplicables para enviarle el presupuesto formal.',
    specs: [
      ['Código de Seguimiento', code],
      ['Solicitante', `${newOrder.client.name} (${newOrder.client.company})`],
      ['Equipo / Formato', newOrder.technicalSpec.format],
      ['Capacidad Solicitada', `${newOrder.technicalSpec.capacityLiters.toLocaleString('es-AR')} Litros`],
      ['Fluido a Contener', newOrder.technicalSpec.fluid],
      ['Accesorios', accessories.length ? accessories.join(', ') : 'Estándar de fábrica'],
    ],
    ctaLabel: 'SEGUIR ESTADO DE MI PEDIDO EN VIVO',
    ctaPath: `/seguimiento/${code}`,
    footerNote:
      'Recibirá un correo automático apenas nuestro equipo cargue el presupuesto y las condiciones comerciales.',
  });

  const emailLog = await dispatchWorkflowEmail({
    orderCode: code,
    stageStep: 1,
    stageName: '1. Pedido de Cotización Ingresado',
    to: newOrder.client.email,
    cc: cfg.adminEmail,
    subject: `[Eboplast S.A.] Requerimiento Técnico Recibido — Seguimiento ${code}`,
    html,
  });

  return { order: newOrder, emailLog };
}

/**
 * ETAPA 2: Eboplast envía el Presupuesto Formal y Condiciones Comerciales
 */
export async function submitQuoteFromEboplast(orderCode, quoteData) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.code === orderCode);
  if (idx === -1) throw new Error('Pedido no encontrado');

  const now = new Date().toISOString();
  const order = { ...orders[idx] };

  order.currentStep = Math.max(order.currentStep, 2);
  order.stageId = 'presupuesto_enviado';
  order.updatedAt = now;
  order.quote = {
    quoteNumber: quoteData.quoteNumber || `PRE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    sentAt: now,
    amount: quoteData.amount || 'A convenir',
    currency: quoteData.currency || 'USD',
    taxNote: quoteData.taxNote || '+ IVA (10.5%)',
    deliveryTime: quoteData.deliveryTime || '30 días desde aprobación de plano',
    paymentTerms:
      quoteData.paymentTerms ||
      '40% Anticipo con Orden de Compra / 60% contra aviso de listo para despacho',
    validity: quoteData.validity || '15 días corridos',
    standardApplied: quoteData.standardApplied || 'ASTM, BS, ASME, NBS, IRAM, CIRSOC',
    resinSelected: quoteData.resinSelected || 'Viniléster / Isoftálica según fluido',
    warranty: '1 Año de Garantía Escrita de Fábrica',
    conditionsNotes: quoteData.conditionsNotes || '',
    file: quoteData.file
      ? { ...quoteData.file, docType: 'quote' }
      : {
          name: `Presupuesto_Eboplast_${quoteData.quoteNumber || orderCode}.pdf`,
          type: 'application/pdf',
          size: '540 KB',
          uploadedAt: now,
          docType: 'quote',
        },
  };

  order.timeline = [
    ...order.timeline,
    {
      id: `ev_${Date.now()}`,
      date: now,
      step: 2,
      actor: 'Eboplast S.A. (Departamento Comercial)',
      title: `Presupuesto Formal ${order.quote.quoteNumber} Enviado`,
      detail: `Monto: ${order.quote.currency} ${order.quote.amount} (${order.quote.taxNote}). Norma: ${order.quote.standardApplied}. Resina: ${order.quote.resinSelected}. Condiciones notificadas por mail al cliente.`,
    },
  ];

  orders[idx] = order;
  saveOrders(orders);

  const html = buildEmailHtml({
    orderCode: order.code,
    badge: 'ETAPA 2 DE 6 · PRESUPUESTO Y CONDICIONES DISPONIBLES',
    title: `Presupuesto Oficial ${order.quote.quoteNumber} Listo para Revisión`,
    recipientName: `${order.client.name} (${order.client.company})`,
    intro:
      'Nuestro departamento técnico y comercial ha emitido el presupuesto formal junto con las condiciones comerciales para su proyecto. Puede revisarlo, descargar el documento y adjuntar su Orden de Compra desde el portal.',
    specs: [
      ['Código de Pedido', order.code],
      ['Presupuesto N°', order.quote.quoteNumber],
      ['Valor Cotizado', `${order.quote.currency} ${order.quote.amount} ${order.quote.taxNote}`],
      ['Condición de Pago', order.quote.paymentTerms],
      ['Plazo de Entrega', order.quote.deliveryTime],
      ['Norma Constructiva', order.quote.standardApplied],
      ['Resina Especificada', order.quote.resinSelected],
    ],
    ctaLabel: 'REVISAR PRESUPUESTO Y CARGAR ORDEN DE COMPRA',
    ctaPath: `/seguimiento/${order.code}`,
    footerNote:
      'Para avanzar con la ingeniería de detalle y emisión de plano para aprobación, ingrese su Orden de Compra en el enlace superior.',
  });

  const emailLog = await dispatchWorkflowEmail({
    orderCode: order.code,
    stageStep: 2,
    stageName: '2. Presupuesto y Condiciones Enviadas',
    to: order.client.email,
    subject: `[Eboplast S.A.] Presupuesto Oficial ${order.quote.quoteNumber} disponible — Pedido ${order.code}`,
    html,
  });

  return { order, emailLog };
}

/**
 * ETAPA 3: Cliente carga Orden de Compra y Comprobante
 */
export async function submitPurchaseOrderFromClient(orderCode, poData) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.code === orderCode);
  if (idx === -1) throw new Error('Pedido no encontrado');

  const now = new Date().toISOString();
  const order = { ...orders[idx] };

  order.currentStep = Math.max(order.currentStep, 3);
  order.stageId = 'oc_recibida';
  order.updatedAt = now;
  order.purchaseOrder = {
    poNumber: poData.poNumber || `OC-${Math.floor(10000 + Math.random() * 90000)}`,
    uploadedAt: now,
    acceptedBy: poData.acceptedBy || order.client.name,
    paymentReference: poData.paymentReference || 'Condiciones de presupuesto aceptadas',
    notes: poData.notes || '',
    file: poData.file
      ? { ...poData.file, docType: 'po' }
      : {
          name: `Orden_Compra_${poData.poNumber || orderCode}.pdf`,
          type: 'application/pdf',
          size: '340 KB',
          uploadedAt: now,
          docType: 'po',
        },
  };

  order.timeline = [
    ...order.timeline,
    {
      id: `ev_${Date.now()}`,
      date: now,
      step: 3,
      actor: `Cliente (${order.purchaseOrder.acceptedBy})`,
      title: `Orden de Compra ${order.purchaseOrder.poNumber} Cargada`,
      detail: `Condiciones aceptadas y comprobante adjunto (${order.purchaseOrder.file.name}). Se notificó a Eboplast para confeccionar el plano técnico.`,
    },
  ];

  orders[idx] = order;
  saveOrders(orders);

  const cfg = getEmailConfig();
  const html = buildEmailHtml({
    orderCode: order.code,
    badge: 'ETAPA 3 DE 6 · ORDEN DE COMPRA RECIBIDA',
    title: `Orden de Compra ${order.purchaseOrder.poNumber} Registrada`,
    recipientName: 'Departamento de Ingeniería y Administración — Eboplast S.A.',
    intro: `El cliente ${order.client.company} ha aceptado las condiciones del presupuesto y cargó la Orden de Compra ${order.purchaseOrder.poNumber} junto con su archivo de respaldo. El pedido queda listo para que Ingeniería envíe el plano técnico para aprobación.`,
    specs: [
      ['Código de Pedido', order.code],
      ['Cliente', `${order.client.company} (${order.client.name})`],
      ['N° Orden de Compra', order.purchaseOrder.poNumber],
      ['Comprobante Adjunto', order.purchaseOrder.file.name],
      ['Ref. de Pago / Anticipo', order.purchaseOrder.paymentReference],
      ['Acción Requerida', 'Confeccionar y subir Plano Técnico para aprobación del cliente'],
    ],
    ctaLabel: 'SUBIR PLANO TÉCNICO PARA APROBACIÓN',
    ctaPath: `/seguimiento/${order.code}`,
    footerNote: 'Recuerde que la construcción en planta comienza una vez que el cliente apruebe el plano técnico.',
  });

  const emailLog = await dispatchWorkflowEmail({
    orderCode: order.code,
    stageStep: 3,
    stageName: '3. Orden de Compra Cargada por Cliente',
    to: cfg.adminEmail,
    cc: order.client.email,
    subject: `[Eboplast S.A.] Orden de Compra ${order.purchaseOrder.poNumber} Recibida — Pedido ${order.code}`,
    html,
  });

  return { order, emailLog };
}

/**
 * ETAPA 4A: Eboplast envía Plano Técnico para Aprobación del Cliente
 */
export async function submitBlueprintFromEboplast(orderCode, bpData) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.code === orderCode);
  if (idx === -1) throw new Error('Pedido no encontrado');

  const now = new Date().toISOString();
  const order = { ...orders[idx] };

  order.currentStep = 4;
  order.stageId = 'plano_en_aprobacion';
  order.blueprintStatus = 'pendiente_cliente';
  order.updatedAt = now;

  const prevObs = order.blueprint?.observations || [];

  order.blueprint = {
    drawingNumber: bpData.drawingNumber || `PL-${order.code}`,
    revision: bpData.revision || (prevObs.length > 0 ? 'Rev. B' : 'Rev. A'),
    sentAt: now,
    engineer: bpData.engineer || 'Oficina Técnica Eboplast S.A.',
    notes:
      bpData.notes ||
      'Plano general con dimensiones, espesores y orientación de bridas. Fondo y cilindro sin soldadura para disminuir el riesgo de ataque químico.',
    specs: {
      diameter: bpData.diameter || order.technicalSpec.diameter || '3.000 mm',
      cylinderHeight: bpData.cylinderHeight || '4.000 mm',
      totalHeight: bpData.totalHeight || order.technicalSpec.height || '4.600 mm',
      wallThicknessBase: bpData.wallThicknessBase || '12.5 mm',
      wallThicknessTop: bpData.wallThicknessTop || '6.5 mm',
      nozzles: bpData.nozzles || 'Carga 3" / Descarga 3" / Venteo 4" / Paso Hombre 20"',
    },
    file: bpData.file
      ? { ...bpData.file, docType: 'blueprint' }
      : {
          name: `Plano_Tecnico_${bpData.drawingNumber || order.code}_${bpData.revision || 'RevA'}.pdf`,
          type: 'application/pdf',
          size: '1.05 MB',
          uploadedAt: now,
          docType: 'blueprint',
        },
    approval: null,
    observations: prevObs,
  };

  order.timeline = [
    ...order.timeline,
    {
      id: `ev_${Date.now()}`,
      date: now,
      step: 4,
      actor: `Eboplast S.A. (${order.blueprint.engineer})`,
      title: `Plano Técnico ${order.blueprint.drawingNumber} (${order.blueprint.revision}) Enviado`,
      detail: `Plano cargado para revisión del cliente. Se envió notificación por correo electrónico solicitando aprobación para iniciar construcción.`,
    },
  ];

  orders[idx] = order;
  saveOrders(orders);

  const html = buildEmailHtml({
    orderCode: order.code,
    badge: 'ETAPA 4 DE 6 · APROBACIÓN DE PLANO TÉCNICO',
    title: `Plano Técnico ${order.blueprint.drawingNumber} (${order.blueprint.revision}) Pendiente de Aprobación`,
    recipientName: `${order.client.name} (${order.client.company})`,
    intro:
      'Nuestra Oficina Técnica ha cargado el plano de fabricación de su tanque. Por favor ingrese al enlace para revisar las medidas, conexiones y orientación de bridas, y otorgar su aprobación para comenzar la construcción en planta.',
    specs: [
      ['Código de Pedido', order.code],
      ['Plano N° / Revisión', `${order.blueprint.drawingNumber} (${order.blueprint.revision})`],
      ['Dimensiones Generales', `Ø ${order.blueprint.specs.diameter} × Altura Total ${order.blueprint.specs.totalHeight}`],
      ['Conexiones / Boquillas', order.blueprint.specs.nozzles],
      ['Unión Fondo-Cilindro', 'Monolítico sin soldadura (disminuye riesgo de ataque químico)'],
    ],
    ctaLabel: 'VER PLANO TÉCNICO Y APROBAR CONSTRUCCIÓN',
    ctaPath: `/seguimiento/${order.code}`,
    footerNote:
      'Una vez aprobado el plano en el sistema, comenzaremos de inmediato con el bobinado Filament Winding.',
  });

  const emailLog = await dispatchWorkflowEmail({
    orderCode: order.code,
    stageStep: 4,
    stageName: '4. Plano Técnico Enviado al Cliente',
    to: order.client.email,
    subject: `[Eboplast S.A.] Aprobación requerida: Plano Técnico ${order.blueprint.drawingNumber} — Pedido ${order.code}`,
    html,
  });

  return { order, emailLog };
}

/**
 * ETAPA 4B: Cliente Aprueba el Plano (pasa a Etapa 5 Construcción) o Solicita Ajustes
 */
export async function reviewBlueprintByClient(orderCode, { approved, approvedBy, role, comment }) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.code === orderCode);
  if (idx === -1) throw new Error('Pedido no encontrado');

  const now = new Date().toISOString();
  const order = { ...orders[idx] };
  const cfg = getEmailConfig();

  if (approved) {
    order.currentStep = 5;
    order.stageId = 'en_construccion';
    order.blueprintStatus = 'aprobado';
    order.updatedAt = now;

    const hash = `SHA256-${Math.random().toString(16).substring(2, 10).toUpperCase()}-EBO`;

    order.blueprint = {
      ...order.blueprint,
      approval: {
        approvedBy: approvedBy || order.client.name,
        role: role || 'Responsable Técnico de Cliente',
        approvedAt: now,
        comment: comment || 'Plano aprobado conforme a requerimiento para inicio de fabricación.',
        digitalSignatureHash: hash,
      },
    };

    order.production = {
      startedAt: now,
      estimatedReadyDate: new Date(Date.now() + 28 * 86400000).toLocaleDateString('es-AR'),
      milestones: DEFAULT_MILESTONES.map((m, i) =>
        i === 0
          ? { ...m, done: true, date: new Date().toLocaleDateString('es-AR') }
          : m
      ),
    };

    order.timeline = [
      ...order.timeline,
      {
        id: `ev_${Date.now()}`,
        date: now,
        step: 5,
        actor: `Cliente (${approvedBy || order.client.name})`,
        title: `Plano ${order.blueprint.drawingNumber} APROBADO — Inicia Construcción`,
        detail: `Aprobado por ${approvedBy || order.client.name} (${role || 'Cliente'}). Firma digital: ${hash}. Se habilitó orden de producción en Planta Rosario.`,
      },
    ];

    orders[idx] = order;
    saveOrders(orders);

    const html = buildEmailHtml({
      orderCode: order.code,
      badge: 'ETAPA 5 DE 6 · PLANO APROBADO · EN CONSTRUCCIÓN',
      title: `Plano Aprobado — Inicio de Construcción en Planta`,
      recipientName: 'Ingeniería y Producción — Eboplast S.A.',
      intro: `El cliente ${order.client.company} ha aprobado formalmente el plano ${order.blueprint.drawingNumber} (${order.blueprint.revision}). El equipo ha ingresado a programación de fabricación por Filament Winding.`,
      specs: [
        ['Código de Pedido', order.code],
        ['Plano Aprobado', `${order.blueprint.drawingNumber} (${order.blueprint.revision})`],
        ['Aprobado por', `${order.blueprint.approval.approvedBy} (${order.blueprint.approval.role})`],
        ['Código de Conformidad', order.blueprint.approval.digitalSignatureHash],
        ['Comentario del Cliente', order.blueprint.approval.comment],
      ],
      ctaLabel: 'VER AVANCE DE FABRICACIÓN EN EL PORTAL',
      ctaPath: `/seguimiento/${order.code}`,
      footerNote: 'Se ha registrado la conformidad técnica en el legajo virtual del tanque.',
    });

    const emailLog = await dispatchWorkflowEmail({
      orderCode: order.code,
      stageStep: 5,
      stageName: '5. Plano Aprobado · Inicio de Construcción',
      to: cfg.adminEmail,
      cc: order.client.email,
      subject: `[Eboplast S.A.] PLANO APROBADO por Cliente — Inicia Construcción Pedido ${order.code}`,
      html,
    });

    return { order, emailLog };
  } else {
    // El cliente solicita una corrección / observación en el plano
    order.blueprintStatus = 'observado';
    order.updatedAt = now;
    const obsList = order.blueprint?.observations || [];
    order.blueprint = {
      ...order.blueprint,
      observations: [
        ...obsList,
        {
          date: now,
          author: approvedBy || order.client.name,
          comment: comment || 'Solicito revisar ubicación de conexiones en el plano.',
        },
      ],
    };

    order.timeline = [
      ...order.timeline,
      {
        id: `ev_${Date.now()}`,
        date: now,
        step: 4,
        actor: `Cliente (${approvedBy || order.client.name})`,
        title: `Observación / Ajuste Solicitado sobre Plano ${order.blueprint.drawingNumber}`,
        detail: `Motivo: "${comment}". Se notificó a Oficina Técnica de Eboplast para emitir nueva revisión.`,
      },
    ];

    orders[idx] = order;
    saveOrders(orders);

    const html = buildEmailHtml({
      orderCode: order.code,
      badge: 'ETAPA 4 DE 6 · OBSERVACIÓN EN PLANO TÉCNICO',
      title: `El cliente solicitó ajustes en el Plano ${order.blueprint.drawingNumber}`,
      recipientName: 'Oficina Técnica — Eboplast S.A.',
      intro: `El cliente ${order.client.company} revisó el plano enviado y dejó observaciones técnicas para emitir una nueva revisión antes de aprobar la fabricación.`,
      specs: [
        ['Código de Pedido', order.code],
        ['Solicitante', approvedBy || order.client.name],
        ['Observación Técnica', comment],
      ],
      ctaLabel: 'REVISAR OBSERVACIÓN Y SUBIR NUEVA REVISIÓN',
      ctaPath: `/seguimiento/${order.code}`,
      footerNote: 'Suba la nueva revisión del plano desde el panel de gestión para reenviar a aprobación.',
    });

    const emailLog = await dispatchWorkflowEmail({
      orderCode: order.code,
      stageStep: 4,
      stageName: '4. Observaciones del Cliente sobre el Plano',
      to: cfg.adminEmail,
      cc: order.client.email,
      subject: `[Eboplast S.A.] Observación en Plano ${order.blueprint.drawingNumber} — Pedido ${order.code}`,
      html,
    });

    return { order, emailLog };
  }
}

/**
 * ETAPA 5: Actualizar hitos de fabricación en planta
 */
export async function updateProductionMilestones(orderCode, updatedMilestones, notifyClient = true) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.code === orderCode);
  if (idx === -1) throw new Error('Pedido no encontrado');

  const now = new Date().toISOString();
  const order = { ...orders[idx] };
  order.updatedAt = now;
  order.production = {
    ...order.production,
    milestones: updatedMilestones,
  };

  const completedCount = updatedMilestones.filter((m) => m.done).length;

  order.timeline = [
    ...order.timeline,
    {
      id: `ev_${Date.now()}`,
      date: now,
      step: 5,
      actor: 'Eboplast S.A. (Jefatura de Planta)',
      title: `Avance de Fabricación en Planta (${completedCount}/${updatedMilestones.length} etapas)`,
      detail: `Hitos completados: ${updatedMilestones
        .filter((m) => m.done)
        .map((m) => m.title)
        .join(' · ')}.`,
    },
  ];

  orders[idx] = order;
  saveOrders(orders);

  let emailLog = null;
  if (notifyClient) {
    const html = buildEmailHtml({
      orderCode: order.code,
      badge: 'ETAPA 5 DE 6 · AVANCE DE CONSTRUCCIÓN EN PLANTA',
      title: `Actualización de Fabricación (${completedCount} de ${updatedMilestones.length} hitos completados)`,
      recipientName: `${order.client.name} (${order.client.company})`,
      intro:
        'Le informamos el estado de avance en la fabricación de su tanque en nuestra planta industrial de Rosario.',
      specs: updatedMilestones.map((m) => [
        m.title,
        m.done ? `✅ COMPLETADO (${m.date || 'Hoy'})` : '⏳ En proceso programado',
      ]),
      ctaLabel: 'VER SEGUIMIENTO DE PLANTA EN VIVO',
      ctaPath: `/seguimiento/${order.code}`,
      footerNote: 'Una vez completado el ensayo de control de calidad, coordinaremos el despacho y entrega final.',
    });

    emailLog = await dispatchWorkflowEmail({
      orderCode: order.code,
      stageStep: 5,
      stageName: '5. Avance de Construcción en Planta',
      to: order.client.email,
      subject: `[Eboplast S.A.] Avance de Fabricación (${completedCount}/${updatedMilestones.length}) — Pedido ${order.code}`,
      html,
    });
  }

  return { order, emailLog };
}

/**
 * ETAPA 6: Finalizar Entrega y Emitir Registro Virtual Permanente del Tanque
 */
export async function completeDeliveryAndVirtualRecord(orderCode, recordData) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.code === orderCode);
  if (idx === -1) throw new Error('Pedido no encontrado');

  const now = new Date().toISOString();
  const todayFormatted = new Date().toLocaleDateString('es-AR');
  const nextYearFormatted = new Date(Date.now() + 365 * 86400000).toLocaleDateString('es-AR');

  const order = { ...orders[idx] };
  order.currentStep = 6;
  order.stageId = 'entregado_registro';
  order.updatedAt = now;

  // Asegurar todos los hitos de producción como completados
  order.production = {
    ...order.production,
    milestones: (order.production?.milestones || DEFAULT_MILESTONES).map((m) => ({
      ...m,
      done: true,
      date: m.date || todayFormatted,
    })),
  };

  const serialNumber =
    recordData.serialNumber || `SN-EBO-1978-${Math.floor(4850 + Math.random() * 900)}`;

  order.virtualRecord = {
    serialNumber,
    deliveryDate: recordData.deliveryDate || todayFormatted,
    warrantyExpiration: `${nextYearFormatted} (Garantía Escrita 1 Año)`,
    resinBatch: recordData.resinBatch || 'LOTE-VIN-2026-841',
    glassFiberBatch: recordData.glassFiberBatch || 'ROVING-EGLASS-4490',
    barcolHardness: recordData.barcolHardness || '43 Barcol (Aprobado)',
    hydrostaticTest:
      recordData.hydrostaticTest || 'APROBADO (100% Estanqueidad · 0% Fisuras)',
    dispatchRemito: recordData.dispatchRemito || 'Remito Oficial N° 0004-00019410',
    receivedBy: recordData.receivedBy || `${order.client.name} (${order.client.company})`,
    normApplied:
      recordData.normApplied ||
      order.quote?.standardApplied ||
      'ASTM / BS / ASME / NBS / IRAM / CIRSOC',
    certificateFile: recordData.file
      ? { ...recordData.file, docType: 'certificate' }
      : {
          name: `Certificado_Garantia_y_Calidad_${serialNumber}.pdf`,
          type: 'application/pdf',
          size: '780 KB',
          uploadedAt: now,
          docType: 'certificate',
        },
  };

  order.timeline = [
    ...order.timeline,
    {
      id: `ev_${Date.now()}`,
      date: now,
      step: 6,
      actor: 'Eboplast S.A. (Calidad y Dirección Técnica)',
      title: `Entrega Finalizada y Registro Virtual Emitido (${serialNumber})`,
      detail: `Tanque entregado bajo ${order.virtualRecord.dispatchRemito}. Queda activo el Registro Virtual Permanente con especificaciones, planos aprobados, trazabilidad de resinas y Certificado de Garantía por 1 año.`,
    },
  ];

  orders[idx] = order;
  saveOrders(orders);

  const html = buildEmailHtml({
    orderCode: order.code,
    badge: 'ETAPA 6 DE 6 · ENTREGA FINALIZADA Y REGISTRO VIRTUAL',
    title: `Registro Virtual Permanente Habilitado — Serie ${serialNumber}`,
    recipientName: `${order.client.name} (${order.client.company})`,
    intro:
      'La entrega de su tanque en PRFV ha concluido exitosamente. Hemos generado el Registro Virtual Permanente de la unidad, donde podrá consultar y descargar en cualquier momento el Requerimiento Inicial, Presupuesto, Orden de Compra, Plano Técnico Aprobado, Trazabilidad de Lotes y Certificado de Garantía Escrita.',
    specs: [
      ['Código de Expediente', order.code],
      ['N° de Serie del Tanque', serialNumber],
      ['Equipo Entregado', `${order.technicalSpec.format} — ${order.technicalSpec.capacityLiters.toLocaleString('es-AR')} L`],
      ['Lote de Resina', order.virtualRecord.resinBatch],
      ['Dureza Barcol / Ensayo', `${order.virtualRecord.barcolHardness} · ${order.virtualRecord.hydrostaticTest}`],
      ['Remito de Entrega', order.virtualRecord.dispatchRemito],
      ['Garantía Oficial', order.virtualRecord.warrantyExpiration],
    ],
    ctaLabel: 'ABRIR REGISTRO VIRTUAL Y DESCARGAR CERTIFICADO',
    ctaPath: `/seguimiento/${order.code}`,
    footerNote:
      'Conserve este correo como acceso directo al pasaporte técnico digital de su equipo Eboplast S.A.',
  });

  const emailLog = await dispatchWorkflowEmail({
    orderCode: order.code,
    stageStep: 6,
    stageName: '6. Entrega Final y Registro Virtual Emitido',
    to: order.client.email,
    subject: `[Eboplast S.A.] Registro Virtual del Tanque (${serialNumber}) y Certificado de Garantía — Pedido ${order.code}`,
    html,
  });

  return { order, emailLog };
}
