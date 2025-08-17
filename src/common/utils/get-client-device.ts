import requestIp from 'request-ip';
import useragent from 'express-useragent';
import { Request } from 'express';

export interface RequestClientInfo {
  deviceType: 'Mobile' | 'Tablet' | 'Desktop' | 'Unknown';
  browser: string;
  os: string;
  userAgent: string;
}

export function extractClientDeviceInfo(req: Request): RequestClientInfo {
  const userAgentString = req.headers['user-agent'] || '';
  const ua = useragent(req);

  const deviceType = ua.isMobile
    ? 'Mobile'
    : ua.isTablet
    ? 'Tablet'
    : ua.isDesktop
    ? 'Desktop'
    : 'Unknown';

  return {
    deviceType,
    browser: ua.browser || 'Unknown',
    os: ua.os || 'Unknown',
    userAgent: userAgentString,
  };
}
