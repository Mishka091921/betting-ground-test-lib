import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (isPublic && !token) {
      // Public route & no token → Skip auth
      return true;
    }

    // Otherwise, let Passport handle JWT validation (will decode if token exists)
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (err || !user) {
      if (isPublic) {
        // Public route → allow request even without user
        return null;
      } else {
        // Protected route → block access if no valid user
        throw err || new UnauthorizedException();
      }
    }
    return user;
  }
}
