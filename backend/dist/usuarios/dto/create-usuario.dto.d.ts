import { PerfilUsuario } from '../entities/usuario.entity';
export declare class CreateUsuarioDto {
    nomeCompleto: string;
    contato?: string;
    perfil: PerfilUsuario;
    login: string;
}
