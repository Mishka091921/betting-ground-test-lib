# @bet-ground/prisma-library

A reusable Prisma library for bet-ground applications.

## Installation

```bash
npm install @bet-ground/prisma-library
```

## Usage

### Import the module in your NestJS application

```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from '@bet-ground/prisma-library';

@Module({
  imports: [PrismaModule],
  // ... other module configuration
})
export class AppModule {}
```

### Use individual services

```typescript
import { Injectable } from '@nestjs/common';
import { 
  PrismaReadService, 
  PrismaWriteService,
  PrismaReadLogsService,
  PrismaWriteLogsService,
  PrismaReadStatsService,
  PrismaWriteStatsService 
} from '@bet-ground/prisma-library';

@Injectable()
export class MyService {
  constructor(
    private readonly prismaRead: PrismaReadService,
    private readonly prismaWrite: PrismaWriteService,
  ) {}

  async getData() {
    return await this.prismaRead.user.findMany();
  }

  async createData(data: any) {
    return await this.prismaWrite.user.create({ data });
  }
}
```

## Environment Variables

Make sure to set the following environment variables:

- `SQL_READ_CONNECTION` - Main database read connection
- `SQL_WRITE_CONNECTION` - Main database write connection
- `SQL_READ_LOGS_CONNECTION` - Logs database read connection
- `SQL_WRITE_LOGS_CONNECTION` - Logs database write connection
- `SQL_READ_STATS_CONNECTION` - Statistics database read connection
- `SQL_WRITE_STATS_CONNECTION` - Statistics database write connection

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run dev

# Prisma operations
npm run prisma:pull      # Pull all database schemas
npm run prisma:generate  # Generate all Prisma clients
npm run prisma:main:pull # Pull main database schema only
npm run prisma:logs:pull # Pull logs database schema only
npm run prisma:stats:pull # Pull statistics database schema only
```

## Prisma Schemas

This library includes three separate Prisma schemas:

- **Main Database** (`prisma/main/schema.prisma`) - Core application data
- **Logs Database** (`prisma/logs_db/schema.prisma`) - Application logs and audit data
- **Statistics Database** (`prisma/statistics/schema.prisma`) - Analytics and statistics data

Each schema generates its own Prisma client with separate connections.
