"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnidadeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const unidade_entity_1 = require("./entities/unidade.entity");
const unidade_service_1 = require("./unidade.service");
const unidade_controller_1 = require("./unidade.controller");
const usuario_module_1 = require("../usuarios/usuario.module");
let UnidadeModule = class UnidadeModule {
};
exports.UnidadeModule = UnidadeModule;
exports.UnidadeModule = UnidadeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([unidade_entity_1.Unidade]), usuario_module_1.UsuarioModule],
        controllers: [unidade_controller_1.UnidadeController],
        providers: [unidade_service_1.UnidadeService],
        exports: [unidade_service_1.UnidadeService],
    })
], UnidadeModule);
//# sourceMappingURL=unidade.module.js.map