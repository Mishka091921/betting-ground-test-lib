// src/common/exceptions/base.error.ts
export class BaseError extends Error {
  constructor(public message: string, public status: number = 500) {
    super(message);
  }
}
