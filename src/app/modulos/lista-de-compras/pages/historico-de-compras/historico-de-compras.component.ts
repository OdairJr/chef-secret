import { Component } from '@angular/core';

interface ListaDeComprasMock {
  id: string;
  nomeLista: string;
  valorTotal: number;
  data: string;
  itens: {
    nomeItem: string;
    quantidade: number;
    marca: string;
    valor: number;
  }[];
}

@Component({
  selector: 'app-historico-de-compras',
  templateUrl: './historico-de-compras.component.html',
  styleUrls: ['./historico-de-compras.component.css']
})
export class HistoricoDeComprasComponent {
  historico: ListaDeComprasMock[] = [
    {
      id: '1',
      nomeLista: 'Supermercado Março',
      valorTotal: 210.75,
      data: '2024-03-10',
      itens: [
        { nomeItem: 'Arroz', quantidade: 2, marca: 'Tio João', valor: 25.00 },
        { nomeItem: 'Feijão', quantidade: 1, marca: 'Camil', valor: 8.50 }
      ]
    },
    {
      id: '2',
      nomeLista: 'Churrasco Família',
      valorTotal: 350.00,
      data: '2024-02-20',
      itens: [
        { nomeItem: 'Carne', quantidade: 5, marca: 'Friboi', valor: 200.00 },
        { nomeItem: 'Carvão', quantidade: 2, marca: 'Brasa Forte', valor: 30.00 }
      ]
    }
  ];

  listaSelecionada: ListaDeComprasMock | null = null;

  selecionarLista(lista: ListaDeComprasMock): void {
    this.listaSelecionada = lista;
  }

  voltar(): void {
    this.listaSelecionada = null;
  }
}
