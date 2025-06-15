import { Material } from "./material.model";
import { Usuario } from "./usuario.model";

export interface Receita {
  id?: number;
  id_usuario?: number;
  titulo: string;
  descricao: string;
  rendimento: string;
  tempo_preparo: string;
  updated_at?: string;
  created_at?: string;
  usuario?: Usuario;
  tags: ReceitaTag[];
  imagens: number[];
  // etapas: Etapa[];
  ingredientes: Ingrediente[];
}

export interface ReceitaTag {
  id: number;
  nome: string;
  pivot: Pivot;
}

export interface Pivot {
  id_receita: string;
  id_tag: string;
}

export interface Etapa {
  id: number;
  id_receita: string;
  numero_etapa: number;
  instrucoes: string;
}

export interface Ingrediente {
  id?: number;
  id_receita?: number;
  id_produto: number;
  quantidade: string;
  unidade: string;
  observacoes?: string;
  produto?: Material;
}

