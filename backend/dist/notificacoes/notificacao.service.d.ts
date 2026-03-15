import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { Subcategoria } from './entities/subcategoria.entity';
import { Notificacao } from './entities/notificacao.entity';
import { NotificacaoHistorico } from './entities/notificacao-historico.entity';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
export declare class NotificacaoService {
    private readonly categoriaRepo;
    private readonly subcategoriaRepo;
    private readonly notificacaoRepo;
    private readonly historicoRepo;
    constructor(categoriaRepo: Repository<Categoria>, subcategoriaRepo: Repository<Subcategoria>, notificacaoRepo: Repository<Notificacao>, historicoRepo: Repository<NotificacaoHistorico>);
    findAllCategorias(): Promise<Categoria[]>;
    findSubcategoriasByCategoriaId(categoriaId: number): Promise<Subcategoria[]>;
    findCategoriaById(id: number): Promise<Categoria>;
    findSubcategoriaById(id: number): Promise<Subcategoria>;
    private gerarNumeroProtocolo;
    create(dto: CreateNotificacaoDto, unidadeId: number): Promise<Notificacao>;
    findOne(id: number): Promise<Notificacao>;
    listHistorico(notificacaoId: number): Promise<NotificacaoHistorico[]>;
    addComentario(notificacaoId: number, texto: string, usuarioId: number | null): Promise<NotificacaoHistorico>;
    encerrar(notificacaoId: number, texto: string | undefined, usuarioId: number | null): Promise<Notificacao>;
    findAllByUnidade(unidadeId: number): Promise<Notificacao[]>;
    findAll(): Promise<Notificacao[]>;
}
