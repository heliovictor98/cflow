import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { Subcategoria } from './entities/subcategoria.entity';
import { Notificacao } from './entities/notificacao.entity';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
export declare class NotificacaoService {
    private readonly categoriaRepo;
    private readonly subcategoriaRepo;
    private readonly notificacaoRepo;
    constructor(categoriaRepo: Repository<Categoria>, subcategoriaRepo: Repository<Subcategoria>, notificacaoRepo: Repository<Notificacao>);
    findAllCategorias(): Promise<Categoria[]>;
    findSubcategoriasByCategoriaId(categoriaId: number): Promise<Subcategoria[]>;
    findCategoriaById(id: number): Promise<Categoria>;
    findSubcategoriaById(id: number): Promise<Subcategoria>;
    private gerarNumeroProtocolo;
    create(dto: CreateNotificacaoDto, unidadeId: number): Promise<Notificacao>;
}
