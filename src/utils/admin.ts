import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export function isAdmin(user: User) {
  if (!user.isAdmin) {
    throw new UnauthorizedException('Acesso autorizado apenas para administradores');
  }
}
