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
exports.NotificacaoHistorico = void 0;
const typeorm_1 = require("typeorm");
const notificacao_entity_1 = require("./notificacao.entity");
const unidade_entity_1 = require("../../unidades/entities/unidade.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
let NotificacaoHistorico = class NotificacaoHistorico {
    id;
    notificacaoId;
    tipo;
    autorUnidadeId;
    autorUsuarioId;
    texto;
    createdAt;
    notificacao;
    autorUnidade;
    autorUsuario;
};
exports.NotificacaoHistorico = NotificacaoHistorico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificacaoHistorico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notificacao_id' }),
    __metadata("design:type", Number)
], NotificacaoHistorico.prototype, "notificacaoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], NotificacaoHistorico.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'autor_unidade_id', nullable: true }),
    __metadata("design:type", Object)
], NotificacaoHistorico.prototype, "autorUnidadeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'autor_usuario_id', nullable: true }),
    __metadata("design:type", Object)
], NotificacaoHistorico.prototype, "autorUsuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], NotificacaoHistorico.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], NotificacaoHistorico.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notificacao_entity_1.Notificacao, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'notificacao_id' }),
    __metadata("design:type", notificacao_entity_1.Notificacao)
], NotificacaoHistorico.prototype, "notificacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unidade_entity_1.Unidade, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'autor_unidade_id' }),
    __metadata("design:type", Object)
], NotificacaoHistorico.prototype, "autorUnidade", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'autor_usuario_id' }),
    __metadata("design:type", Object)
], NotificacaoHistorico.prototype, "autorUsuario", void 0);
exports.NotificacaoHistorico = NotificacaoHistorico = __decorate([
    (0, typeorm_1.Entity)('tb_notificacao_historico')
], NotificacaoHistorico);
//# sourceMappingURL=notificacao-historico.entity.js.map