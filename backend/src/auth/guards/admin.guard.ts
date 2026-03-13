import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsuarioService } from '../../usuarios/usuario.service';

const ADMIN_TOKEN = 'cflow-token-adm';
const USUARIO_TOKEN_PREFIX = 'cflow-usuario-';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly usuarioService: UsuarioService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const auth = request.headers.authorization;
    const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;

    if (token === ADMIN_TOKEN) return true;

    const match = token?.match(/^cflow-usuario-(\d+)$/);
    if (match) {
      const id = parseInt(match[1], 10);
      try {
        const usuario = await this.usuarioService.findOne(id);
        if (usuario.perfil === 'ADM') return true;
      } catch {
        // usuário não encontrado
      }
    }

    throw new UnauthorizedException('Acesso restrito ao administrador.');
  }
}
