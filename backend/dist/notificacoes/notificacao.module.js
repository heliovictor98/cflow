"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacaoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categoria_entity_1 = require("./entities/categoria.entity");
const subcategoria_entity_1 = require("./entities/subcategoria.entity");
const notificacao_entity_1 = require("./entities/notificacao.entity");
const notificacao_historico_entity_1 = require("./entities/notificacao-historico.entity");
const notificacao_service_1 = require("./notificacao.service");
const notificacao_controller_1 = require("./notificacao.controller");
const auth_guard_1 = require("../auth/guards/auth.guard");
const usuario_module_1 = require("../usuarios/usuario.module");
let NotificacaoModule = class NotificacaoModule {
};
exports.NotificacaoModule = NotificacaoModule;
exports.NotificacaoModule = NotificacaoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([categoria_entity_1.Categoria, subcategoria_entity_1.Subcategoria, notificacao_entity_1.Notificacao, notificacao_historico_entity_1.NotificacaoHistorico]),
            usuario_module_1.UsuarioModule,
        ],
        controllers: [notificacao_controller_1.NotificacaoController],
        providers: [notificacao_service_1.NotificacaoService, auth_guard_1.AuthGuard],
        exports: [notificacao_service_1.NotificacaoService],
    })
], NotificacaoModule);
//# sourceMappingURL=notificacao.module.js.map