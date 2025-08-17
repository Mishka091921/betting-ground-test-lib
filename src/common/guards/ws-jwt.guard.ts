// src/modules/socket/guards/ws-jwt.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake.auth?.token;

    try {
      const payload = this.jwtService.verify(token);
      client.user = payload;
      return true;
    } catch (err) {
      throw new WsException('Invalid token');
    }
  }
}
