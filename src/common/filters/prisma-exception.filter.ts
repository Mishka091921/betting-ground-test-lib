import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError, PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { buildResponse } from '../utils/response-builder.util';
import { I18nService } from '../../shared/i18/i18.service';

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError
)
export class PrismaExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(I18nService) private readonly i18n: I18nService
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const lang = (request.headers['lang'] as string) || 'en';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = this.i18n.translate('PRISMA.UNKNOWN', lang, {
      message: exception.message,
    });

    console.log('🔥 PrismaExceptionFilter caught:', exception);

    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2000':
        case 'P2001':
        case 'P2003':
        case 'P2004':
        case 'P2005':
        case 'P2006':
        case 'P2007':
        case 'P2008':
        case 'P2009':
        case 'P2010':
        case 'P2011':
        case 'P2012':
        case 'P2013':
        case 'P2014':
        case 'P2015':
        case 'P2016':
        case 'P2017':
        case 'P2018':
        case 'P2019':
        case 'P2020':
        case 'P2021':
        case 'P2022':
        case 'P2023':
        case 'P2024':
        case 'P2025':
          message = this.i18n.translate(`PRISMA.${exception.code}`, lang);
          break;

        case 'P2002': {
          const target = Array.isArray(exception.meta?.target)
            ? exception.meta.target.join(', ')
            : exception.meta?.target;
          message = this.i18n.translate(`PRISMA.P2002`, lang, {
            target: target || 'Field',
          });
          break;
        }

        default:
          message = this.i18n.translate('PRISMA.UNKNOWN', lang, {
            message: exception.message,
          });
      }

      const badRequestCodes = [
        'P2000', 'P2002', 'P2003', 'P2004', 'P2005',
        'P2006', 'P2007', 'P2011', 'P2012', 'P2013',
        'P2014', 'P2017', 'P2019', 'P2020'
      ];
      const notFoundCodes = ['P2001', 'P2015', 'P2016', 'P2025'];

      if (badRequestCodes.includes(exception.code)) {
        status = HttpStatus.BAD_REQUEST;
      } else if (notFoundCodes.includes(exception.code)) {
        status = HttpStatus.NOT_FOUND;
      } else if (exception.code === 'P2024') {
        status = HttpStatus.REQUEST_TIMEOUT;
      }
    }

    else if (exception instanceof PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = this.i18n.translate('PRISMA.VALIDATION', lang, {
        message: exception.message,
      });
    }

    else if (exception instanceof PrismaClientUnknownRequestError) {
      message = this.i18n.translate('PRISMA.UNKNOWN', lang, {
        message: exception.message,
      });
    }

    else if (exception instanceof PrismaClientInitializationError) {
      message = this.i18n.translate('PRISMA.INIT', lang, {
        message: exception.message,
      });
    }

    response.status(status).json(buildResponse(0, message, []));
  }
}
