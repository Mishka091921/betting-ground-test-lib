// common/utils/get-client-ip.ts
import requestIp from 'request-ip'; 

export function getClientIp(req: Request): string {
  const ip = requestIp(req);
  return ip || 'unknown';
}
