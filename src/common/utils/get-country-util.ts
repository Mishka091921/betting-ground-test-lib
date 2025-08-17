// src/common/utils/get-country-from-ip.ts
import axios from 'axios';

export async function getCountryFromIP(ip: string): Promise<string> {
  try {
    if (ip === '127.0.0.1' || ip === '::1') return 'Localhost';

    // Try ipwho.is first (unlimited and fast)
    const res = await axios.get(`https://ipwho.is/${ip}`);
    if (res.data && res.data.success && res.data.country) {
      return res.data.country;
    }

    // Fallback: ipapi.co
    const fallback = await axios.get(`https://ipapi.co/${ip}/json/`);
    return fallback.data.country_name || 'Unknown';
  } catch (error) {
    console.error(`Error fetching country for IP (${ip}):`, (error as any).message);
    return 'Unknown';
  }
}
