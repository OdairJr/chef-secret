import { ItemDaLista } from './itens-da-lista.model';

export interface ListaDeCompras {
  id: string;
  nomeLista?: string;
  itens?: ItemDaLista[];
  valorTotal: number;
  notasFiscais?: File[];
}
