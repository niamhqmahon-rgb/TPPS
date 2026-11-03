/* TPPS: site content that is rendered as lists (cloned from the Energy Basics site).
   Draft content modelled on the VoltGenics site. Replace with TPPS's real
   catalogue and service list once details are confirmed. */

window.TP = window.TP || {};

/* Contact details used by forms and the contact page (from the TPPS letterhead). */
TP.contact = {
  email: "info@tpps-sa.com",
  phone: "+966 56 888 4799",
  phoneHref: "+966568884799"
};

/* Line icons (24×24, stroke). */
TP.icons = {
  bolt: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  switchgear: '<rect x="4" y="2" width="16" height="20" rx="1.5"/><path d="M8 6h8M8 10h8"/><circle cx="9" cy="16" r="1.5"/><circle cx="15" cy="16" r="1.5"/>',
  transformer: '<rect x="5" y="7" width="14" height="13" rx="1.5"/><path d="M8 7V4M12 7V3M16 7V4M9 11v5M12 11v5M15 11v5"/>',
  cable: '<circle cx="8" cy="12" r="5"/><circle cx="8" cy="12" r="1.5"/><path d="M13 12h3a4 4 0 0 1 4 4v4"/>',
  meter: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8v4H8z"/><path d="M9 16h.01M12 16h.01M15 16h.01"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  gauge: '<path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'
};

TP.categories = [
  { id: "switchgear", icon: "switchgear", en: "Switchgear & RMUs", ar: "المفاتيح الكهربائية ووحدات RMU" },
  { id: "transformers", icon: "transformer", en: "Transformers", ar: "المحولات" },
  { id: "cables", icon: "cable", en: "Cables & accessories", ar: "الكابلات وملحقاتها" },
  { id: "protection", icon: "meter", en: "Protection & metering", ar: "الحماية والقياس" },
  { id: "renewables", icon: "sun", en: "Solar & storage", ar: "الطاقة الشمسية والتخزين" },
  { id: "testing", icon: "gauge", en: "Test equipment", ar: "معدات الاختبار" }
];

/* Sample catalogue items. photo: file in assets/images (same photos as the Energy Basics design). stock: true = in stock, false = sourced to order. */
TP.products = [
  { id: "rmu-24", photo: "products/rmu-24.jpg", cat: "switchgear", stock: true,
    en: { name: "Ring main unit, 24 kV", spec: "SF6 free, 3 way, 630 A" },
    ar: { name: "وحدة حلقية رئيسية، 24 ك.ف", spec: "خالية من SF6، ثلاثية الاتجاه، 630 أمبير" } },
  { id: "ais-138", photo: "products/ais-138.jpg", cat: "switchgear", stock: false,
    en: { name: "Air insulated switchgear panel, 13.8 kV", spec: "Withdrawable breaker, 1250 A" },
    ar: { name: "لوحة مفاتيح معزولة بالهواء، 13.8 ك.ف", spec: "قاطع قابل للسحب، 1250 أمبير" } },
  { id: "lvdb-400", photo: "products/lvdb-400.jpg", cat: "switchgear", stock: true,
    en: { name: "LV distribution board, 400 V", spec: "Form 4, up to 3200 A" },
    ar: { name: "لوحة توزيع جهد منخفض، 400 فولت", spec: "النموذج 4، حتى 3200 أمبير" } },
  { id: "tx-1000", photo: "products/tx-1000.jpg", cat: "transformers", stock: false,
    en: { name: "Distribution transformer, 1000 kVA", spec: "13.8 / 0.4 kV, oil immersed" },
    ar: { name: "محول توزيع، 1000 ك.ف.أ", spec: "13.8 / 0.4 ك.ف، مغمور بالزيت" } },
  { id: "tx-pad-500", photo: "products/tx-pad-500.jpg", cat: "transformers", stock: true,
    en: { name: "Pad mounted transformer, 500 kVA", spec: "Compact, outdoor rated" },
    ar: { name: "محول أرضي، 500 ك.ف.أ", spec: "مدمج، مناسب للتركيب الخارجي" } },
  { id: "xlpe-15", photo: "products/xlpe-15.jpg", cat: "cables", stock: true,
    en: { name: "XLPE power cable, 15 kV", spec: "3 × 240 mm², copper, armoured" },
    ar: { name: "كابل طاقة XLPE، 15 ك.ف", spec: "3 × 240 مم²، نحاس، مُدرّع" } },
  { id: "term-15", photo: "products/term-15.jpg", cat: "cables", stock: true,
    en: { name: "Cold shrink termination kit, 15 kV", spec: "Indoor and outdoor, 3 core" },
    ar: { name: "طقم نهايات بالانكماش البارد، 15 ك.ف", spec: "داخلي وخارجي، ثلاثي القلب" } },
  { id: "relay-num", photo: "products/relay-num.jpg", cat: "protection", stock: true,
    en: { name: "Numerical protection relay", spec: "Feeder protection, IEC 61850" },
    ar: { name: "مرحل حماية رقمي", spec: "حماية المغذيات، IEC 61850" } },
  { id: "meter-3ph", photo: "products/meter-3ph.jpg", cat: "protection", stock: true,
    en: { name: "Smart energy meter, 3 phase", spec: "Class 0.5S, Modbus" },
    ar: { name: "عداد طاقة ذكي، ثلاثي الطور", spec: "الفئة 0.5S، Modbus" } },
  { id: "inv-100", photo: "products/inv-100.jpg", cat: "renewables", stock: false,
    en: { name: "Solar string inverter, 100 kW", spec: "Grid tied, IP66" },
    ar: { name: "عاكس شمسي، 100 ك.و", spec: "متصل بالشبكة، IP66" } },
  { id: "bess-250", cat: "renewables", stock: false,
    en: { name: "Battery storage cabinet, 250 kWh", spec: "LFP, outdoor enclosure" },
    ar: { name: "خزانة تخزين بطاريات، 250 ك.و.س", spec: "ليثيوم فوسفات الحديد، حاوية خارجية" } },
  { id: "ir-5kv", photo: "products/ir-5kv.jpg", cat: "testing", stock: true,
    en: { name: "Insulation resistance tester, 5 kV", spec: "Up to 10 TΩ, PI and DAR" },
    ar: { name: "جهاز قياس مقاومة العزل، 5 ك.ف", spec: "حتى 10 تيرا أوم، PI و DAR" } }
];

TP.services = [
  { id: "install", photo: "svc-install.jpg", icon: "tool",
    en: { name: "Installation & erection", desc: "Switchgear, transformers and cable systems installed by certified crews, to drawing and to standard." },
    ar: { name: "التركيب والتجميع", desc: "تركيب المفاتيح والمحولات وأنظمة الكابلات بواسطة فرق معتمدة وفق المخططات والمعايير." } },
  { id: "commissioning", photo: "svc-commissioning.jpg", icon: "bolt",
    en: { name: "Testing & commissioning", desc: "Pre commissioning tests, energisation and handover with full test records." },
    ar: { name: "الاختبار والتشغيل", desc: "اختبارات ما قبل التشغيل والتشغيل والتسليم مع سجلات اختبار كاملة." } },
  { id: "protection", photo: "svc-protection.jpg", icon: "shield",
    en: { name: "Protection relay testing", desc: "Secondary injection, settings verification and scheme checks." },
    ar: { name: "اختبار مرحلات الحماية", desc: "الحقن الثانوي والتحقق من الإعدادات وفحص مخططات الحماية." } },
  { id: "cables", photo: "svc-cables.jpg", icon: "cable",
    en: { name: "Cable jointing & termination", desc: "LV, MV and HV joints and terminations, plus cable fault location." },
    ar: { name: "وصلات ونهايات الكابلات", desc: "وصلات ونهايات للجهد المنخفض والمتوسط والعالي، إضافة إلى تحديد أعطال الكابلات." } },
  { id: "transformers", photo: "svc-transformers.jpg", icon: "transformer",
    en: { name: "Transformer services", desc: "Oil testing and treatment, inspections and condition assessment." },
    ar: { name: "خدمات المحولات", desc: "اختبار الزيت ومعالجته والفحوصات وتقييم الحالة." } },
  { id: "maintenance", photo: "svc-maintenance.jpg", icon: "gear",
    en: { name: "Maintenance & O&M", desc: "Planned and corrective maintenance for substations and renewable plants." },
    ar: { name: "الصيانة والتشغيل", desc: "صيانة مخططة وتصحيحية للمحطات الفرعية ومحطات الطاقة المتجددة." } }
];

TP.consulting = [
  { id: "grid", icon: "chart",
    en: { name: "Grid connection studies", desc: "Load flow, short circuit and compliance studies for new connections." },
    ar: { name: "دراسات الربط بالشبكة", desc: "دراسات تدفق الأحمال وقصر الدائرة والمطابقة للتوصيلات الجديدة." } },
  { id: "coordination", icon: "shield",
    en: { name: "Protection coordination", desc: "Relay settings and selectivity studies, reviewed and tested." },
    ar: { name: "تنسيق الحماية", desc: "دراسات إعدادات المرحلات والانتقائية، مع المراجعة والاختبار." } },
  { id: "audit", icon: "gauge",
    en: { name: "Energy audits", desc: "Find losses and savings across your site, with a clear action plan." },
    ar: { name: "تدقيق الطاقة", desc: "تحديد الفاقد وفرص التوفير في منشأتك مع خطة عمل واضحة." } },
  { id: "owners", icon: "clipboard",
    en: { name: "Owner's engineer", desc: "Technical oversight from design review and tender support to commissioning." },
    ar: { name: "مهندس المالك", desc: "إشراف فني من مراجعة التصميم ودعم المناقصات حتى التشغيل." } }
];
