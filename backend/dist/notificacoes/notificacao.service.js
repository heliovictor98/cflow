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
exports.NotificacaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const categoria_entity_1 = require("./entities/categoria.entity");
const subcategoria_entity_1 = require("./entities/subcategoria.entity");
const notificacao_entity_1 = require("./entities/notificacao.entity");
let NotificacaoService = class NotificacaoService {
    categoriaRepo;
    subcategoriaRepo;
    notificacaoRepo;
    constructor(categoriaRepo, subcategoriaRepo, notificacaoRepo) {
        this.categoriaRepo = categoriaRepo;
        this.subcategoriaRepo = subcategoriaRepo;
        this.notificacaoRepo = notificacaoRepo;
    }
    async findAllCategorias() {
        return this.categoriaRepo.find({
            order: { ordem: 'ASC', id: 'ASC' },
        });
    }
    async findSubcategoriasByCategoriaId(categoriaId) {
        return this.subcategoriaRepo.find({
            where: { categoriaId },
            order: { ordem: 'ASC', id: 'ASC' },
        });
    }
    async findCategoriaById(id) {
        const cat = await this.categoriaRepo.findOne({ where: { id } });
        if (!cat)
            throw new common_1.NotFoundException('Categoria não encontrada.');
        return cat;
    }
    async findSubcategoriaById(id) {
        const sub = await this.subcategoriaRepo.findOne({
            where: { id },
            relations: ['categoria'],
        });
        if (!sub)
            throw new common_1.NotFoundException('Subcategoria não encontrada.');
        return sub;
    }
    async gerarNumeroProtocolo() {
        const hoje = new Date();
        const prefix = `NOT-${hoje.getFullYear()}${String(hoje.getMonth() + 1).padStart(2, '0')}${String(hoje.getDate()).padStart(2, '0')}`;
        const qb = this.notificacaoRepo
            .createQueryBuilder('n')
            .where('n.numeroProtocolo LIKE :prefix', { prefix: `${prefix}%` });
        const count = await qb.getCount();
        const seq = String(count + 1).padStart(3, '0');
        return `${prefix}-${seq}`;
    }
    async create(dto, unidadeId) {
        const subcategoria = await this.findSubcategoriaById(dto.subcategoriaId);
        const numeroProtocolo = await this.gerarNumeroProtocolo();
        const notificacao = this.notificacaoRepo.create({
            numeroProtocolo,
            unidadeId,
            subcategoriaId: dto.subcategoriaId,
            status: 'ABERTO',
            dadosComplementares: (dto.dadosComplementares ?? null),
        });
        return this.notificacaoRepo.save(notificacao);
    }
    async findAllByUnidade(unidadeId) {
        return this.notificacaoRepo.find({
            where: { unidadeId },
            relations: ['subcategoria', 'subcategoria.categoria'],
            order: { createdAt: 'DESC' },
        });
    }
    async findAll() {
        return this.notificacaoRepo.find({
            relations: ['subcategoria', 'subcategoria.categoria', 'unidade'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.NotificacaoService = NotificacaoService;
exports.NotificacaoService = NotificacaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __param(1, (0, typeorm_1.InjectRepository)(subcategoria_entity_1.Subcategoria)),
    __param(2, (0, typeorm_1.InjectRepository)(notificacao_entity_1.Notificacao)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NotificacaoService);
//# sourceMappingURL=notificacao.service.js.map