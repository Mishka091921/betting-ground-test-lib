// lib/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { MemberAccountType } from '../enums/account-type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: MemberAccountType[]) => SetMetadata(ROLES_KEY, roles);
