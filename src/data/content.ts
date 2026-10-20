export const IMAGES = {
  // Hero & section backdrops
  heroField:
    'https://images.pexels.com/photos/723498/pexels-photo-723498.jpeg?auto=compress&cs=tinysrgb&w=2400',
  heroPort:
    'https://images.pexels.com/photos/21234960/pexels-photo-21234960.jpeg?auto=compress&cs=tinysrgb&w=2400',
  portVessel:
    'https://images.pexels.com/photos/20581299/pexels-photo-20581299.jpeg?auto=compress&cs=tinysrgb&w=2000',
  editorialPortrait:
    'https://images.pexels.com/photos/17366069/pexels-photo-17366069.jpeg?auto=compress&cs=tinysrgb&w=1200',
  indiaFields:
    'https://images.pexels.com/photos/20841297/pexels-photo-20841297.jpeg?auto=compress&cs=tinysrgb&w=2000',
  grainTexture:
    'https://images.pexels.com/photos/30723398/pexels-photo-30723398.jpeg?auto=compress&cs=tinysrgb&w=2000',
  spiceFlatlay:
    'https://images.pexels.com/photos/7966784/pexels-photo-7966784.jpeg?auto=compress&cs=tinysrgb&w=2000',
  spiceMarket:
    'https://images.pexels.com/photos/5504609/pexels-photo-5504609.jpeg?auto=compress&cs=tinysrgb&w=2000',
  globalTrade:
    'https://images.pexels.com/photos/9806482/pexels-photo-9806482.jpeg?auto=compress&cs=tinysrgb&w=2000',
  freight:
    'https://images.pexels.com/photos/21234960/pexels-photo-21234960.jpeg?auto=compress&cs=tinysrgb&w=2000',

  // Process steps
  sourcingFarm:
    'https://images.pexels.com/photos/6877845/pexels-photo-6877845.jpeg?auto=compress&cs=tinysrgb&w=1600',
  qualityControl:
    'https://images.pexels.com/photos/8442444/pexels-photo-8442444.jpeg?auto=compress&cs=tinysrgb&w=1600',
  packaging:
    'https://images.pexels.com/photos/34221784/pexels-photo-34221784.jpeg?auto=compress&cs=tinysrgb&w=1600',
  cargoShip:
    'https://images.pexels.com/photos/20581299/pexels-photo-20581299.jpeg?auto=compress&cs=tinysrgb&w=1600',

  // Spices
  cuminClose:
    'https://images.pexels.com/photos/10487762/pexels-photo-10487762.jpeg?auto=compress&cs=tinysrgb&w=1200',
  turmericClose:
    'https://images.pexels.com/photos/6220710/pexels-photo-6220710.jpeg?auto=compress&cs=tinysrgb&w=1200',
  turmericPowder:
    'https://images.pexels.com/photos/6104651/pexels-photo-6104651.jpeg?auto=compress&cs=tinysrgb&w=1200',
  kashmiriChilli:
    'https://images.pexels.com/photos/30387987/pexels-photo-30387987.jpeg?auto=compress&cs=tinysrgb&w=1200',
  chilliClose:
    'https://images.pexels.com/photos/9938169/pexels-photo-9938169.jpeg?auto=compress&cs=tinysrgb&w=1200',
  fennelClose:
    'https://images.pexels.com/photos/5988041/pexels-photo-5988041.jpeg?auto=compress&cs=tinysrgb&w=1200',
  fennelBowl:
    'https://images.pexels.com/photos/16858849/pexels-photo-16858849.jpeg?auto=compress&cs=tinysrgb&w=1200',
  cardamom:
    'https://images.pexels.com/photos/8217944/pexels-photo-8217944.jpeg?auto=compress&cs=tinysrgb&w=1200',
  blackPepper:
    'https://images.pexels.com/photos/8559086/pexels-photo-8559086.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Grains
  riceGrains:
    'https://images.pexels.com/photos/7421207/pexels-photo-7421207.jpeg?auto=compress&cs=tinysrgb&w=1200',
  wheatGrains:
    'https://images.pexels.com/photos/35901577/pexels-photo-35901577.jpeg?auto=compress&cs=tinysrgb&w=1200',
  wheatField:
    'https://images.pexels.com/photos/11987205/pexels-photo-11987205.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Oilseeds
  sesame:
    'https://images.pexels.com/photos/7420888/pexels-photo-7420888.jpeg?auto=compress&cs=tinysrgb&w=1200',
  sunflowerSeeds:
    'https://images.pexels.com/photos/18328395/pexels-photo-18328395.jpeg?auto=compress&cs=tinysrgb&w=1200',
  mustardSeeds:
    'https://images.pexels.com/photos/18346906/pexels-photo-18346906.jpeg?auto=compress&cs=tinysrgb&w=1200',
  peanuts:
    'https://images.pexels.com/photos/33501329/pexels-photo-33501329.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Pulses
  lentils:
    'https://images.pexels.com/photos/6086414/pexels-photo-6086414.jpeg?auto=compress&cs=tinysrgb&w=1200',
  redLentils:
    'https://images.pexels.com/photos/34940649/pexels-photo-34940649.jpeg?auto=compress&cs=tinysrgb&w=1200',
  chickpeas:
    'https://images.pexels.com/photos/14440733/pexels-photo-14440733.jpeg?auto=compress&cs=tinysrgb&w=1200',
  mungBeans:
    'https://images.pexels.com/photos/18358654/pexels-photo-18358654.jpeg?auto=compress&cs=tinysrgb&w=1200',
} as const;

export type Commodity = {
  id: string;
  name: string;
  category: 'Spices' | 'Grains' | 'Oilseeds' | 'Pulses';
  tagline: string;
  description: string;
  origin: string;
  image: string;
};

export const COMMODITIES: Commodity[] = [
  {
    id: 'cumin',
    name: 'Cumin Seeds',
    category: 'Spices',
    tagline: 'Warm, aromatic, unmistakably Indian',
    description:
      "Sourced from the sun-drenched fields of Gujarat and Rajasthan, our cumin seeds carry a bold, earthy aroma prized by kitchens and processors across continents. Available whole or ground, in 99% purity grades.",
    origin: 'Gujarat & Rajasthan, India',
    image: IMAGES.cuminClose,
  },
  {
    id: 'turmeric',
    name: 'Turmeric (Curcumin)',
    category: 'Spices',
    tagline: 'The golden root of global wellness',
    description:
      'High-curcumin turmeric from Erode and Sangli — deep golden, finely milled, and lab-tested for purity. A cornerstone of modern wellness and food manufacturing.',
    origin: 'Erode & Sangli, India',
    image: IMAGES.turmericClose,
  },
  {
    id: 'kashmiri-chilli',
    name: 'Kashmiri Chilli',
    category: 'Spices',
    tagline: 'Vivid colour, gentle heat',
    description:
      'Known for its radiant crimson hue and mild warmth, Kashmiri chilli is the preferred colouring spice for premium food brands worldwide. Offered whole, powdered, and stemless.',
    origin: 'Kashmir Valley, India',
    image: IMAGES.kashmiriChilli,
  },
  {
    id: 'fennel',
    name: 'Fennel Seeds',
    category: 'Spices',
    tagline: 'Sweet, cooling, globally versatile',
    description:
      'Plump, green fennel seeds with a sweet anise character — ideal for culinary, beverage, and pharmaceutical applications across global markets.',
    origin: 'Gujarat, India',
    image: IMAGES.fennelClose,
  },
  {
    id: 'cardamom',
    name: 'Green Cardamom',
    category: 'Spices',
    tagline: 'The queen of spices',
    description:
      'Premium 7mm and 8mm green cardamom from the misty hills of Kerala and Karnataka — bold pods, intense aroma, and meticulous grading for export.',
    origin: 'Kerala & Karnataka, India',
    image: IMAGES.cardamom,
  },
  {
    id: 'black-pepper',
    name: 'Black Pepper',
    category: 'Spices',
    tagline: 'Bold, pungent, universally essential',
    description:
      'Malabar black pepper with a high piperine content, machine-cleaned and steam-sterilized on request — the backbone of the global spice trade.',
    origin: 'Kerala, India',
    image: IMAGES.blackPepper,
  },
  {
    id: 'rice',
    name: 'Basmati & Non-Basmati Rice',
    category: 'Grains',
    tagline: 'Long-grain heritage from the foothills',
    description:
      'Aged basmati and premium non-basmati rice, rigorously sorted and graded for length, aroma, and moisture — ready for retail and bulk export alike.',
    origin: 'Punjab & Haryana, India',
    image: IMAGES.riceGrains,
  },
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'Grains',
    tagline: 'Milled quality you can build on',
    description:
      'Hard and soft wheat varieties with consistent protein and gluten profiles, sourced from the grain belts of central and northern India.',
    origin: 'Madhya Pradesh, India',
    image: IMAGES.wheatGrains,
  },
  {
    id: 'sesame',
    name: 'Sesame Seeds',
    category: 'Oilseeds',
    tagline: 'Clean, hulled, export-grade',
    description:
      'Naturally white and hulled sesame seeds, meticulously cleaned to 99.9% purity — a staple for bakeries, oil extraction, and confectionery worldwide.',
    origin: 'Gujarat & Rajasthan, India',
    image: IMAGES.sesame,
  },
  {
    id: 'sunflower',
    name: 'Sunflower Seeds',
    category: 'Oilseeds',
    tagline: 'High-oil, food-grade kernel',
    description:
      'Bakery-grade sunflower kernels, sorted for size and colour with low moisture and foreign matter — trusted by roasters and food processors.',
    origin: 'Across India',
    image: IMAGES.sunflowerSeeds,
  },
  {
    id: 'mustard',
    name: 'Mustard Seeds',
    category: 'Oilseeds',
    tagline: 'Pungent, bold, oil-rich',
    description:
      'Yellow, brown, and black mustard seeds with high oil content and consistent purity — supplied whole or as pressed oil and de-oiled cake.',
    origin: 'Rajasthan & Madhya Pradesh, India',
    image: IMAGES.mustardSeeds,
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Peanuts)',
    category: 'Oilseeds',
    tagline: 'Crunchy, oil-rich, export-selected',
    description:
      'Bold-count groundnuts (50/60, 60/70) with high oil content and aflatoxin-tested lots — supplied in shell, shelled, or blanched.',
    origin: 'Gujarat, India',
    image: IMAGES.peanuts,
  },
  {
    id: 'lentils',
    name: 'Lentils (Masoor)',
    category: 'Pulses',
    tagline: 'Plant protein, sorted and graded',
    description:
      'Whole and split masoor lentils, machine-sorted and moisture-controlled to meet import-grade standards for global food security programs.',
    origin: 'Madhya Pradesh & Uttar Pradesh, India',
    image: IMAGES.lentils,
  },
  {
    id: 'red-lentils',
    name: 'Red Lentils',
    category: 'Pulses',
    tagline: 'Quick-cooking, protein-dense',
    description:
      'Bright, split red lentils with minimal broken content — ideal for dal milling, packaged foods, and humanitarian supply chains.',
    origin: 'Across India',
    image: IMAGES.redLentils,
  },
  {
    id: 'chickpeas',
    name: 'Chickpeas (Chana)',
    category: 'Pulses',
    tagline: 'Bold, firm, versatile',
    description:
      'Kabuli and desi chickpeas in 42–58 counts per ounce, cleaned and graded for canning, flour milling, and whole-food retail.',
    origin: 'Maharashtra & Rajasthan, India',
    image: IMAGES.chickpeas,
  },
  {
    id: 'mung-beans',
    name: 'Mung Beans',
    category: 'Pulses',
    tagline: 'Green gram, sprout-grade quality',
    description:
      'Vibrant green mung beans with high germination rates — suitable for sprouting, flour milling, and premium packaged retail.',
    origin: 'Rajasthan & Maharashtra, India',
    image: IMAGES.mungBeans,
  },
];

export const CONTACT_INFO = {
  email: 'Info@meridianexports.in',
  phone: '+91 97734 70849',
  phoneHref: '+919773470849',
  address:
    'Parinee Crescenzo, G Block, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra.',
  hours: 'Monday–Saturday · 9 AM – 6 PM IST',
};

export const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

export const CERTIFICATIONS = [
  {
    code: 'ISO 22000',
    name: 'Food Safety Management',
    description: 'Internationally recognized standard for food safety across the supply chain.',
  },
  {
    code: 'FSSAI',
    name: 'Food Safety & Standards Authority of India',
    description: "Licensed and compliant with India's central food safety regulator.",
  },
  {
    code: 'HACCP',
    name: 'Hazard Analysis & Critical Control Points',
    description: 'Systematic approach to biological, chemical, and physical hazard control.',
  },
  {
    code: 'APEDA',
    name: 'Agricultural & Processed Food Products Export Authority',
    description: "Registered exporter under India's apex agri-export authority.",
  },
];

export const PROCESS_STEPS = [
  {
    id: 'sourcing',
    label: 'Sourcing',
    title: 'From the right origins',
    description:
      "We partner directly with farmers and cooperatives in India's most fertile regions, selecting crops at peak harvest for quality and traceability.",
    image: IMAGES.sourcingFarm,
  },
  {
    id: 'qc',
    label: 'Quality Control',
    title: 'Tested, sorted, graded',
    description:
      'Every lot passes through multi-stage cleaning, lab testing for moisture, purity, and microbial safety, and machine sorting to meet export-grade standards.',
    image: IMAGES.qualityControl,
  },
  {
    id: 'packaging',
    label: 'Export Packaging',
    title: 'Sealed for the journey',
    description:
      'We pack in food-grade, moisture-barrier packaging — from consumer retail to bulk container loads — preserving quality from origin to destination port.',
    image: IMAGES.packaging,
  },
  {
    id: 'freight',
    label: 'Global Freight',
    title: 'On the water, on schedule',
    description:
      'Coordinated container shipping with trusted logistics partners, full documentation support, and real-time tracking to over 30 countries.',
    image: IMAGES.cargoShip,
  },
];

export const EXPORT_REGIONS = [
  { label: 'Middle East', x: 620, y: 200, fromX: 700, fromY: 235 },
  { label: 'Europe', x: 510, y: 150, fromX: 700, fromY: 235 },
  { label: 'Americas', x: 220, y: 215, fromX: 700, fromY: 235 },
];

export const DOWNLOADS = [
  {
    title: 'Company Profile',
    description: 'An overview of Meridians Exports — our heritage, values, capabilities, and global network.',
    href: '#',
    label: 'Download PDF',
  },
  {
    title: 'Spice Brochure',
    description: 'Detailed specifications, grades, and packaging options for our premium spice range.',
    href: '#',
    label: 'Download PDF',
  },
  {
    title: 'Grains & Pulses Brochure',
    description: 'Varieties, sourcing regions, and quality parameters for our grains and pulses portfolio.',
    href: '#',
    label: 'Download PDF',
  },
  {
    title: 'Oilseeds Brochure',
    description: 'Purity grades, oil content, and bulk packaging specifications for oilseeds and meal.',
    href: '#',
    label: 'Download PDF',
  },
];

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Downloads', to: '/downloads' },
  { label: 'Contact', to: '/contact' },
] as const;
