// src/common/utils/link-sanitizer.ts
export function sanitizeLink(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Only allow HTTP/HTTPS
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    
    // Optional: strip tracking params
    parsed.searchParams.delete('utm_source');
    parsed.searchParams.delete('utm_medium');
    parsed.searchParams.delete('utm_campaign');

    return parsed.toString();
  } catch {
    return null; // invalid URL
  }
}
