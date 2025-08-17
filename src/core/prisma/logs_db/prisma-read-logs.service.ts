import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient as LogsPrismaClient } from "@prisma/client";
import { BasePrismaService } from "../baes-service/base-prisma.service";

@Injectable()
export class PrismaReadLogsService extends BasePrismaService {
  constructor() {
    super(process.env.SQL_READ_LOGS_CONNECTION || '');
  }
}
