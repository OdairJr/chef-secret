import { TipoImagem } from "./tipo-imagem.model";

export interface UsuarioImagem {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  is_admin: boolean;
}

export interface Imagem {
  id: number;
  id_usuario: number;
  id_tipo_imagem: number;
  nome_arquivo: string;
  caminho_storage: string;
  mime_type: string;
  is_publico: boolean;
  url: string;
  updated_at: string;
  created_at: string;
  display_url: string;
  usuario: UsuarioImagem;
  tipo_imagem: TipoImagem;
}

export interface ResultadoProcessamentoCupom {
  sucesso: boolean;
  mensagem?: string;
  message?: string;
  itensProcessados?: number;
  itensIgnorados?: number;
  errosProcessamento?: any[];
  idProdutosHistorico?: number[];
}

export interface ImagemApiResponse {
  imagem: Imagem;
  resultadoProcessamentoCupom: ResultadoProcessamentoCupom;
}
