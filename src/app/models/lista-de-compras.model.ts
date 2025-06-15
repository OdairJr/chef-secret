import { Material } from './material.model';

export interface ListaDeCompras {
  id: string;
  nome_lista: string;
  descricao?: string;
  produtos?: ItemDaLista[];
}

export interface ItemDaLista {
  id_produto: number;
  produto?: Material;
  unidade: string;
  quantidade: number;

  // CAMPOS DA TELA
  valor?: number;
  comprado?: boolean;
}
