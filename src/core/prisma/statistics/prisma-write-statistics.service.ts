import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient as StatsPrismaClient } from "@prisma/client";
import { BasePrismaService } from "../baes-service/base-prisma.service";

@Injectable()
export class PrismaWriteStatsService extends BasePrismaService {
  constructor() {
    super(process.env.SQL_WRITE_STATS_CONNECTION || '');
  }
}
