"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const ADMIN_TOKEN = 'cflow-token-adm';
const UNIDADE_TOKEN_PREFIX = 'cflow-unidade-';
const USUARIO_TOKEN_PREFIX = 'cflow-usuario-';
let AuthGuard = class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const auth = request.headers.authorization;
        const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
        if (!token)
            throw new common_1.UnauthorizedException('Token não informado.');
        if (token === ADMIN_TOKEN)
            return true;
        if (token.startsWith(UNIDADE_TOKEN_PREFIX) && /^\d+$/.test(token.slice(UNIDADE_TOKEN_PREFIX.length)))
            return true;
        if (token.startsWith(USUARIO_TOKEN_PREFIX) && /^\d+$/.test(token.slice(USUARIO_TOKEN_PREFIX.length)))
            return true;
        throw new common_1.UnauthorizedException('Token inválido.');
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map