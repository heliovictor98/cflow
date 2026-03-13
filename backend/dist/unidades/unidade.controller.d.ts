import { UnidadeService } from './unidade.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
export declare class UnidadeController {
    private readonly unidadeService;
    constructor(unidadeService: UnidadeService);
    create(dto: CreateUnidadeDto): Promise<import("./entities/unidade.entity").Unidade>;
    findAll(): Promise<import("./entities/unidade.entity").Unidade[]>;
    findOne(id: number): Promise<import("./entities/unidade.entity").Unidade>;
    update(id: number, dto: UpdateUnidadeDto): Promise<import("./entities/unidade.entity").Unidade>;
    remove(id: number): Promise<void>;
    resetarSenha(id: number): Promise<import("./entities/unidade.entity").Unidade>;
}
