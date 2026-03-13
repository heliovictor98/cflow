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
exports.Categoria = void 0;
const typeorm_1 = require("typeorm");
const subcategoria_entity_1 = require("./subcategoria.entity");
let Categoria = class Categoria {
    id;
    nome;
    descricao;
    icone;
    ordem;
    createdAt;
    updatedAt;
    subcategorias;
};
exports.Categoria = Categoria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Categoria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Categoria.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Categoria.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 80 }),
    __metadata("design:type", String)
], Categoria.prototype, "icone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ordem', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Categoria.prototype, "ordem", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Categoria.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Categoria.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subcategoria_entity_1.Subcategoria, (s) => s.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "subcategorias", void 0);
exports.Categoria = Categoria = __decorate([
    (0, typeorm_1.Entity)('tb_categoria')
], Categoria);
//# sourceMappingURL=categoria.entity.js.map