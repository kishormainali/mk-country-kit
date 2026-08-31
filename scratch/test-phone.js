const metadata = require('libphonenumber-js/metadata.min.json');

function getPhoneLengths(countryIso2) {
  const countryMetadata = metadata.countries[countryIso2];
  if (!countryMetadata) return null;
  
  const lengths = countryMetadata[3];
  if (!lengths) return null;
  
  return {
    min: Math.min(...lengths),
    max: Math.max(...lengths)
  };
}

console.log('AX:', getPhoneLengths('AX'));
console.log('GB:', getPhoneLengths('GB'));
console.log('US:', getPhoneLengths('US'));
