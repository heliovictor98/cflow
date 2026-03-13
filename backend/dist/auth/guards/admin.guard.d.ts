import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsuarioService } from '../../usuarios/usuario.service';
export declare class AdminGuard implements CanActivate {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
