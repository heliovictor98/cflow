import { LoginDto } from './dto/login.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { UnidadeService } from '../unidades/unidade.service';
import { UsuarioService } from '../usuarios/usuario.service';
export interface LoginResponse {
    token: string;
    username: string;
    isAdmin: boolean;
    displayName: string;
    profile: string;
    requiresPasswordSetup?: boolean;
}
export declare class AuthService {
    private readonly unidadeService;
    private readonly usuarioService;
    constructor(unidadeService: UnidadeService, usuarioService: UsuarioService);
    login(dto: LoginDto): Promise<LoginResponse>;
    setPassword(dto: SetPasswordDto): Promise<{
        success: boolean;
    }>;
    static isAdminToken(token: string | null): boolean;
}
