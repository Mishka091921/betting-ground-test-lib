declare module 'express-useragent' {
  interface UserAgent {
    isBot: boolean;
    isMobile: boolean;
    isDesktop: boolean;
    isTablet: boolean;
    browser: string;
    version: string;
    os: string;
    platform: string;
    source: string;
  }

  function useragent(req: any): UserAgent;
  export default useragent;
}
