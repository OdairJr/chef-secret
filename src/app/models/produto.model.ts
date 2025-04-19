import { Categoria } from './categoria.model';

export interface Produto {
    id: number;
    nome: string;
    codigoBarra: string;
    idCategoria: number;
    unidadeMedida: string;
    categoria?: Categoria; // Nova propriedade para associar a categoria
}