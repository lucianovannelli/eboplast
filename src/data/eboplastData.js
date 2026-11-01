export const companyInfo = {
  name: "Eboplast S.A.",
  tagline: "Ingeniería en Soluciones de PRFV",
  yearsExperience: "45+",
  foundedYear: "1978",
  maxCapacity: "250.000 L",
  standard: "Normas ASTM, BS, ASME, NBS, IRAM, CIRSOC",
  warranty: "1 año por escrito",
  location: {
    address: "Av. Pte. Perón 5938",
    city: "Rosario",
    state: "Santa Fe",
    country: "Argentina",
    full: "Av. Pte. Perón 5938, Rosario, Santa Fe, Argentina"
  },
  contacts: {
    phones: [
      { label: "Planta / Oficina", number: "0341 - 431 1112 / 1113", link: "tel:03414311112" },
      { label: "Comercial / Móvil 1", number: "+54 9 341 665-7797", link: "tel:+5493416657797" },
      { label: "Comercial / Móvil 2", number: "+54 9 341 156921155", link: "tel:+549341156921155" }
    ],
    whatsapp: {
      number: "5493416657797",
      display: "+54 9 341 665-7797",
      defaultMessage: "Hola! Quisiera solicitar asesoramiento y cotización sobre los tanques y soluciones en PRFV de Eboplast."
    },
    email: "info@eboplast.com.ar"
  },
  socials: {
    instagram: "https://www.instagram.com/ebogroupsas/?igshid=1aue1w4y7aoip",
    facebook: "https://www.facebook.com/EboplastS.A/",
    linkedin: "https://www.linkedin.com/company/eboplast/about/"
  }
};

export const differentialFeatures = [
  {
    id: "soldadura",
    title: "Soldadura Superior Exclusiva",
    shortDesc: "Sin soldadura entre fondo y cilindro: menor riesgo de ataque químico y máxima seguridad",
    fullDesc: "A diferencia de los tanques tradicionales que poseen uniones soldadas en la base o parte media (zonas con máxima presión hidrostática y riesgo de fractura), Eboplast fabrica el fondo y cilindro en una sola pieza continua mediante Filament Winding. Al no haber soldadura entre fondo y cilindro, se disminuye también el riesgo de ataque químico y se garantiza 0% de fatiga en la base.",
    icon: "/assets/soldar.png",
    badge: "Exclusivo Eboplast"
  },
  {
    id: "filament",
    title: "Sistema Filament Winding Robotizado",
    shortDesc: "Normas ASTM, BS, ASME, NBS, IRAM y CIRSOC con máxima resistencia mecánica",
    fullDesc: "Bobinado automático de filamentos continuos de fibra de vidrio impregnados en resinas específicas de alta prestación. Trabajamos bajo normas ASTM, BS, ASME, NBS, IRAM y CIRSOC, y previo estudio podemos fabricar bajo cualquier otra norma o reglamento.",
    icon: "/assets/resistencia.png",
    badge: "Normas Internacionales"
  },
  {
    id: "matriz",
    title: "La Mayor Matriz del Mercado",
    shortDesc: "Capacidades estándar y a medida desde 1.000 L hasta 250.000 L",
    fullDesc: "Contamos con la infraestructura y matricería más grande de la región, lo que nos permite ofrecer una variedad dimensional inigualable tanto en formatos cilíndricos verticales como horizontales y diseños especiales a medida.",
    icon: "/assets/matriz.png",
    badge: "Capacidad Líder"
  },
  {
    id: "trayectoria",
    title: "Trayectoria y Respaldo desde 1978",
    shortDesc: "Fundada en 1978, con experiencia probada en las industrias líderes del país",
    fullDesc: "Desde nuestra fundación en 1978, nuestros equipos operan ininterrumpidamente en las principales plantas químicas, alimenticias, agropecuarias e instituciones públicas de Argentina con garantía de calidad certificada.",
    icon: "/assets/trayectoria.png",
    badge: "Desde 1978"
  },
  {
    id: "optimizacion",
    title: "Optimización de Costos & Proyectos",
    shortDesc: "Eficiencia en material, transporte ágil y mínimo costo de montaje",
    fullDesc: "Ingeniería adaptada a los requerimientos específicos de cada cliente para maximizar la vida útil, reducir mermas y eliminar costos de mantenimiento preventivo como pintura o tratamientos anticorrosivos.",
    icon: "/assets/optimizacion.png",
    badge: "Alta Eficiencia"
  },
  {
    id: "cobertura",
    title: "Entrega y Montaje Nacional",
    shortDesc: "Instalación en cualquier punto de Argentina con personal propio",
    fullDesc: "Brindamos asistencia técnica, transporte especializado y montaje completo in situ de torres y tanques cumpliendo rigurosas normas de seguridad industrial y CIRSOC.",
    icon: "/assets/entrega.png",
    badge: "Cobertura Total"
  }
];

export const comparisonPoints = [
  {
    aspect: "Ubicación de Soldaduras",
    eboplast: "Única soldadura en el casquete superior. Fondo y cilindro en una sola pieza continua, disminuyendo también el riesgo de ataque químico.",
    competitors: "Soldaduras intermedias y en la base inferior donde la presión hidrostática y el ataque químico son críticos.",
    winner: true
  },
  {
    aspect: "Riesgo de Fugas y Ataque Químico",
    eboplast: "0% riesgo en zonas de carga hidrostática. Al no haber soldadura entre fondo y cilindro, se disminuye el riesgo de ataque químico.",
    competitors: "Alto riesgo de filtración y ataque químico en las costuras soldadas de la base.",
    winner: true
  },
  {
    aspect: "Normas y Tecnología de Fabricación",
    eboplast: "Filament Winding automatizado bajo normas ASTM, BS, ASME, NBS, IRAM y CIRSOC (y cualquier otra norma previo estudio).",
    competitors: "Moldeo manual por capas discontinuas o bobinado rústico con espesores irregulares.",
    winner: true
  },
  {
    aspect: "Resistencia a la Corrosión",
    eboplast: "100% inmune a productos químicos agresivos, fertilizantes, ácidos y ambientes marinos.",
    competitors: "Alternativas metálicas requieren arenado periódico, ánodos de sacrificio y repintado.",
    winner: true
  },
  {
    aspect: "Peso y Transporte",
    eboplast: "4.4 veces más liviano que el acero al carbono. Manipulación e izaje ágiles y económicos.",
    competitors: "Estructuras pesadas que demandan grúas de gran tonelaje y fletes especiales.",
    winner: true
  },
  {
    aspect: "Garantía",
    eboplast: "1 año de garantía por escrito con respaldo de ingeniería directa de fábrica.",
    competitors: "Garantías limitadas o sin certificado técnico de trazabilidad de resinas.",
    winner: true
  }
];

export const productCategories = [
  {
    id: "quimicos",
    name: "Químicos e Industriales",
    tagline: "Tecnología para sumar producción con tolerancia química extrema",
    description: "Tanques cilíndricos verticales y horizontales diseñados bajo normas ASTM, BS, ASME, NBS, IRAM y CIRSOC (o cualquier otra norma previo estudio) para contención de ácidos, fertilizantes líquidos, soluciones salinas, álcalis y químicos agresivos. Al no haber soldadura entre fondo y cilindro, se asegura máxima continuidad estructural y se disminuye el riesgo de ataque químico.",
    image: "/assets/prod.png",
    accentColor: "emerald",
    features: [
      "Capacidades desde 1.000 hasta 200.000 litros",
      "Resinas viniléster, isoftálicas y otras según la compatibilidad del fluido",
      "Sin soldadura entre fondo y cilindro: disminuye el riesgo de ataque químico y fatiga en la base",
      "Modelos verticales y horizontales con o sin cunas de apoyo de PRFV"
    ],
    optionals: [
      "Banda traslúcida graduada para visualización de nivel",
      "Válvulas de seguridad y conexiones normalizadas (bridas ANSI/DIN)",
      "Pasarelas superiores y escaleras con guardahombre reglamentario",
      "Agitadores de PRFV o metálicos revestidos para procesos de mezcla",
      "Aislación térmica con poliuretano de alta densidad",
      "Bocas de inspección paso hombre y accesos de carga"
    ],
    dimensions: [
      { cap: "1 m³", dia: "1.070 mm", h: "1.100 mm" },
      { cap: "3 m³", dia: "1.220 mm", h: "2.900 mm" },
      { cap: "5 m³", dia: "1.600 mm", h: "2.800 mm" },
      { cap: "8 m³", dia: "1.600 mm", h: "3.400 mm" },
      { cap: "10 m³", dia: "2.200 mm", h: "3.070 mm" },
      { cap: "15 m³", dia: "2.500 mm", h: "3.550 mm" },
      { cap: "20 m³", dia: "2.740 mm", h: "3.940 mm" },
      { cap: "30 m³", dia: "3.000 mm", h: "4.720 mm" },
      { cap: "50 m³", dia: "4.000 mm", h: "4.780 mm" },
      { cap: "70 m³", dia: "4.000 mm", h: "6.370 mm" },
      { cap: "100 m³", dia: "4.000 mm", h: "8.760 mm" },
      { cap: "150 m³", dia: "4.700 mm", h: "9.590 mm" },
      { cap: "200 m³", dia: "4.700 mm", h: "12.440 mm" },
      { cap: "250 m³", dia: "4.700 mm", h: "15.400 mm" }
    ]
  },
  {
    id: "lacteos",
    name: "Lácteos y Alimentos",
    tagline: "Grado sanitario certificado con terminación espejo y piso inclinado",
    description: "Tanques diseñados específicamente para leche cruda, suero, jugos y derivados alimenticios. Cumplen normativas bromatológicas y sanitarias internacionales, con superficie interna lisa como espejo para evitar proliferación bacteriana y piso con pendiente para drenaje y lavado CIP 100% completo.",
    image: "/assets/leche.png",
    accentColor: "sky",
    features: [
      "Revestimiento interior sanitario con acabado espejo ultra pulido",
      "Piso con pendiente para evacuación gravitacional total del producto",
      "Aislación térmica con espuma de poliuretano inyectado de 2 pulgadas",
      "Cáncamos de izaje y silletas de anclaje de alta resistencia"
    ],
    optionals: [
      "Bocas de acero inoxidable de apertura rápida",
      "Agitadores mecánicos con motor inox de 3 HP",
      "Bochas de limpieza rotativas tipo spray ball para lavado CIP",
      "Cuadro de válvulas sanitarias de acero inoxidable",
      "Escalera exterior con jaula de protección y barandas superiores"
    ],
    dimensions: [
      { cap: "1 m³", dia: "1.070 mm", h: "1.100 mm" },
      { cap: "3 m³", dia: "1.220 mm", h: "2.900 mm" },
      { cap: "5 m³", dia: "1.600 mm", h: "2.800 mm" },
      { cap: "8 m³", dia: "1.600 mm", h: "3.400 mm" },
      { cap: "10 m³", dia: "2.200 mm", h: "3.070 mm" },
      { cap: "15 m³", dia: "2.500 mm", h: "3.550 mm" },
      { cap: "20 m³", dia: "2.740 mm", h: "3.940 mm" },
      { cap: "25 m³", dia: "2.740 mm", h: "4.790 mm" },
      { cap: "35 m³", dia: "3.000 mm", h: "5.400 mm" },
      { cap: "50 m³", dia: "4.000 mm", h: "4.780 mm" }
    ]
  },
  {
    id: "agua",
    name: "Tanques y Torres de Agua",
    tagline: "Provisión de agua potable y reservas industriales bajo normas CIRSOC",
    description: "Sistemas integrales de almacenamiento de agua potable para comunas, municipios, complejos residenciales, parques industriales y agro. Incluye tanque en PRFV anticorrosivo y torre metálica tubular soldada con cordón continuo calculada estructuralmente según la zona eólica y sísmica del país.",
    image: "/assets/prod.png",
    accentColor: "blue",
    features: [
      "Material 100% atóxico aprobado para agua de consumo humano",
      "Condición altamente dieléctrica (sin corrosión electroquímica)",
      "Torre metálica estructural calculada bajo normas CIRSOC",
      "Montaje llave en mano realizado por el equipo técnico de Eboplast en todo el país"
    ],
    optionals: [
      "Cañería de alimentación, bajada y colector manifold de válvulas",
      "Escalera de acceso con guardahombre y plataforma de servicio",
      "Baliza nocturna de seguridad aérea y pararrayos homologado",
      "Control automático de nivel con automatismo para electrobomba"
    ],
    dimensions: [
      { cap: "5 m³", dia: "1.600 mm", h: "2.800 mm" },
      { cap: "10 m³", dia: "2.200 mm", h: "3.070 mm" },
      { cap: "15 m³", dia: "2.500 mm", h: "3.550 mm" },
      { cap: "20 m³", dia: "2.740 mm", h: "3.940 mm" },
      { cap: "30 m³", dia: "3.000 mm", h: "4.720 mm" },
      { cap: "40 m³", dia: "3.500 mm", h: "4.850 mm" },
      { cap: "50 m³", dia: "4.000 mm", h: "4.780 mm" }
    ]
  },
  {
    id: "transporte",
    name: "Transporte e Isotanques",
    tagline: "Confiabilidad y máxima carga útil para llegar a destino",
    description: "Tanques montables sobre camión, chasis, acoplado o semirremolque equipados con rompeolas internos que neutralizan el oleaje dinámico del líquido durante la marcha. También fabricamos Isotanques de 20 pies encuadrados en chasis metálico para transporte intermodal por camión, ferrocarril o buque.",
    image: "/assets/camion.png",
    accentColor: "amber",
    features: [
      "Bajo peso estructural que permite cargar más litros útiles por viaje",
      "Rompeolas internos reforzados en PRFV o acero inoxidable",
      "Resistencia superior a impactos y torsiones de chasis en ruta",
      "Isotanques apilables de 20 pies aptos para depósitos estáticos o móviles"
    ],
    optionals: [
      "Válvulas de seguridad antivuelco de alta velocidad",
      "Pasarelas superiores antideslizantes con escalera abatible",
      "Cunas de fijación en PRFV o perfiles de acero",
      "Rótulos reglamentarios de materiales peligrosos y grado de corrosión"
    ],
    dimensions: [
      { cap: "4 m³", dia: "1.600 mm", h: "2.230 mm (Largo)" },
      { cap: "8 m³", dia: "1.830 mm", h: "3.410 mm (Largo)" },
      { cap: "12 m³", dia: "2.200 mm", h: "3.600 mm (Largo)" },
      { cap: "15 m³", dia: "2.200 mm", h: "4.380 mm (Largo)" },
      { cap: "20 m³", dia: "2.740 mm", h: "3.940 mm (Largo)" },
      { cap: "30 m³", dia: "2.740 mm", h: "5.130 mm (Largo)" },
      { cap: "40 m³", dia: "2.740 mm", h: "7.170 mm (Largo)" }
    ]
  },
  {
    id: "postes",
    name: "Postes de PRFV (Innovación)",
    tagline: "Seguridad eléctrica Clase II, ultralivianos e inalterables",
    description: "La alternativa de vanguardia para tendidos eléctricos, iluminación urbana y telecomunicaciones que reemplaza al hormigón y a la madera tratada. Totalmente aislante (clase II), no requiere puesta a tierra, es inmune a la humedad y salinidad costera y se transporta e instala manualmente.",
    image: "/assets/phone_3.png",
    accentColor: "lime",
    features: [
      "Aislación Eléctrica Clase II: elimina al 100% el riesgo de electrocución por contacto",
      "Ahorro en Instalación: no necesita jabalina de puesta a tierra",
      "Bajo Peso: izaje manual sencillo, disminuyendo costos logísticos y de cuadrilla",
      "Inmune a intemperie, hongos, termitas, ambientes marinos y salitre"
    ],
    optionals: [
      "Alturas normalizadas y configuraciones para media/baja tensión",
      "Crucetas y soportes en PRFV para aisladores",
      "Colores pigmentados en masa resistentes a rayos ultravioleta"
    ],
    dimensions: [
      { cap: "Poste 7.5 m", dia: "Base 180 mm", h: "Carga 300 daN" },
      { cap: "Poste 9.0 m", dia: "Base 210 mm", h: "Carga 450 daN" },
      { cap: "Poste 10.5 m", dia: "Base 230 mm", h: "Carga 600 daN" },
      { cap: "Poste 12.0 m", dia: "Base 260 mm", h: "Carga 800 daN" }
    ]
  },
  {
    id: "incendio",
    name: "Redes Contra Incendio",
    tagline: "Reserva hídrica confiable y de respuesta inmediata según normas de seguridad",
    description: "Tanques de alta capacidad para almacenamiento de agua en sistemas de protección contra incendios de plantas industriales, centros logísticos y depósitos comerciales. Garantizan hermeticidad durante más de 20 años sin corrosión interna ni necesidad de pintar o renovar recubrimientos.",
    image: "/assets/phone_4.png",
    accentColor: "rose",
    features: [
      "Capacidades desde 2.500 L hasta 250.000 Litros",
      "4.4 veces más liviano que tanques de chapa de acero",
      "Vida útil superior a 20 años en condiciones de intemperie severa",
      "Protección contra degradación por rayos UV y cambios bruscos de temperatura"
    ],
    optionals: [
      "Brida de succión para bombas principales de incendio",
      "Conexión de retorno y sistema anti-vórtice",
      "Sensor de nivel ultrasónico o electrodos de bajo nivel",
      "Escalera de mantenimiento y boca de inspección hermética"
    ],
    dimensions: [
      { cap: "10 m³", dia: "2.200 mm", h: "3.070 mm" },
      { cap: "25 m³", dia: "2.740 mm", h: "4.790 mm" },
      { cap: "50 m³", dia: "4.000 mm", h: "4.780 mm" },
      { cap: "100 m³", dia: "4.000 mm", h: "8.760 mm" },
      { cap: "150 m³", dia: "4.700 mm", h: "9.590 mm" },
      { cap: "200 m³", dia: "4.700 mm", h: "12.440 mm" },
      { cap: "250 m³", dia: "4.700 mm", h: "15.400 mm" }
    ]
  },
  {
    id: "especiales",
    name: "Equipos Especiales & Lining",
    tagline: "Soluciones de ingeniería a medida para desafíos corrosivos",
    description: "Fabricación de cubas monolíticas para galvanoplastía sin uniones, chimeneas y conductos para gases corrosivos, cañerías industriales de PRFV desde 2'' y servicio de Revestimiento / Lining in-situ sobre hormigón y chapa metálica existente para extender su vida útil indefinidamente.",
    image: "/assets/servicios.png",
    accentColor: "purple",
    features: [
      "Cubas para electrólisis y baños químicos en una sola pieza sin juntas",
      "Chimeneas y ductos para aspiración y descarga de vapores ácidos",
      "Cañerías industriales por Filament Winding de 2 pulgadas en adelante",
      "Lining termoplástico (PVC, Polipropileno, PVDF) reforzado con PRFV exterior"
    ],
    optionals: [
      "Revestimiento in-situ sobre piletas de hormigón existentes",
      "Recubrimiento de bateas de contención secundaria para derrames",
      "Piezas especiales según plano técnico de cliente"
    ],
    dimensions: [
      { cap: "Cañerías", dia: "2'' a 24''", h: "Tramos hasta 12 m" },
      { cap: "Cubas", dia: "A medida", h: "Monobloque sin costura" },
      { cap: "Chimeneas", dia: "Hasta 2.000 mm", h: "Tramos bridados" }
    ]
  }
];

export const servicesList = [
  {
    title: "Financiación Bancaria",
    description: "Convenios exclusivos con entidades bancarias líderes para líneas de crédito productivas y financiamiento de equipamiento industrial.",
    icon: "/assets/financiacion.png"
  },
  {
    title: "Entrega y Montaje Nacional",
    description: "Logística especializada propia y cuadrilla técnica para armado y puesta en marcha de torres y tanques en todo el territorio argentino.",
    icon: "/assets/entrega.png"
  },
  {
    title: "1 Año de Garantía Escrita",
    description: "Única empresa en el sector que respalda formalmente cada equipo con un certificado de garantía de calidad por 1 año.",
    icon: "/assets/garantia.png"
  },
  {
    title: "Consultoría de Ingeniería",
    description: "Asesoramiento técnico integral, cálculo bajo normas ASTM, BS, ASME, NBS, IRAM y CIRSOC (u otras previo estudio) y selección de resinas según fluido.",
    icon: "/assets/consultoria.png"
  },
  {
    title: "Diseño a Medida",
    description: "Desarrollo de proyectos especiales adaptados a planos de planta, espacios reducidos, reactores o accesorios personalizados.",
    icon: "/assets/matriz.png"
  }
];

export const faqs = [
  {
    question: "¿Por qué el PRFV es superior al acero al carbono o inoxidable?",
    answer: "El PRFV (Poliéster Reforzado con Fibra de Vidrio) es totalmente inmune a la corrosión química y salina, por lo que no requiere arenados, pinturas periódicas ni reemplazo de ánodos de sacrificio. Además, pesa hasta 4.4 veces menos que el acero al carbono, lo que simplifica su transporte e instalación y reduce drásticamente el costo total de propiedad a lo largo de sus más de 35 a 50 años de vida útil proyectada, con el respaldo de la trayectoria de Eboplast desde su fundación en 1978."
  },
  {
    question: "¿Cuál es la ventaja de la 'Soldadura Superior' de Eboplast?",
    answer: "Los tanques verticales convencionales suelen soldarse cerca del fondo o en el tercio inferior, donde la presión hidrostática del líquido es máxima, generando fatiga y eventuales pérdidas. En Eboplast, el fondo y el cilindro se fabrican en una sola pieza continua monolítica; al no haber soldadura entre fondo y cilindro, se elimina la fatiga en la base y se disminuye también el riesgo de ataque químico. La única costura se ubica en el casquete superior, donde no hay presión hidrostática."
  },
  {
    question: "¿Qué tipo de fluidos pueden almacenarse en los tanques Eboplast?",
    answer: "Podemos almacenar una amplísima gama de productos: fertilizantes líquidos (UAN, SolMix, tiosulfato), ácidos (clorhídrico, sulfúrico, nítrico diluido, fosfórico), soda cáustica, salmueras, hidrocarburos, agroquímicos, leche y suero alimenticio, agua potable, efluentes industriales y agua para redes de incendio. En cada caso seleccionamos la resina óptima (viniléster, isoftálicas y otras)."
  },
  {
    question: "¿Hacen envíos y montajes al interior de Argentina?",
    answer: "Sí, realizamos entregas y montajes completos en todas las provincias de Argentina. Contamos con experiencia en instalación de tanques elevados, torres metálicas normalizadas y baterías de tanques para industrias y municipios."
  },
  {
    question: "¿Bajo qué normas se fabrican y qué garantía tienen los productos?",
    answer: "Todos nuestros productos cuentan con garantía de calidad por escrito de 1 año. Aparte de las normas ASTM, trabajamos con BS, ASME, NBS, IRAM y CIRSOC; y previo estudio técnico podemos trabajar con cualquier otra norma o reglamento requerido por el proyecto."
  }
];
