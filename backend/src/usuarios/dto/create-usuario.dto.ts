import { PerfilUsuario } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  nomeCompleto!: string;
  contato?: string;
  perfil!: PerfilUsuario;
  login!: string;
}
