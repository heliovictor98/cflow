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
exports.UnidadeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unidade_entity_1 = require("./entities/unidade.entity");
let UnidadeService = class UnidadeService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    gerarLogin(bloco, apartamento) {
        const b = String(bloco).trim().replace(/\D/g, '') || bloco;
        const a = String(apartamento).trim();
        return `${b}${a}`;
    }
    async create(dto) {
        const login = this.gerarLogin(dto.bloco, dto.apartamento);
        const exists = await this.repo.findOne({ where: { login } });
        if (exists) {
            throw new common_1.ConflictException(`Já existe unidade com bloco ${dto.bloco} e apartamento ${dto.apartamento} (login ${login}).`);
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
    async findAll() {
        return this.repo.find({
            order: { bloco: 'ASC', apartamento: 'ASC' },
        });
    }
    async findOne(id) {
        const unidade = await this.repo.findOne({ where: { id } });
        if (!unidade)
            throw new common_1.NotFoundException('Unidade não encontrada.');
        return unidade;
    }
    async findByLogin(login) {
        return this.repo.findOne({ where: { login: login.trim() } });
    }
    async update(id, dto) {
        const unidade = await this.findOne(id);
        if (dto.bloco != null)
            unidade.bloco = dto.bloco;
        if (dto.apartamento != null)
            unidade.apartamento = dto.apartamento;
        if (dto.contato !== undefined)
            unidade.contato = dto.contato ?? null;
        if (dto.nomeMoradorResponsavel != null)
            unidade.nomeMoradorResponsavel = dto.nomeMoradorResponsavel;
        if (dto.bloco != null || dto.apartamento != null) {
            unidade.login = this.gerarLogin(unidade.bloco, unidade.apartamento);
        }
        return this.repo.save(unidade);
    }
    async remove(id) {
        const unidade = await this.findOne(id);
        await this.repo.remove(unidade);
    }
    async resetarSenha(id) {
        const unidade = await this.findOne(id);
        unidade.senha = null;
        return this.repo.save(unidade);
    }
    async setSenha(id, senhaHash) {
        const unidade = await this.findOne(id);
        if (unidade.senha) {
            throw new common_1.ConflictException('Senha já definida. Use resetar senha.');
        }
        unidade.senha = senhaHash;
        return this.repo.save(unidade);
    }
};
exports.UnidadeService = UnidadeService;
exports.UnidadeService = UnidadeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unidade_entity_1.Unidade)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UnidadeService);
//# sourceMappingURL=unidade.service.js.map