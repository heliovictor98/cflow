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
exports.NotificacaoController = void 0;
const common_1 = require("@nestjs/common");
const notificacao_service_1 = require("./notificacao.service");
const create_notificacao_dto_1 = require("./dto/create-notificacao.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const usuario_service_1 = require("../usuarios/usuario.service");
const UNIDADE_TOKEN_PREFIX = 'cflow-unidade-';
const ADMIN_TOKEN = 'cflow-token-adm';
const USUARIO_TOKEN_PREFIX = 'cflow-usuario-';
function getUnidadeIdFromRequest(req) {
    const auth = req.headers.authorization;
    const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
    const match = token?.match(new RegExp(`^${UNIDADE_TOKEN_PREFIX}(\\d+)$`));
    if (!match)
        return null;
    return parseInt(match[1], 10);
}
let NotificacaoController = class NotificacaoController {
    notificacaoService;
    usuarioService;
    constructor(notificacaoService, usuarioService) {
        this.notificacaoService = notificacaoService;
        this.usuarioService = usuarioService;
    }
    async isAdmin(req) {
        const auth = req.headers.authorization;
        const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
        if (token === ADMIN_TOKEN)
            return true;
        const match = token?.match(new RegExp(`^${USUARIO_TOKEN_PREFIX}(\\d+)$`));
        if (match) {
            try {
                const usuario = await this.usuarioService.findOne(parseInt(match[1], 10));
                return usuario.perfil === 'ADM';
            }
            catch {
            }
        }
        return false;
    }
    async listChamados(req) {
        const unidadeId = getUnidadeIdFromRequest(req);
        if (unidadeId != null) {
            return this.notificacaoService.findAllByUnidade(unidadeId);
        }
        if (await this.isAdmin(req)) {
            return this.notificacaoService.findAll();
        }
        throw new common_1.UnauthorizedException('Acesso negado.');
    }
    listCategorias() {
        return this.notificacaoService.findAllCategorias();
    }
    getCategoria(id) {
        return this.notificacaoService.findCategoriaById(id);
    }
    listSubcategorias(id) {
        return this.notificacaoService.findSubcategoriasByCategoriaId(id);
    }
    getSubcategoria(id) {
        return this.notificacaoService.findSubcategoriaById(id);
    }
    create(dto, req) {
        const unidadeId = getUnidadeIdFromRequest(req);
        if (unidadeId == null) {
            throw new common_1.UnauthorizedException('Apenas moradores (unidade) podem abrir notificações.');
        }
        return this.notificacaoService.create(dto, unidadeId);
    }
};
exports.NotificacaoController = NotificacaoController;
__decorate([
    (0, common_1.Get)('chamados'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacaoController.prototype, "listChamados", null);
__decorate([
    (0, common_1.Get)('categorias'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificacaoController.prototype, "listCategorias", null);
__decorate([
    (0, common_1.Get)('categorias/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificacaoController.prototype, "getCategoria", null);
__decorate([
    (0, common_1.Get)('categorias/:id/subcategorias'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificacaoController.prototype, "listSubcategorias", null);
__decorate([
    (0, common_1.Get)('subcategorias/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificacaoController.prototype, "getSubcategoria", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notificacao_dto_1.CreateNotificacaoDto, Object]),
    __metadata("design:returntype", void 0)
], NotificacaoController.prototype, "create", null);
exports.NotificacaoController = NotificacaoController = __decorate([
    (0, common_1.Controller)('notificacoes'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [notificacao_service_1.NotificacaoService,
        usuario_service_1.UsuarioService])
], NotificacaoController);
//# sourceMappingURL=notificacao.controller.js.map