"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
let UsuarioService = class UsuarioService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const exists = await this.repo.findOne({ where: { login: dto.login.trim() } });
        if (exists) {
            throw new common_1.ConflictException(`Já existe usuário com o login "${dto.login}".`);
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
    async findAll() {
        return this.repo.find({
            order: { nomeCompleto: 'ASC' },
        });
    }
    async findOne(id) {
        const usuario = await this.repo.findOne({ where: { id } });
        if (!usuario)
            throw new common_1.NotFoundException('Usuário não encontrado.');
        return usuario;
    }
    async findByLogin(login) {
        return this.repo.findOne({ where: { login: login.trim() } });
    }
    async update(id, dto) {
        const usuario = await this.findOne(id);
        if (dto.nomeCompleto != null)
            usuario.nomeCompleto = dto.nomeCompleto;
        if (dto.contato !== undefined)
            usuario.contato = dto.contato ?? null;
        if (dto.perfil != null)
            usuario.perfil = dto.perfil;
        if (dto.login != null) {
            const exists = await this.repo.findOne({ where: { login: dto.login.trim() } });
            if (exists && exists.id !== id) {
                throw new common_1.ConflictException(`Já existe usuário com o login "${dto.login}".`);
            }
            usuario.login = dto.login.trim();
        }
        return this.repo.save(usuario);
    }
    async remove(id) {
        const usuario = await this.findOne(id);
        await this.repo.remove(usuario);
    }
    async resetarSenha(id) {
        const usuario = await this.findOne(id);
        usuario.senha = null;
        return this.repo.save(usuario);
    }
    async setSenha(id, senhaHash) {
        const usuario = await this.findOne(id);
        usuario.senha = senhaHash;
        return this.repo.save(usuario);
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map