import { Material } from './material.model';

export interface ListaDeCompras {
  id: string;
  nome_lista: string;
  descricao?: string;
  id_lista_compra_status: number;

  data_conclusao?: Date | null;
  created_at: Date;
  updated_at: Date;

  itens?: ItemDaLista[];
}

export interface ItemDaLista {
  id_produto: number;
  produto?: Material;
  unidade_medida: string;
  quantidade: number;
  observacao?: string;
  comprado?: boolean;
}
