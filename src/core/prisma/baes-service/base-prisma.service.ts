// prisma/base-prisma.service.ts
import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class BasePrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(databaseUrl: string) {
    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log(`[${this.constructor.name}] Connected to database`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(`[${this.constructor.name}] Disconnected from database`);
  }
}
