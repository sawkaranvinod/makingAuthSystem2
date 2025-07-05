import maxmind from "maxmind";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust the path to the mmdb file relative to this helper file
const dbPath = path.resolve(__dirname, "../../mmdb/GeoLite2-City.mmdb");

let lookup;

/**
 * Looks up the geo location for a given IP address.
 * @param {string} ip - The IP address to lookup.
 * @returns {Promise<{country: string|null, state: string|null, city: string|null}|null>}
 */
export async function getAddressFromIp(ip) {
  try {
    if (!lookup) {
      lookup = await maxmind.open(dbPath);
    }
    const location = lookup.get(ip);

    if (!location) return null;

    return {
      country: location.country?.names?.en || null,
      state: location.subdivisions?.[0]?.names?.en || null,
      city: location.city?.names?.en || null,
    };
  } catch (error) {
    console.log("Error in getAddressFromIp:", error.message);
    return null;
  }
}
