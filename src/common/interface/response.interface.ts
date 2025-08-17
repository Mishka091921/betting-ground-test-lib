export interface BaseResponse<T> {
  result: number;
  message: string;
  data: T;
}
