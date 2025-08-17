import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient as LogsPrismaClient } from "@prisma/client";
import { BasePrismaService } from "../baes-service/base-prisma.service";

@Injectable()
export class PrismaWriteLogsService extends BasePrismaService {
  constructor() {
    super(process.env.SQL_WRITE_LOGS_CONNECTION || '');
  }

}
