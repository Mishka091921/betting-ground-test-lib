import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
//import { PrismaClient } from "@prisma/client";
import { BasePrismaService } from "../baes-service/base-prisma.service";

@Injectable()
export class PrismaWriteService extends BasePrismaService {
  [x: string]: any;
  constructor() {
    super(process.env.SQL_WRITE_CONNECTION || '');
  }
}
