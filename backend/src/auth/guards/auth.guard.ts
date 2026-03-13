import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

const ADMIN_TOKEN = 'cflow-token-adm';
const UNIDADE_TOKEN_PREFIX = 'cflow-unidade-';
const USUARIO_TOKEN_PREFIX = 'cflow-usuario-';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const auth = request.headers.authorization;
    const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

    if (!token) throw new UnauthorizedException('Token não informado.');

    if (token === ADMIN_TOKEN) return true;
    if (token.startsWith(UNIDADE_TOKEN_PREFIX) && /^\d+$/.test(token.slice(UNIDADE_TOKEN_PREFIX.length)))
      return true;
    if (token.startsWith(USUARIO_TOKEN_PREFIX) && /^\d+$/.test(token.slice(USUARIO_TOKEN_PREFIX.length)))
      return true;

    throw new UnauthorizedException('Token inválido.');
  }
}
