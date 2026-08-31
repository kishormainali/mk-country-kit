/**
 * scripts/generate-countries.mjs
 * Fetches the full countries.json from https://raw.githubusercontent.com/dr5hn/countries-states-cities-database
 * and writes a TypeScript data module to src/data/countries.ts
 *
 * Run: node scripts/generate-countries.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "packages", "data", "src", "data");
const OUT_COUNTRIES = join(OUT_DIR, "countries.ts");
const OUT_DIVISIONS = join(OUT_DIR, "divisions.ts");
const OUT_TIMEZONES = join(OUT_DIR, "timezones.ts");
const OUT_PHONE_FORMATS = join(OUT_DIR, "phoneFormats.ts");
const OUT_CURRENCIES = join(OUT_DIR, "currencies.ts");

const COUNTRY_URL =
  "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/countries.json";
const STATES_URL =
  "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/states.json";
const PHONE_METADATA_URL =
  "https://raw.githubusercontent.com/google/libphonenumber/refs/heads/master/resources/PhoneNumberMetadata.xml";

function iso2ToFlag(iso2) {
  return [...iso2.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

const LANGUAGE_MAP = {
  AF: "ps",
  AX: "sv",
  AL: "sq",
  DZ: "ar",
  AS: "en",
  AD: "ca",
  AO: "pt",
  AI: "en",
  AQ: "en",
  AG: "en",
  AR: "es",
  AM: "hy",
  AW: "nl",
  AU: "en-AU",
  AT: "de",
  AZ: "az",
  BS: "en",
  BH: "ar",
  BD: "bn",
  BB: "en",
  BY: "be",
  BE: "nl",
  BZ: "en",
  BJ: "fr",
  BM: "en",
  BT: "dz",
  BO: "es",
  BQ: "nl",
  BA: "bs",
  BW: "en",
  BV: "no",
  BR: "pt-BR",
  IO: "en",
  BN: "ms",
  BG: "bg",
  BF: "fr",
  BI: "fr",
  KH: "km",
  CM: "fr",
  CA: "en-CA",
  CV: "pt",
  KY: "en",
  CF: "fr",
  TD: "fr",
  CL: "es",
  CN: "zh-CN",
  CX: "en",
  CC: "en",
  CO: "es",
  KM: "ar",
  CG: "fr",
  CD: "fr",
  CK: "en",
  CR: "es",
  CI: "fr",
  HR: "hr",
  CU: "es",
  CW: "nl",
  CY: "el",
  CZ: "cs",
  DK: "da",
  DJ: "fr",
  DM: "en",
  DO: "es",
  EC: "es",
  EG: "ar",
  SV: "es",
  GQ: "es",
  ER: "ti",
  EE: "et",
  ET: "am",
  FK: "en",
  FO: "fo",
  FJ: "en",
  FI: "fi",
  FR: "fr-FR",
  GF: "fr",
  PF: "fr",
  TF: "fr",
  GA: "fr",
  GM: "en",
  GE: "ka",
  DE: "de",
  GH: "en",
  GI: "en",
  GR: "el",
  GL: "kl",
  GD: "en",
  GP: "fr",
  GU: "en",
  GT: "es",
  GG: "en",
  GN: "fr",
  GW: "pt",
  GY: "en",
  HT: "fr",
  HM: "en",
  VA: "it",
  HN: "es",
  HK: "zh-HK",
  HU: "hu",
  IS: "is",
  IN: "hi",
  ID: "id",
  IR: "fa",
  IQ: "ar",
  IE: "en",
  IM: "en",
  IL: "he",
  IT: "it",
  JM: "en",
  JP: "ja",
  JE: "en",
  JO: "ar",
  KZ: "kk",
  KE: "sw",
  KI: "en",
  KP: "ko",
  KR: "ko",
  KW: "ar",
  KG: "ky",
  LA: "lo",
  LV: "lv",
  LB: "ar",
  LS: "en",
  LR: "en",
  LY: "ar",
  LI: "de",
  LT: "lt",
  LU: "fr",
  MO: "zh-MO",
  MK: "mk",
  MG: "fr",
  MW: "en",
  MY: "ms",
  MV: "dv",
  ML: "fr",
  MT: "mt",
  MH: "en",
  MQ: "fr",
  MR: "ar",
  MU: "en",
  YT: "fr",
  MX: "es-MX",
  FM: "en",
  MD: "ro",
  MC: "fr",
  MN: "mn",
  ME: "sr",
  MS: "en",
  MA: "ar",
  MZ: "pt",
  MM: "my",
  NA: "en",
  NR: "en",
  NP: "ne",
  NL: "nl",
  NC: "fr",
  NZ: "en",
  NI: "es",
  NE: "fr",
  NG: "en",
  NU: "en",
  NF: "en",
  MP: "en",
  NO: "no",
  OM: "ar",
  PK: "ur",
  PW: "en",
  PS: "ar",
  PA: "es",
  PG: "en",
  PY: "es",
  PE: "es",
  PH: "fil",
  PN: "en",
  PL: "pl",
  PT: "pt-PT",
  PR: "es",
  QA: "ar",
  RE: "fr",
  RO: "ro",
  RU: "ru",
  RW: "rw",
  BL: "fr",
  SH: "en",
  KN: "en",
  LC: "en",
  MF: "fr",
  PM: "fr",
  VC: "en",
  WS: "sm",
  SM: "it",
  ST: "pt",
  SA: "ar",
  SN: "fr",
  RS: "sr",
  SC: "fr",
  SL: "en",
  SG: "zh-SG",
  SX: "nl",
  SK: "sk",
  SI: "sl",
  SB: "en",
  SO: "so",
  ZA: "en",
  GS: "en",
  SS: "en",
  ES: "es-ES",
  LK: "si",
  SD: "ar",
  SR: "nl",
  SJ: "no",
  SZ: "en",
  SE: "sv",
  CH: "de",
  SY: "ar",
  TW: "zh-TW",
  TJ: "tg",
  TZ: "sw",
  TH: "th",
  TL: "pt",
  TG: "fr",
  TK: "en",
  TO: "en",
  TT: "en",
  TN: "ar",
  TR: "tr",
  TM: "tk",
  TC: "en",
  TV: "en",
  UG: "en",
  UA: "uk",
  AE: "ar",
  GB: "en-GB",
  US: "en-US",
  UM: "en",
  UY: "es",
  UZ: "uz",
  VU: "bi",
  VE: "es",
  VN: "vi",
  VG: "en",
  VI: "en",
  WF: "fr",
  EH: "ar",
  YE: "ar",
  ZM: "en",
  ZW: "en",
};

const TAX_ID_MAP = {
  AU: { label: "ABN", placeholder: "00 000 000 000" },
  US: { label: "EIN / SSN", placeholder: "00-0000000" },
  GB: { label: "UTR / Company Number", placeholder: "0000000000" },
  CA: { label: "BN / GST/HST Number", placeholder: "000000000" },
  NZ: { label: "NZBN / IRD Number", placeholder: "000-000-000" },
  IN: { label: "GSTIN / PAN", placeholder: "00AAAAA0000A0A0" },
  DE: { label: "Steuernummer / USt-IdNr.", placeholder: "DE000000000" },
  FR: { label: "SIRET / TVA", placeholder: "000 000 000 00000" },
  IT: { label: "Partita IVA", placeholder: "IT00000000000" },
  ES: { label: "NIF / CIF", placeholder: "A00000000" },
  BR: { label: "CNPJ", placeholder: "00.000.000/0000-00" },
  MX: { label: "RFC", placeholder: "AAAA000000AA0" },
  ZA: { label: "Tax Number", placeholder: "0000000000" },
  JP: { label: "Corporation Number", placeholder: "0000000000000" },
  SG: { label: "UEN", placeholder: "000000000A" },
  AE: { label: "TRN", placeholder: "100000000000000" },
};

const POSTAL_LABEL_MAP = {
  US: "ZIP Code",
  GB: "Postcode",
  CA: "Postal Code",
  AU: "Postcode",
  NZ: "Postcode",
  DE: "PLZ",
  JP: "Postal Code (〒)",
  IN: "PIN Code",
  BR: "CEP",
};

function getTaxDataForCountry(iso2) {
  return (
    TAX_ID_MAP[iso2.toUpperCase()] || {
      label: "Tax ID",
      placeholder: "Enter tax ID",
    }
  );
}

function getPostalLabelForCountry(iso2) {
  return POSTAL_LABEL_MAP[iso2.toUpperCase()] || "Postal Code";
}

function getLanguageForCountry(iso2) {
  return LANGUAGE_MAP[iso2.toUpperCase()] || "en";
}

async function main() {
  console.log("⬇️  Reading dateFormats.ts...");
  const dateFormatsContent = readFileSync(join(OUT_DIR, "dateFormats.ts"), "utf8");
  const arrayStart = dateFormatsContent.indexOf("[", dateFormatsContent.indexOf("="));
  const arrayEnd = dateFormatsContent.lastIndexOf("]") + 1;
  const dateFormatsJson = dateFormatsContent.substring(arrayStart, arrayEnd);
  const dateFormats = JSON.parse(dateFormatsJson);
  const dateFormatsMap = new Map(dateFormats.map((df) => [df.countryCode.toUpperCase(), df]));

  console.log("⬇️  Fetching countries.json...");
  const countryRes = await fetch(COUNTRY_URL);
  if (!countryRes.ok)
    throw new Error(`HTTP countries error: ${countryRes.status}`);
  const countries = await countryRes.json();
  console.log(`✅  Parsed ${countries.length} countries`);

  console.log("⬇️  Fetching states.json...");
  const statesRes = await fetch(STATES_URL);
  if (!statesRes.ok) throw new Error(`HTTP states error: ${statesRes.status}`);
  const states = await statesRes.json();
  console.log(`✅  Parsed ${states.length} states`);

  console.log("⬇️  Fetching PhoneNumberMetadata.xml...");
  const xmlRes = await fetch(PHONE_METADATA_URL);
  if (!xmlRes.ok) throw new Error(`HTTP XML error: ${xmlRes.status}`);
  const xml = await xmlRes.text();
  console.log(
    `✅  Fetched PhoneNumberMetadata.xml (${Math.round(xml.length / 1024)} kB)`,
  );

  const phoneFormatsMap = new Map();
  const territoryRegex = /<territory\s+([^>]*?)>([\s\S]*?)<\/territory>/g;
  let xmlMatch;

  function cleanPattern(pattern) {
    return pattern ? pattern.replace(/\s+/g, "") : "";
  }

  function parseExampleNumber(val) {
    if (/^[1-9]\d*$/.test(val)) {
      return Number(val);
    }
    return val;
  }

  while ((xmlMatch = territoryRegex.exec(xml)) !== null) {
    const attrs = xmlMatch[1];
    const content = xmlMatch[2];

    const idMatch = attrs.match(/id="([^"]+)"/);
    const ccMatch = attrs.match(/countryCode="([^"]+)"/);
    if (!idMatch || !ccMatch) continue;

    const iso2 = idMatch[1].toUpperCase();
    const dialCode = ccMatch[1];

    if (iso2.length !== 2) continue;

    const npMatch = attrs.match(/\bnationalPrefix="([^"]+)"/);
    const nationalPrefix = npMatch ? npMatch[1] : undefined;

    const mobileMatch = content.match(/<mobile>([\s\S]*?)<\/mobile>/);
    const mobileContent = mobileMatch ? mobileMatch[1] : "";

    // patterns
    let patterns = "";
    const mobPatMatch = mobileContent.match(
      /<nationalNumberPattern>([\s\S]*?)<\/nationalNumberPattern>/,
    );
    if (mobPatMatch) {
      patterns = cleanPattern(mobPatMatch[1]);
    } else {
      const genPatMatch = content.match(
        /<generalDesc>[\s\S]*?<nationalNumberPattern>([\s\S]*?)<\/nationalNumberPattern>/,
      );
      if (genPatMatch) {
        patterns = cleanPattern(genPatMatch[1]);
      }
    }

    // possibleLengths
    let possibleLengths = "";
    const plMatch = (mobileContent || content).match(
      /<possibleLengths\s+([^>]*?)\/?>/,
    );
    if (plMatch) {
      const natMatch = plMatch[1].match(/national="([^"]+)"/);
      if (natMatch) {
        possibleLengths = natMatch[1];
      }
    }

    // example
    let example = "";
    const exMatch = mobileContent.match(
      /<exampleNumber>([^<]+)<\/exampleNumber>/,
    );
    if (exMatch) {
      example = exMatch[1].trim();
    } else {
      const fixedMatch = content.match(/<fixedLine>([\s\S]*?)<\/fixedLine>/);
      if (fixedMatch) {
        const fixedExMatch = fixedMatch[1].match(
          /<exampleNumber>([^<]+)<\/exampleNumber>/,
        );
        if (fixedExMatch) {
          example = fixedExMatch[1].trim();
        }
      }
    }

    phoneFormatsMap.set(iso2, {
      countryCode: iso2,
      iso2,
      dialCode,
      patterns,
      possibleLengths,
      example: parseExampleNumber(example),
      nationalPrefix,
    });
  }

  // Group states by country code (case-insensitive key)
  const statesByCountry = new Map();
  for (const s of states) {
    const cc = (s.country_code || "").toUpperCase();
    if (!statesByCountry.has(cc)) {
      statesByCountry.set(cc, []);
    }
    statesByCountry.get(cc).push(s);
  }

  function getDivisionType(countryCode) {
    const countryStates = statesByCountry.get(countryCode.toUpperCase()) || [];
    const types = new Set();
    for (const s of countryStates) {
      if (s.type) {
        // capitalize the type (e.g. province -> Province)
        const capitalized = s.type.charAt(0).toUpperCase() + s.type.slice(1);
        types.add(capitalized);
      }
    }
    if (types.size === 0) return "";
    const sortedTypes = Array.from(types).sort();
    return sortedTypes.join(" or ");
  }

  const allDivisions = [];
  const allTimezones = [];
  const allPhoneFormats = [];
  const allCurrencies = [];

  const processedCountries = countries.map((c) => {
    const iso2 = (c.iso2 || "").toUpperCase();
    const taxData = getTaxDataForCountry(iso2);
    const division_type = getDivisionType(iso2);
    const df = dateFormatsMap.get(iso2) || { format: "DD/MM/YYYY", separator: "/", weekStart: 1 };

    const countryWithFlag = {
      name: c.name,
      iso2: iso2,
      iso3: c.iso3 || "",
      phone_code: c.phonecode || "",
      division_type,
      flag: iso2ToFlag(iso2),
      flag_url: `https://flagcdn.com/w320/${iso2.toLowerCase()}.png`,
      language_code: getLanguageForCountry(iso2),
      currency_code: c.currency || "",
      tax_id_label: taxData.label,
      tax_id_placeholder: taxData.placeholder,
      postal_code_label: getPostalLabelForCountry(iso2),
      date_format: df.format,
      date_separator: df.separator,
      week_start: df.weekStart,
    };

    const countryStates = statesByCountry.get(iso2) || [];
    for (const s of countryStates) {
      allDivisions.push({
        name: s.name || "",
        iso2: s.iso2 || "",
        timezone: s.timezone || "",
        countryCode: iso2,
      });
    }

    if (c.timezones && Array.isArray(c.timezones)) {
      for (const tz of c.timezones) {
        allTimezones.push({
          name: tz.zoneName || "",
          offset: typeof tz.gmtOffset === "number" ? tz.gmtOffset : 0,
          offset_name: tz.gmtOffsetName || "",
          abbreviation: tz.abbreviation || "",
          tzName: tz.tzName || "",
          countryCode: iso2,
        });
      }
    }

    const existingPf = phoneFormatsMap.get(iso2);
    if (existingPf) {
      allPhoneFormats.push({
        ...existingPf,
        dialCode: c.phonecode || existingPf.dialCode || "",
        countryCode: iso2,
        iso2: iso2,
      });
    } else {
      allPhoneFormats.push({
        countryCode: iso2,
        iso2: iso2,
        dialCode: c.phonecode || "",
        patterns: "\\d+",
        possibleLengths: "[5-15]",
        example: "",
      });
    }

    if (c.currency) {
      let precision = 2;
      try {
        precision = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: c.currency,
        }).resolvedOptions().maximumFractionDigits;
      } catch (e) {}
      allCurrencies.push({
        code: c.currency,
        name: c.currency_name || c.currency,
        symbol: c.currency_symbol || "",
        countryCode: iso2,
        precision,
      });
    }

    return countryWithFlag;
  });

  const generateTsFile = (name, type, data, extra = "") => `/**
 * Auto-generated ${name} dataset — DO NOT EDIT MANUALLY.
 * Generated: ${new Date().toISOString()}
 */

${extra}import type { ${type} } from '../types';

export const ${name.toUpperCase()}: ${type}[] = ${JSON.stringify(data, null, 2)};

export default ${name.toUpperCase()};
`;

  const countriesTs = `/**
 * Auto-generated country dataset — DO NOT EDIT MANUALLY.
 * Source: ${COUNTRY_URL}
 * Generated: ${new Date().toISOString()}
 * Countries: ${processedCountries.length}
 */

export function iso2ToFlag(iso2: string): string {
  return [...iso2.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');
}

import type { ICountry } from '../types';

export const COUNTRIES: ICountry[] = ${JSON.stringify(processedCountries, null, 2)};

export default COUNTRIES;
`;

  mkdirSync(OUT_DIR, { recursive: true });

  writeFileSync(OUT_COUNTRIES, countriesTs, "utf8");
  writeFileSync(
    OUT_DIVISIONS,
    generateTsFile("divisions", "IDivision", allDivisions),
    "utf8",
  );
  writeFileSync(
    OUT_TIMEZONES,
    generateTsFile("timezones", "ITimezone", allTimezones),
    "utf8",
  );
  writeFileSync(
    OUT_PHONE_FORMATS,
    generateTsFile("phone_formats", "IPhoneFormat", allPhoneFormats),
    "utf8",
  );
  writeFileSync(
    OUT_CURRENCIES,
    generateTsFile("currencies", "ICurrency", allCurrencies),
    "utf8",
  );

  console.log(
    `📝  Written countries.ts (${Math.round(countriesTs.length / 1024)} kB)`,
  );
  console.log(`📝  Written divisions.ts (${allDivisions.length} items)`);
  console.log(`📝  Written timezones.ts (${allTimezones.length} items)`);
  console.log(`📝  Written phoneFormats.ts (${allPhoneFormats.length} items)`);
  console.log(`📝  Written currencies.ts (${allCurrencies.length} items)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
