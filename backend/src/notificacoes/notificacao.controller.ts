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
