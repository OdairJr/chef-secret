import { Produto } from "./produto.model";

export interface Receita {
  id: number;
  updated_at?: string;
  created_at?: string;
  id_usuario: number;

  titulo: string;
  descricao: string;
  rendimento: string;
  tempo_preparo: string;
  etapas: Etapa[];
  ingredientes: Ingrediente[];
}

export interface Etapa {
  numero_etapa: number;
  instrucoes: string;
}

export interface Ingrediente {
  id_produto: number;
  produto?: Produto;
  quantidade: number;
  unidade: string;
  observacoes?: string; // Campo opcional
}
