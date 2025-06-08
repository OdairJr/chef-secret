import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaDeCompras } from 'src/app/models/lista-de-compras.model';
import { ListaDeComprasService } from '../../services/lista-de-compras.service';

@Component({
  selector: 'app-listar-lista-de-compras',
  templateUrl: './listar-lista-de-compras.component.html',
  styleUrls: ['./listar-lista-de-compras.component.css'],
})
export class ListarListaDeComprasComponent implements OnInit {
  listas: ListaDeCompras[] = [];

  constructor(
    private router: Router,
    private listaDeComprasService: ListaDeComprasService
  ) {}

  ngOnInit(): void {
    this.carregarListas();
  }

  carregarListas(): void {
    this.listaDeComprasService.listarListas().subscribe({
      next: (listas) => {
        this.listas = listas;
      },
      error: (error) => {
        console.error('Erro ao carregar listas:', error);
      },
    });
  }

  selecionarLista(lista: ListaDeCompras): void {
    this.router.navigate(['/lista-de-compras/form-lista-de-compras', lista.id]);
  }

  excluirLista(id: string): void {
    this.listaDeComprasService.excluirLista(id).subscribe({
      next: () => {
        this.listas = this.listas.filter((lista) => lista.id !== id);
      },
      error: (error) => {
        console.error('Erro ao excluir lista:', error);
      },
    });
  }
}
