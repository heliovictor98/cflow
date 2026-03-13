import { Categoria } from './categoria.entity';
export declare class Subcategoria {
    id: number;
    categoriaId: number;
    nome: string;
    icone: string;
    ordem: number;
    createdAt: Date;
    updatedAt: Date;
    categoria: Categoria;
}
