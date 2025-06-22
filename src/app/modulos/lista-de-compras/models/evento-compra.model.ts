export interface DetalheProdutoEventoCompra {
  id_produto: number;
  preco_unitario: number;
  desconto: number;
}

export interface EventoCompra {
  id_lista_compra: number;
  data_compra_efetiva?: string;
  detalhes_produtos: DetalheProdutoEventoCompra[];
}
