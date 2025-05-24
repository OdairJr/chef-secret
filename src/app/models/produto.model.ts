import { Categoria } from './categoria.model';

export interface Produto {
  id: number;
  codigo_barra: string;
  nome: string;
  descricao: string | null;
  id_categoria: number;
  unidade_medida: string | null;
  created_at: string;
  updated_at: string;
  quantidade: number | null;
  categoria: Categoria;
  imagens: Imagem[];
}

export interface Imagem {
  id: number;
  id_usuario: number;
  id_tipo_imagem: number;
  nome_arquivo: string;
  mime_type: string;
  is_publico: boolean;
  created_at: string;
  updated_at: string;
  url: string;
  caminho_storage: string | null;
  display_url: string;
  pivot: Pivot;
}

export interface Pivot {
  id_produto: string;
  id_imagem: string;
}
