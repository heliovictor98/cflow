import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { Subcategoria } from './entities/subcategoria.entity';
import { Notificacao, DadosComplementares } from './entities/notificacao.entity';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';

@Injectable()
export class NotificacaoService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
    @InjectRepository(Subcategoria)
    private readonly subcategoriaRepo: Repository<Subcategoria>,
    @InjectRepository(Notificacao)
    private readonly notificacaoRepo: Repository<Notificacao>,
  ) {}

  async findAllCategorias(): Promise<Categoria[]> {
    return this.categoriaRepo.find({
      order: { ordem: 'ASC', id: 'ASC' },
    });
  }

  async findSubcategoriasByCategoriaId(categoriaId: number): Promise<Subcategoria[]> {
    return this.subcategoriaRepo.find({
      where: { categoriaId },
      order: { ordem: 'ASC', id: 'ASC' },
    });
  }

  async findCategoriaById(id: number): Promise<Categoria> {
    const cat = await this.categoriaRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Categoria não encontrada.');
    return cat;
  }

  async findSubcategoriaById(id: number): Promise<Subcategoria> {
    const sub = await this.subcategoriaRepo.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!sub) throw new NotFoundException('Subcategoria não encontrada.');
    return sub;
  }

  /** Gera número de protocolo: NOT-YYYYMMDD-NNN */
  private async gerarNumeroProtocolo(): Promise<string> {
    const hoje = new Date();
    const prefix = `NOT-${hoje.getFullYear()}${String(hoje.getMonth() + 1).padStart(2, '0')}${String(hoje.getDate()).padStart(2, '0')}`;
    const qb = this.notificacaoRepo
      .createQueryBuilder('n')
      .where('n.numeroProtocolo LIKE :prefix', { prefix: `${prefix}%` });
    const count = await qb.getCount();
    const seq = String(count + 1).padStart(3, '0');
    return `${prefix}-${seq}`;
  }

  async create(dto: CreateNotificacaoDto, unidadeId: number): Promise<Notificacao> {
    const subcategoria = await this.findSubcategoriaById(dto.subcategoriaId);
    const numeroProtocolo = await this.gerarNumeroProtocolo();
    const notificacao = this.notificacaoRepo.create({
      numeroProtocolo,
      unidadeId,
      subcategoriaId: dto.subcategoriaId,
      status: 'ABERTO',
      dadosComplementares: (dto.dadosComplementares ?? null) as DadosComplementares | null,
    });
    return this.notificacaoRepo.save(notificacao);
  }

  /** Lista chamados do morador (por unidade) */
  async findAllByUnidade(unidadeId: number): Promise<Notificacao[]> {
    return this.notificacaoRepo.find({
      where: { unidadeId },
      relations: ['subcategoria', 'subcategoria.categoria'],
      order: { createdAt: 'DESC' },
    });
  }

  /** Lista todos os chamados (para admin) */
  async findAll(): Promise<Notificacao[]> {
    return this.notificacaoRepo.find({
      relations: ['subcategoria', 'subcategoria.categoria', 'unidade'],
      order: { createdAt: 'DESC' },
    });
  }
}
