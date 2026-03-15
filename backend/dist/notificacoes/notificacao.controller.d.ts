import type { Request } from 'express';
import { NotificacaoService } from './notificacao.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UsuarioService } from '../usuarios/usuario.service';
export declare class NotificacaoController {
    private readonly notificacaoService;
    private readonly usuarioService;
    constructor(notificacaoService: NotificacaoService, usuarioService: UsuarioService);
    private isAdmin;
    listChamados(req: Request): Promise<import("./entities/notificacao.entity").Notificacao[]>;
    listCategorias(): Promise<import("./entities/categoria.entity").Categoria[]>;
    getCategoria(id: number): Promise<import("./entities/categoria.entity").Categoria>;
    listSubcategorias(id: number): Promise<import("./entities/subcategoria.entity").Subcategoria[]>;
    getSubcategoria(id: number): Promise<import("./entities/subcategoria.entity").Subcategoria>;
    create(dto: CreateNotificacaoDto, req: Request): Promise<import("./entities/notificacao.entity").Notificacao>;
}
