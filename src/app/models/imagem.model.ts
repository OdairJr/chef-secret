import { TipoImagem } from "./tipo-imagem.model";

export interface Imagem {
  id: number;
  id_tipo_imagem: number;
  tipo_imagem?: TipoImagem; // Relacionamento opcional com TipoImagem
  nome_arquivo: string; // Nome do arquivo original
  is_publico: boolean; // Indica se a imagem é pública ou privada
  image_file?: File; // Arquivo de imagem para upload
}
