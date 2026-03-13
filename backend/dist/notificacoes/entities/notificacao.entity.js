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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notificacao = void 0;
const typeorm_1 = require("typeorm");
const unidade_entity_1 = require("../../unidades/entities/unidade.entity");
const subcategoria_entity_1 = require("./subcategoria.entity");
let Notificacao = class Notificacao {
    id;
    numeroProtocolo;
    unidadeId;
    subcategoriaId;
    status;
    dadosComplementares;
    createdAt;
    updatedAt;
    unidade;
    subcategoria;
};
exports.Notificacao = Notificacao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notificacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_protocolo', type: 'varchar', length: 30, unique: true }),
    __metadata("design:type", String)
], Notificacao.prototype, "numeroProtocolo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unidade_id' }),
    __metadata("design:type", Number)
], Notificacao.prototype, "unidadeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subcategoria_id' }),
    __metadata("design:type", Number)
], Notificacao.prototype, "subcategoriaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, default: 'ABERTO' }),
    __metadata("design:type", String)
], Notificacao.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dados_complementares', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Notificacao.prototype, "dadosComplementares", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Notificacao.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Notificacao.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unidade_entity_1.Unidade, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'unidade_id' }),
    __metadata("design:type", unidade_entity_1.Unidade)
], Notificacao.prototype, "unidade", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subcategoria_entity_1.Subcategoria, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'subcategoria_id' }),
    __metadata("design:type", subcategoria_entity_1.Subcategoria)
], Notificacao.prototype, "subcategoria", void 0);
exports.Notificacao = Notificacao = __decorate([
    (0, typeorm_1.Entity)('tb_notificacao')
], Notificacao);
//# sourceMappingURL=notificacao.entity.js.map