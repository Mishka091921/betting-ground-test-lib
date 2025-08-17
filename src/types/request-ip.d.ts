declare module 'request-ip' {
  function getClientIp(req: any): string | null;
  export default getClientIp;
}
