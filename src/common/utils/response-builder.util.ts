export function buildResponse<T>(result: number, message: string, data: T): {
  result: number;
  message: string;
  data: T;
} {
  return {
    result,
    message,
    data,
  };
}
