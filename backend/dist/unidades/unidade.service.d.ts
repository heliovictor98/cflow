import { Repository } from 'typeorm';
import { Unidade } from './entities/unidade.entity';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
export declare class UnidadeService {
    private readonly repo;
    constructor(repo: Repository<Unidade>);
    private gerarLogin;
    create(dto: CreateUnidadeDto): Promise<Unidade>;
    findAll(): Promise<Unidade[]>;
    findOne(id: number): Promise<Unidade>;
    findByLogin(login: string): Promise<Unidade | null>;
    update(id: number, dto: UpdateUnidadeDto): Promise<Unidade>;
    remove(id: number): Promise<void>;
    resetarSenha(id: number): Promise<Unidade>;
    setSenha(id: number, senhaHash: string): Promise<Unidade>;
}
