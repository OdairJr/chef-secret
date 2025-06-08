import { Material } from "./material.model";

export interface ItemDaLista {
  id?: string;
  materialRelacionado: Material;
  quantidade: number;
  valor?: number;
  comprado?: boolean;
}
