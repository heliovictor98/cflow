import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { NotificacaoService } from './notificacao.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { ComentarioDto } from './dto/comentario.dto';
import { EncerrarDto } from './dto/encerrar.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UsuarioService } from '../usuarios/usuario.service';

const UNIDADE_TOKEN_PREFIX = 'cflow-unidade-';
const ADMIN_TOKEN = 'cflow-token-adm';
const USUARIO_TOKEN_PREFIX = 'cflow-usuario-';

function getUnidadeIdFromRequest(req: Request): number | null {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  const match = token?.match(new RegExp(`^${UNIDADE_TOKEN_PREFIX}(\\d+)$`));
  if (!match) return null;
  return parseInt(match[1], 10);
}

function getUsuarioIdFromRequest(req: Request): number | null {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  const match = token?.match(new RegExp(`^${USUARIO_TOKEN_PREFIX}(\\d+)$`));
  if (!match) return null;
  return parseInt(match[1], 10);
}

@Controller('notificacoes')
@UseGuards(AuthGuard)
export class NotificacaoController {
  constructor(
    private readonly notificacaoService: NotificacaoService,
    private readonly usuarioService: UsuarioService,
  ) {}

  private async isAdmin(req: Request): Promise<boolean> {
    const auth = req.headers.authorization;
    const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
    if (token === ADMIN_TOKEN) return true;
    const match = token?.match(new RegExp(`^${USUARIO_TOKEN_PREFIX}(\\d+)$`));
    if (match) {
      try {
        const usuario = await this.usuarioService.findOne(parseInt(match[1], 10));
        return usuario.perfil === 'ADM';
      } catch {
        // ignore
      }
    }
    return false;
  }

  /** Morador: seus chamados. Admin: todos. Deve vir antes de rotas com :id para não ser confundido. */
  @Get('chamados')
  async listChamados(@Req() req: Request) {
    const unidadeId = getUnidadeIdFromRequest(req);
    if (unidadeId != null) {
      return this.notificacaoService.findAllByUnidade(unidadeId);
    }
    if (await this.isAdmin(req)) {
      return this.notificacaoService.findAll();
    }
    throw new UnauthorizedException('Acesso negado.');
  }

  /** Histórico do chamado (timeline). Morador: só seus chamados; Admin: qualquer um. */
  @Get(':id/historico')
  async getHistorico(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const notificacao = await this.notificacaoService.findOne(id);
    const unidadeId = getUnidadeIdFromRequest(req);
    if (unidadeId != null) {
      if (notificacao.unidadeId !== unidadeId) throw new UnauthorizedException('Acesso negado.');
    } else if (!(await this.isAdmin(req))) {
      throw new UnauthorizedException('Acesso negado.');
    }
    return this.notificacaoService.listHistorico(id);
  }

  /** Admin: adiciona comentário ao chamado. */
  @Post(':id/comentario')
  async addComentario(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ComentarioDto,
    @Req() req: Request,
  ) {
    if (!(await this.isAdmin(req))) throw new UnauthorizedException('Apenas administradores podem comentar.');
    const usuarioId = getUsuarioIdFromRequest(req);
    return this.notificacaoService.addComentario(id, dto.texto, usuarioId);
  }

  /** Admin: encerra o chamado (com comentário opcional). */
  @Post(':id/encerrar')
  async encerrar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EncerrarDto,
    @Req() req: Request,
  ) {
    if (!(await this.isAdmin(req))) throw new UnauthorizedException('Apenas administradores podem encerrar.');
    const usuarioId = getUsuarioIdFromRequest(req);
    return this.notificacaoService.encerrar(id, dto.texto, usuarioId);
  }

  @Get('categorias')
  listCategorias() {
    return this.notificacaoService.findAllCategorias();
  }

  @Get('categorias/:id')
  getCategoria(@Param('id', ParseIntPipe) id: number) {
    return this.notificacaoService.findCategoriaById(id);
  }

  @Get('categorias/:id/subcategorias')
  listSubcategorias(@Param('id', ParseIntPipe) id: number) {
    return this.notificacaoService.findSubcategoriasByCategoriaId(id);
  }

  @Get('subcategorias/:id')
  getSubcategoria(@Param('id', ParseIntPipe) id: number) {
    return this.notificacaoService.findSubcategoriaById(id);
  }

  @Post()
  create(@Body() dto: CreateNotificacaoDto, @Req() req: Request) {
    const unidadeId = getUnidadeIdFromRequest(req);
    if (unidadeId == null) {
      throw new UnauthorizedException('Apenas moradores (unidade) podem abrir notificações.');
    }
    return this.notificacaoService.create(dto, unidadeId);
  }
}
