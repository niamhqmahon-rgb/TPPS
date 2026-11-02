/* TPPS: site content that is rendered as lists (English + Arabic).
   The service list is a first draft: confirm scope with TPPS before launch. Sectors are a draft too. */

window.TP = window.TP || {};

/* Contact details used by forms, the contact page and the footer (from the TPPS letterhead). */
TP.contact = {
  email: "info@tpps-sa.com",
  phone: "+966 56 888 4799",
  phoneHref: "+966568884799",
  cr: "7052232563"
};

/* Line icons (24×24, stroke). */
TP.icons = {
  bolt: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  switchgear: '<rect x="4" y="2" width="16" height="20" rx="1.5"/><path d="M8 6h8M8 10h8"/><circle cx="9" cy="16" r="1.5"/><circle cx="15" cy="16" r="1.5"/>',
  transformer: '<rect x="5" y="7" width="14" height="13" rx="1.5"/><path d="M8 7V4M12 7V3M16 7V4M9 11v5M12 11v5M15 11v5"/>',
  cable: '<circle cx="8" cy="12" r="5"/><circle cx="8" cy="12" r="1.5"/><path d="M13 12h3a4 4 0 0 1 4 4v4"/>',
  earth: '<path d="M12 3v9M5 12h14M7.5 15.5h9M10 19h4"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  ruler: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2"/>',
  pylon: '<path d="M8 22 12 2l4 20M9.2 16h5.6M10.4 10h3.2M4 6h16M6 6v2M18 6v2M9 22l5-6M15 22l-5-6"/>',
  factory: '<path d="M2 20V9l6 4V9l6 4V4h6v16z"/><path d="M6 17h2M11 17h2M16 17h2"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  road: '<path d="M4 22 8 2M20 22 16 2M12 4v3M12 11v3M12 18v3"/>',
  gauge: '<path d="M12 14l4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>'
};

/* Services. ids double as anchors: #/services/<id> scrolls to the row.
   photo: file in assets/images (standin: true marks generated stand in artwork until real photos arrive). */
TP.services = [
  { id: "design", photo: "about-office-warm.jpg", icon: "ruler",
    en: { name: "Design & engineering", desc: "Load flow, short circuit and cable sizing studies, single line diagrams, specifications and shop drawings." },
    ar: { name: "التصميم والهندسة", desc: "دراسات تدفق الأحمال وقصر الدائرة وتحديد مقاطع الكابلات، والمخططات أحادية الخط والمواصفات ورسومات التنفيذ." } },
  { id: "install", photo: "services-2.jpg", icon: "tool",
    en: { name: "Installation & erection", desc: "Switchgear, transformers, distribution boards and cable systems installed to drawing and to standard." },
    ar: { name: "التركيب والتجميع", desc: "تركيب لوحات المفاتيح والمحولات ولوحات التوزيع وأنظمة الكابلات وفق المخططات والمعايير." } },
  { id: "commissioning", photo: "services-1.jpg", icon: "bolt",
    en: { name: "Testing & commissioning", desc: "Pre commissioning tests, energisation and handover with complete, signed test records." },
    ar: { name: "الاختبار والتشغيل", desc: "اختبارات ما قبل التشغيل والتشغيل والتسليم مع سجلات اختبار كاملة وموقعة." } },
  { id: "substations", photo: "hero-power-lines.jpg", icon: "switchgear",
    en: { name: "Substations & switchgear", desc: "MV and HV substation works, ring main units, switchgear panels and transformer connections." },
    ar: { name: "المحطات الفرعية ولوحات المفاتيح", desc: "أعمال المحطات الفرعية للجهد المتوسط والعالي، والوحدات الحلقية الرئيسية، ولوحات المفاتيح، وتوصيل المحولات." } },
  { id: "cables", photo: "services-4.jpg", icon: "cable",
    en: { name: "Cable jointing & termination", desc: "LV, MV and HV cable laying, joints and terminations, plus cable testing and fault location." },
    ar: { name: "وصلات ونهايات الكابلات", desc: "مد الكابلات ووصلاتها ونهاياتها للجهد المنخفض والمتوسط والعالي، مع اختبار الكابلات وتحديد الأعطال." } },
  { id: "protection", photo: "services-3.jpg", icon: "shield",
    en: { name: "Protection & control", desc: "Relay testing by secondary injection, settings verification, interlocks and protection scheme checks." },
    ar: { name: "الحماية والتحكم", desc: "اختبار المرحلات بالحقن الثانوي والتحقق من الإعدادات والتعشيقات وفحص مخططات الحماية." } },
  { id: "earthing", photo: "svc-earthing-standin.jpg", standin: true, icon: "earth",
    en: { name: "Earthing & lightning protection", desc: "Earthing system design, installation and resistance testing, and lightning protection for buildings and plants." },
    ar: { name: "التأريض والحماية من الصواعق", desc: "تصميم أنظمة التأريض وتركيبها وقياس مقاومتها، والحماية من الصواعق للمباني والمنشآت." } },
  { id: "maintenance", photo: "svc-maintenance-standin.jpg", standin: true, icon: "gear",
    en: { name: "Maintenance & support", desc: "Planned and corrective maintenance, thermographic surveys and condition assessment across the asset life cycle." },
    ar: { name: "الصيانة والدعم", desc: "صيانة مخططة وتصحيحية ومسوحات حرارية وتقييم للحالة طوال دورة حياة الأصول." } }
];

/* Sectors served. Draft: confirm with TPPS. */
TP.sectors = [
  { icon: "pylon", en: "Utilities & power networks", ar: "المرافق وشبكات الكهرباء" },
  { icon: "factory", en: "Industry & manufacturing", ar: "الصناعة والتصنيع" },
  { icon: "building", en: "Commercial & residential buildings", ar: "المباني التجارية والسكنية" },
  { icon: "road", en: "Infrastructure & transport", ar: "البنية التحتية والنقل" },
  { icon: "drop", en: "Water & desalination", ar: "المياه وتحلية المياه" },
  { icon: "sun", en: "Renewables & storage", ar: "الطاقة المتجددة والتخزين" }
];

/* Products (catalogue categories). FIRST DRAFT: names, descriptions and photos are stand ins
   until TPPS supplies the real product range. ids double as anchors: #/products/<id>.
   Photos are crops of the supplied site photos (standin: true shows a Draft label). */
TP.products = [
  { id: "switchgear", photo: "product-switchgear.jpg", standin: true, icon: "switchgear",
    en: { name: "Switchgear & contactors", desc: "LV and MV switchgear, ring main units, distribution boards, contactors and circuit breakers." },
    ar: { name: "لوحات المفاتيح والملامسات", desc: "لوحات مفاتيح الجهد المنخفض والمتوسط والوحدات الحلقية الرئيسية ولوحات التوزيع والملامسات والقواطع." } },
  { id: "protection", photo: "product-protection.jpg", standin: true, icon: "shield",
    en: { name: "Protection & metering", desc: "Protection relays, energy meters, current and voltage transformers, and control components." },
    ar: { name: "الحماية والقياس", desc: "مرحلات الحماية وعدادات الطاقة ومحولات التيار والجهد ومكونات التحكم." } },
  { id: "cables", photo: "product-cables.jpg", standin: true, icon: "cable",
    en: { name: "Cables & accessories", desc: "LV, MV and HV power cables, control cables, joints, terminations, lugs and glands." },
    ar: { name: "الكابلات وملحقاتها", desc: "كابلات القوى للجهد المنخفض والمتوسط والعالي وكابلات التحكم والوصلات والنهايات والأطراف والجلندات." } },
  { id: "solar", photo: "product-solar.jpg", standin: true, icon: "sun",
    en: { name: "Solar inverters & storage", desc: "Grid tied inverters, battery storage, DC connectors and the cabling to connect them." },
    ar: { name: "العاكسات الشمسية والتخزين", desc: "عاكسات متصلة بالشبكة وتخزين البطاريات وموصلات التيار المستمر والكابلات اللازمة لتوصيلها." } },
  { id: "test", photo: "product-test.jpg", standin: true, icon: "gauge",
    en: { name: "Test equipment", desc: "Multimeters, insulation resistance testers, earth testers and relay test sets." },
    ar: { name: "معدات الاختبار", desc: "أجهزة القياس المتعددة وأجهزة قياس مقاومة العزل وأجهزة قياس التأريض وأجهزة اختبار المرحلات." } },
  { id: "overhead", photo: "product-overhead.jpg", standin: true, icon: "pylon",
    en: { name: "Overhead line materials", desc: "Conductors, insulators, fittings and hardware for overhead distribution and transmission lines." },
    ar: { name: "مواد الخطوط الهوائية", desc: "الموصلات والعوازل والتجهيزات والملحقات لخطوط التوزيع والنقل الهوائية." } }
];
