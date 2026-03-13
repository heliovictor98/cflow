import { Unidade } from '../../unidades/entities/unidade.entity';
import { Subcategoria } from './subcategoria.entity';
export type DadosComplementaresBarulho = {
    horarioOcorrencia?: string;
    descricao?: string;
};
export type DadosComplementaresManutencao = {
    diasProblema?: number | string;
    detalhe?: string;
};
export type DadosComplementares = DadosComplementaresBarulho | DadosComplementaresManutencao;
export declare class Notificacao {
    id: number;
    numeroProtocolo: string;
    unidadeId: number;
    subcategoriaId: number;
    status: string;
    dadosComplementares: DadosComplementares | null;
    createdAt: Date;
    updatedAt: Date;
    unidade?: Unidade;
    subcategoria?: Subcategoria;
}
