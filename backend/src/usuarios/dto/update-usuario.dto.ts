import { PerfilUsuario } from '../entities/usuario.entity';

export class UpdateUsuarioDto {
  nomeCompleto?: string;
  contato?: string;
  perfil?: PerfilUsuario;
  login?: string;
}
