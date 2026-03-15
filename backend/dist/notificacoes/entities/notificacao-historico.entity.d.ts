import { Notificacao } from './notificacao.entity';
import { Unidade } from '../../unidades/entities/unidade.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
export type TipoHistorico = 'CRIACAO' | 'COMENTARIO' | 'ENCERRAMENTO';
export declare class NotificacaoHistorico {
    id: number;
    notificacaoId: number;
    tipo: TipoHistorico;
    autorUnidadeId: number | null;
    autorUsuarioId: number | null;
    texto: string | null;
    createdAt: Date;
    notificacao?: Notificacao;
    autorUnidade?: Unidade | null;
    autorUsuario?: Usuario | null;
}
