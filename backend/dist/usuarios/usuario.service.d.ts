import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuarioService {
    private readonly repo;
    constructor(repo: Repository<Usuario>);
    create(dto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    findByLogin(login: string): Promise<Usuario | null>;
    update(id: number, dto: UpdateUsuarioDto): Promise<Usuario>;
    remove(id: number): Promise<void>;
    resetarSenha(id: number): Promise<Usuario>;
    setSenha(id: number, senhaHash: string): Promise<Usuario>;
}
