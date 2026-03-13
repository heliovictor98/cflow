export type PerfilUsuario = 'ADM' | 'PORTARIA' | 'ZELADORIA_LIMPEZA';
export declare class Usuario {
    id: number;
    nomeCompleto: string;
    contato: string | null;
    perfil: PerfilUsuario;
    login: string;
    senha: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PERFIS: PerfilUsuario[];
export declare const PERFIL_LABELS: Record<PerfilUsuario, string>;
