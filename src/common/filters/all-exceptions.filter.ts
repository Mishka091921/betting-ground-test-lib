// src/common/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from '../../shared/i18/i18.service';
import { BaseError } from '../exceptions/base.error';
import { buildResponse } from '../utils/response-builder.util';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const contextType = host.getType();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messageKey = 'UNEXPECTED_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      messageKey =
        typeof res === 'string'
          ? res
          : (res as any).message || (res as any).error || 'UNEXPECTED_ERROR';
    } else if (exception instanceof BaseError) {
      status = exception.status;
      messageKey = exception.message;
    } else if (typeof exception === 'object' && exception.message) {
      messageKey = exception.message;
    }

    // Handle HTTP errors
    if (contextType === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      const lang = (request.headers['lang'] as string)?.toLowerCase() || 'en';
      const translated = this.i18n.translate(messageKey, lang);

      response.status(status).json(buildResponse(0, translated, []));
      return;
    }

    // Handle NON-HTTP errors (WebSocket, Cron, Queue, etc.)
    console.error(`Non-HTTP Exception caught:`, {
      message: messageKey,
      stack: exception?.stack,
    });
  }
}
