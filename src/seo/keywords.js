// src/seo/keywords.js

// Brand-level keywords — used on Home page and as a base suffix everywhere
export const BRAND_KEYWORDS = [
  "Baltra",
  "Baltra Nepal",
  "Baltra appliances",
  "Baltra home appliances",
  "Baltra kitchen appliances",
  "Baltra products",
  "Baltra official website",
  "Baltra official Nepal",
];

export const GENERAL_KEYWORDS = [
  "home appliances Nepal",
  "kitchen appliances Nepal",
  "electrical appliances Nepal",
  "household appliances Nepal",
  "best home appliances Nepal",
  "best kitchen appliances Nepal",
];

// Keyed by your category slug/id — adjust keys to match what you already
// use for category.category_name or category.slug in your data.
export const CATEGORY_KEYWORDS = {
  "electric-kettle": [
    "Baltra kettle",
    "Baltra electric kettle",
    "Baltra electric kettle Nepal",
    "electric kettle Nepal",
    "electric kettle price in Nepal",
    "electric water kettle Nepal",
    "best electric kettle Nepal",
    "cordless electric kettle",
    "1.8L electric kettle",
    "stainless steel electric kettle",
    "Baltra kettle price",
  ],
  "pressure-cooker": [
    "Baltra pressure cooker",
    "Baltra pressure cooker Nepal",
    "pressure cooker Nepal",
    "pressure cooker price in Nepal",
    "best pressure cooker Nepal",
    "Baltra cookware",
    "Baltra cookware Nepal",
    "cookware set Nepal",
    "kitchen cookware Nepal",
    "non stick cookware Nepal",
  ],
  "induction-cooker": [
    "Baltra induction cooker",
    "Baltra induction cooker Nepal",
    "induction cooker Nepal",
    "induction stove Nepal",
    "induction cooktop Nepal",
    "induction cooker price in Nepal",
  ],
  fan: [
    "Baltra fan",
    "Baltra fan Nepal",
    "electric fan Nepal",
    "table fan Nepal",
    "pedestal fan Nepal",
    "ceiling fan Nepal",
    "best fan Nepal",
    "fan price in Nepal",
  ],
  "air-cooler": ["Baltra air cooler", "air cooler Nepal"],
  heater: [
    "Baltra heater",
    "Baltra heater Nepal",
    "room heater Nepal",
    "electric heater Nepal",
    "room heater price in Nepal",
    "best room heater Nepal",
    "fan heater Nepal",
    "electric room heater",
  ],
  "hair-dryer": [
    "Baltra hair dryer",
    "Baltra hair dryer Nepal",
    "hair dryer Nepal",
    "hair dryer price in Nepal",
  ],
  trimmer: [
    "Baltra trimmer",
    "Baltra trimmer Nepal",
    "electric trimmer Nepal",
    "beard trimmer Nepal",
  ],
  "hot-air-brush": ["Baltra hot air brush", "hair styling tools Nepal"],
  "egg-boiler": [
    "Baltra egg boiler",
    "Baltra egg boiler Nepal",
    "egg boiler Nepal",
    "egg cooker Nepal",
    "egg boiler price in Nepal",
  ],
  "water-bottle": [
    "Baltra water bottle",
    "Baltra water bottle Nepal",
    "water bottle Nepal",
    "insulated water bottle Nepal",
  ],
  flask: [
    "Baltra flask",
    "Baltra thermos flask",
    "thermos flask Nepal",
    "vacuum flask Nepal",
    "vacuum bottle Nepal",
  ],
};

export const SERVICE_KEYWORDS = [
  "Baltra service center Nepal",
  "Baltra service center",
  "Baltra customer service Nepal",
  "Baltra warranty Nepal",
  "Baltra product warranty",
  "Baltra appliance service Nepal",
  "Baltra complaint",
  "Baltra repair service Nepal",
  "Baltra spare parts Nepal",
];

/**
 * Builds the Brand + Product + Model combinations from section 13,
 * e.g. "Baltra Active BC 142", "Baltra BC 142", "Baltra Active kettle".
 * Call this per-product with whatever fields you have.
 */
export function buildProductKeywords({
  modelName,
  modelNum,
  categoryLabel,
  categorySlug,
}) {
  const combos = new Set();

  if (modelName && modelNum) combos.add(`Baltra ${modelName} ${modelNum}`);
  if (modelNum) combos.add(`Baltra ${modelNum}`);
  if (modelName && categoryLabel)
    combos.add(`Baltra ${modelName} ${categoryLabel}`);
  if (modelName && modelNum && categoryLabel)
    combos.add(`Baltra ${modelName} ${modelNum} ${categoryLabel}`);
  if (modelNum && categoryLabel)
    combos.add(`Baltra ${modelNum} ${categoryLabel}`);

  const categoryTerms = CATEGORY_KEYWORDS[categorySlug] || [];

  return [...combos, ...categoryTerms, ...BRAND_KEYWORDS.slice(0, 3)];
}

/** Comma-joined string for the meta keywords tag, capped to avoid bloat. */
export function toKeywordsString(keywordArray, max = 15) {
  return [...new Set(keywordArray)].slice(0, max).join(", ");
}
