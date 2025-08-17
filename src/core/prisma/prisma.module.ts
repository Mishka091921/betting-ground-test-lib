import { Global, Module } from "@nestjs/common";
import { PrismaReadService } from "./main/prisma-read-main.service";
import { PrismaWriteService } from "./main/prisma-write-main.service";
import { PrismaReadLogsService } from "./logs_db/prisma-read-logs.service";
import { PrismaWriteLogsService } from "./logs_db/prisma-write-logs.service";
import { PrismaReadStatsService } from "./statistics/prisma-read-statistics.service";
import { PrismaWriteStatsService } from "./statistics/prisma-write-statistics.service";


@Global()
@Module({
  providers: [
    PrismaReadService,
    PrismaWriteService,
    PrismaReadLogsService,
    PrismaWriteLogsService,
    PrismaReadStatsService,
    PrismaWriteStatsService
    
  ],
  exports: [
    PrismaReadService, 
    PrismaWriteService,
    PrismaReadLogsService,
    PrismaWriteLogsService,
    PrismaReadStatsService,
    PrismaWriteStatsService
  ],
})
export class PrismaModule {}
