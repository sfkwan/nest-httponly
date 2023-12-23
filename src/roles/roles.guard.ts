import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../auth/meta/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly logger: Logger, // instantiate logger
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    this.logger.debug(`current handler need role: ${roles}`);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user;

    this.logger.debug(`User roles: ${user.roles}`);
    return matchRoles(roles, user.roles);
  }
}
function matchRoles(roles: string[], userRoles: string[]): boolean {
  return roles.every((role) => userRoles.includes(role));
}
