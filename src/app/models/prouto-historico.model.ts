export interface ProutoHistorico {
  id: number;
  id_usuario: string;
  id_produto: string;
  preco_unitario: string;
  quantidade: string;
  preco_total: string;
  data_compra: string;
  desconto: string;
  created_at: string;
  updated_at: string;
  produto: Produto;
  usuario: Usuario;
}

export interface Produto {
  id: number;
  codigo_barra: string;
  nome: string;
  descricao: string;
  id_categoria: number;
  unidade_medida: string;
  created_at: string;
  updated_at: string;
  quantidade: string;
  preco_padrao: string | null;
}

export interface Usuario {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  is_admin: boolean;
}
