import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient as StatsPrismaClient } from "@prisma/client";
import { BasePrismaService } from "../baes-service/base-prisma.service";

@Injectable()
export class PrismaReadStatsService extends BasePrismaService {
  constructor() {
    super(process.env.SQL_READ_STATS_CONNECTION || '');
  }
}
