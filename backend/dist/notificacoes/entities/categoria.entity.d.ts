import { Subcategoria } from './subcategoria.entity';
export declare class Categoria {
    id: number;
    nome: string;
    descricao: string | null;
    icone: string;
    ordem: number;
    createdAt: Date;
    updatedAt: Date;
    subcategorias?: Subcategoria[];
}
