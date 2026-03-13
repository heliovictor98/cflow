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
exports.UnidadeController = void 0;
const common_1 = require("@nestjs/common");
const unidade_service_1 = require("./unidade.service");
const create_unidade_dto_1 = require("./dto/create-unidade.dto");
const update_unidade_dto_1 = require("./dto/update-unidade.dto");
const admin_guard_1 = require("../auth/guards/admin.guard");
let UnidadeController = class UnidadeController {
    unidadeService;
    constructor(unidadeService) {
        this.unidadeService = unidadeService;
    }
    create(dto) {
        return this.unidadeService.create(dto);
    }
    findAll() {
        return this.unidadeService.findAll();
    }
    findOne(id) {
        return this.unidadeService.findOne(id);
    }
    update(id, dto) {
        return this.unidadeService.update(id, dto);
    }
    remove(id) {
        return this.unidadeService.remove(id);
    }
    resetarSenha(id) {
        return this.unidadeService.resetarSenha(id);
    }
};
exports.UnidadeController = UnidadeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unidade_dto_1.CreateUnidadeDto]),
    __metadata("design:returntype", void 0)
], UnidadeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UnidadeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UnidadeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_unidade_dto_1.UpdateUnidadeDto]),
    __metadata("design:returntype", void 0)
], UnidadeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UnidadeController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/resetar-senha'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UnidadeController.prototype, "resetarSenha", null);
exports.UnidadeController = UnidadeController = __decorate([
    (0, common_1.Controller)('unidades'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [unidade_service_1.UnidadeService])
], UnidadeController);
//# sourceMappingURL=unidade.controller.js.map