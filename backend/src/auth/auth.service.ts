import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { UnidadeService } from '../unidades/unidade.service';
import { UsuarioService } from '../usuarios/usuario.service';
import { PERFIL_LABELS, PerfilUsuario } from '../usuarios/entities/usuario.entity';

const SALT_ROUNDS = 10;
const ADMIN_USER = 'adm';
const ADMIN_PASS = 'adm';
const ADMIN_TOKEN = 'cflow-token-adm';
const UNIDADE_TOKEN_PREFIX = 'cflow-unidade-';
const USUARIO_TOKEN_PREFIX = 'cflow-usuario-';

export interface LoginResponse {
  token: string;
  username: string;
  isAdmin: boolean;
  displayName: string;
  /** Perfil para exibição: Administrador, Morador, Portaria, Zeladoria/Limpeza */
  profile: string;
  requiresPasswordSetup?: boolean;
}

/** Extrai primeiro e último nome de um nome completo */
function firstAndLastName(full: string): string {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 2) return full.trim();
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly unidadeService: UnidadeService,
    private readonly usuarioService: UsuarioService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    if (dto.username === ADMIN_USER && dto.password === ADMIN_PASS) {
      return {
        token: ADMIN_TOKEN,
        username: ADMIN_USER,
        isAdmin: true,
        displayName: 'Administrador',
        profile: 'Administrador',
      };
    }

    const unidade = await this.unidadeService.findByLogin(dto.username);
    if (unidade) {
      const displayName = firstAndLastName(unidade.nomeMoradorResponsavel);
      if (!unidade.senha) {
        return {
          token: `${UNIDADE_TOKEN_PREFIX}${unidade.id}`,
          username: unidade.login,
          isAdmin: false,
          displayName,
          profile: 'Morador',
          requiresPasswordSetup: true,
        };
      }
      const ok = await bcrypt.compare(dto.password, unidade.senha);
      if (!ok) throw new UnauthorizedException('Usuário ou senha inválidos');
      return {
        token: `${UNIDADE_TOKEN_PREFIX}${unidade.id}`,
        username: unidade.login,
        isAdmin: false,
        displayName,
        profile: 'Morador',
      };
    }

    const usuario = await this.usuarioService.findByLogin(dto.username);
    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    const profileLabel = PERFIL_LABELS[usuario.perfil as PerfilUsuario];
    if (!usuario.senha) {
      return {
        token: `${USUARIO_TOKEN_PREFIX}${usuario.id}`,
        username: usuario.login,
        isAdmin: usuario.perfil === 'ADM',
        displayName: usuario.nomeCompleto,
        profile: profileLabel,
        requiresPasswordSetup: true,
      };
    }
    const ok = await bcrypt.compare(dto.password, usuario.senha);
    if (!ok) throw new UnauthorizedException('Usuário ou senha inválidos');
    return {
      token: `${USUARIO_TOKEN_PREFIX}${usuario.id}`,
      username: usuario.login,
      isAdmin: usuario.perfil === 'ADM',
      displayName: usuario.nomeCompleto,
      profile: profileLabel,
    };
  }

  async setPassword(dto: SetPasswordDto): Promise<{ success: boolean }> {
    const token = dto.token || '';
    const hash = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);

    const unidadeMatch = token.match(/^cflow-unidade-(\d+)$/);
    if (unidadeMatch) {
      const id = parseInt(unidadeMatch[1], 10);
      await this.unidadeService.setSenha(id, hash);
      return { success: true };
    }

    const usuarioMatch = token.match(/^cflow-usuario-(\d+)$/);
    if (usuarioMatch) {
      const id = parseInt(usuarioMatch[1], 10);
      await this.usuarioService.setSenha(id, hash);
      return { success: true };
    }

    throw new BadRequestException('Token inválido');
  }

  static isAdminToken(token: string | null): boolean {
    return token === ADMIN_TOKEN;
  }
}
