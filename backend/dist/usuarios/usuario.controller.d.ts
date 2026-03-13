import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    create(dto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    findAll(): Promise<import("./entities/usuario.entity").Usuario[]>;
    findOne(id: number): Promise<import("./entities/usuario.entity").Usuario>;
    update(id: number, dto: UpdateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    remove(id: number): Promise<void>;
    resetarSenha(id: number): Promise<import("./entities/usuario.entity").Usuario>;
}
