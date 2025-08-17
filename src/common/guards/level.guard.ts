// lib/guards/level.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LEVEL_KEY } from '../decorators/level.decorator';

@Injectable()
export class LevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredLevel = this.reflector.getAllAndOverride<number>(
      LEVEL_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredLevel === undefined) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user?.level >= requiredLevel;
  }
}
