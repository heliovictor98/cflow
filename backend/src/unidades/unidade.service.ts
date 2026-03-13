import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unidade } from './entities/unidade.entity';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';

@Injectable()
export class UnidadeService {
  constructor(
    @InjectRepository(Unidade)
    private readonly repo: Repository<Unidade>,
  ) {}

  /** Gera o login padrão: bloco + apartamento (ex: bl 2 ap 802 → 2802) */
  private gerarLogin(bloco: string, apartamento: string): string {
    const b = String(bloco).trim().replace(/\D/g, '') || bloco;
    const a = String(apartamento).trim();
    return `${b}${a}`;
  }

  async create(dto: CreateUnidadeDto): Promise<Unidade> {
    const login = this.gerarLogin(dto.bloco, dto.apartamento);
    const exists = await this.repo.findOne({ where: { login } });
    if (exists) {
      throw new ConflictException(
        `Já existe unidade com bloco ${dto.bloco} e apartamento ${dto.apartamento} (login ${login}).`,
      );
    }
    const unidade = this.repo.create({
      bloco: dto.bloco,
      apartamento: dto.apartamento,
      contato: dto.contato ?? null,
      nomeMoradorResponsavel: dto.nomeMoradorResponsavel,
      login,
      senha: null,
    });
    return this.repo.save(unidade);
  }

  async findAll(): Promise<Unidade[]> {
    return this.repo.find({
      order: { bloco: 'ASC', apartamento: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Unidade> {
    const unidade = await this.repo.findOne({ where: { id } });
    if (!unidade) throw new NotFoundException('Unidade não encontrada.');
    return unidade;
  }

  async findByLogin(login: string): Promise<Unidade | null> {
    return this.repo.findOne({ where: { login: login.trim() } });
  }

  async update(id: number, dto: UpdateUnidadeDto): Promise<Unidade> {
    const unidade = await this.findOne(id);
    if (dto.bloco != null) unidade.bloco = dto.bloco;
    if (dto.apartamento != null) unidade.apartamento = dto.apartamento;
    if (dto.contato !== undefined) unidade.contato = dto.contato ?? null;
    if (dto.nomeMoradorResponsavel != null)
      unidade.nomeMoradorResponsavel = dto.nomeMoradorResponsavel;
    if (dto.bloco != null || dto.apartamento != null) {
      unidade.login = this.gerarLogin(unidade.bloco, unidade.apartamento);
    }
    return this.repo.save(unidade);
  }

  async remove(id: number): Promise<void> {
    const unidade = await this.findOne(id);
    await this.repo.remove(unidade);
  }

  async resetarSenha(id: number): Promise<Unidade> {
    const unidade = await this.findOne(id);
    unidade.senha = null;
    return this.repo.save(unidade);
  }

  /** Define a senha (hash) da unidade. Só permite se senha for null. */
  async setSenha(id: number, senhaHash: string): Promise<Unidade> {
    const unidade = await this.findOne(id);
    if (unidade.senha) {
      throw new ConflictException('Senha já definida. Use resetar senha.');
    }
    unidade.senha = senhaHash;
    return this.repo.save(unidade);
  }
}
