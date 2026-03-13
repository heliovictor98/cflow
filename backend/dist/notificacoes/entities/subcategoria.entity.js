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
exports.Subcategoria = void 0;
const typeorm_1 = require("typeorm");
const categoria_entity_1 = require("./categoria.entity");
let Subcategoria = class Subcategoria {
    id;
    categoriaId;
    nome;
    icone;
    ordem;
    createdAt;
    updatedAt;
    categoria;
};
exports.Subcategoria = Subcategoria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subcategoria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'categoria_id' }),
    __metadata("design:type", Number)
], Subcategoria.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Subcategoria.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 80 }),
    __metadata("design:type", String)
], Subcategoria.prototype, "icone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ordem', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Subcategoria.prototype, "ordem", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Subcategoria.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Subcategoria.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria, (c) => c.subcategorias, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Subcategoria.prototype, "categoria", void 0);
exports.Subcategoria = Subcategoria = __decorate([
    (0, typeorm_1.Entity)('tb_subcategoria')
], Subcategoria);
//# sourceMappingURL=subcategoria.entity.js.map