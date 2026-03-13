"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const unidade_service_1 = require("../unidades/unidade.service");
const usuario_service_1 = require("../usuarios/usuario.service");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const SALT_ROUNDS = 10;
const ADMIN_USER = 'adm';
const ADMIN_PASS = 'adm';
const ADMIN_TOKEN = 'cflow-token-adm';
const UNIDADE_TOKEN_PREFIX = 'cflow-unidade-';
const USUARIO_TOKEN_PREFIX = 'cflow-usuario-';
function firstAndLastName(full) {
    const parts = full.trim().split(/\s+/).filter(Boolean);
    if (parts.length <= 2)
        return full.trim();
    return `${parts[0]} ${parts[parts.length - 1]}`;
}
let AuthService = class AuthService {
    unidadeService;
    usuarioService;
    constructor(unidadeService, usuarioService) {
        this.unidadeService = unidadeService;
        this.usuarioService = usuarioService;
    }
    async login(dto) {
        if (dto.username === ADMIN_USER && dto.password === ADMIN_PASS) {
            return {
                token: ADMIN_TOKEN,
                username: ADMIN_USER,
                isAdmin: true,
                displayName: 'Administrador',
                profile: 'Administrador',
            };
        }
        const unidade = await this.unidadeService.findByLogin(dto.username);
        if (unidade) {
            const displayName = firstAndLastName(unidade.nomeMoradorResponsavel);
            if (!unidade.senha) {
                return {
                    token: `${UNIDADE_TOKEN_PREFIX}${unidade.id}`,
                    username: unidade.login,
                    isAdmin: false,
                    displayName,
                    profile: 'Morador',
                    requiresPasswordSetup: true,
                };
            }
            const ok = await bcrypt.compare(dto.password, unidade.senha);
            if (!ok)
                throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
            return {
                token: `${UNIDADE_TOKEN_PREFIX}${unidade.id}`,
                username: unidade.login,
                isAdmin: false,
                displayName,
                profile: 'Morador',
            };
        }
        const usuario = await this.usuarioService.findByLogin(dto.username);
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
        }
        const profileLabel = usuario_entity_1.PERFIL_LABELS[usuario.perfil];
        if (!usuario.senha) {
            return {
                token: `${USUARIO_TOKEN_PREFIX}${usuario.id}`,
                username: usuario.login,
                isAdmin: usuario.perfil === 'ADM',
                displayName: usuario.nomeCompleto,
                profile: profileLabel,
                requiresPasswordSetup: true,
            };
        }
        const ok = await bcrypt.compare(dto.password, usuario.senha);
        if (!ok)
            throw new common_1.UnauthorizedException('Usuário ou senha inválidos');
        return {
            token: `${USUARIO_TOKEN_PREFIX}${usuario.id}`,
            username: usuario.login,
            isAdmin: usuario.perfil === 'ADM',
            displayName: usuario.nomeCompleto,
            profile: profileLabel,
        };
    }
    async setPassword(dto) {
        const token = dto.token || '';
        const hash = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);
        const unidadeMatch = token.match(/^cflow-unidade-(\d+)$/);
        if (unidadeMatch) {
            const id = parseInt(unidadeMatch[1], 10);
            await this.unidadeService.setSenha(id, hash);
            return { success: true };
        }
        const usuarioMatch = token.match(/^cflow-usuario-(\d+)$/);
        if (usuarioMatch) {
            const id = parseInt(usuarioMatch[1], 10);
            await this.usuarioService.setSenha(id, hash);
            return { success: true };
        }
        throw new common_1.BadRequestException('Token inválido');
    }
    static isAdminToken(token) {
        return token === ADMIN_TOKEN;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [unidade_service_1.UnidadeService,
        usuario_service_1.UsuarioService])
], AuthService);
//# sourceMappingURL=auth.service.js.map