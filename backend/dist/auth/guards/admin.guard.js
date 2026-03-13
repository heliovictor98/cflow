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
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../../usuarios/usuario.service");
const ADMIN_TOKEN = 'cflow-token-adm';
const USUARIO_TOKEN_PREFIX = 'cflow-usuario-';
let AdminGuard = class AdminGuard {
    usuarioService;
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const auth = request.headers.authorization;
        const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
        if (token === ADMIN_TOKEN)
            return true;
        const match = token?.match(/^cflow-usuario-(\d+)$/);
        if (match) {
            const id = parseInt(match[1], 10);
            try {
                const usuario = await this.usuarioService.findOne(id);
                if (usuario.perfil === 'ADM')
                    return true;
            }
            catch {
            }
        }
        throw new common_1.UnauthorizedException('Acesso restrito ao administrador.');
    }
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], AdminGuard);
//# sourceMappingURL=admin.guard.js.map