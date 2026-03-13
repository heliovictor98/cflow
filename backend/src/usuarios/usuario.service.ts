import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const exists = await this.repo.findOne({ where: { login: dto.login.trim() } });
    if (exists) {
      throw new ConflictException(`Já existe usuário com o login "${dto.login}".`);
    }
    const usuario = this.repo.create({
      nomeCompleto: dto.nomeCompleto,
      contato: dto.contato ?? null,
      perfil: dto.perfil,
      login: dto.login.trim(),
      senha: null,
    });
    return this.repo.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.repo.find({
      order: { nomeCompleto: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.repo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado.');
    return usuario;
  }

  async findByLogin(login: string): Promise<Usuario | null> {
    return this.repo.findOne({ where: { login: login.trim() } });
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    if (dto.nomeCompleto != null) usuario.nomeCompleto = dto.nomeCompleto;
    if (dto.contato !== undefined) usuario.contato = dto.contato ?? null;
    if (dto.perfil != null) usuario.perfil = dto.perfil;
    if (dto.login != null) {
      const exists = await this.repo.findOne({ where: { login: dto.login.trim() } });
      if (exists && exists.id !== id) {
        throw new ConflictException(`Já existe usuário com o login "${dto.login}".`);
      }
      usuario.login = dto.login.trim();
    }
    return this.repo.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.repo.remove(usuario);
  }

  async resetarSenha(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.senha = null;
    return this.repo.save(usuario);
  }

  async setSenha(id: number, senhaHash: string): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.senha = senhaHash;
    return this.repo.save(usuario);
  }
}
