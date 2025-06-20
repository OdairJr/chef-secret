import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-listagem-categorias',
  templateUrl: './listagem-categorias.component.html',
  styleUrls: ['./listagem-categorias.component.scss']
})
export class ListagemCategoriasComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  private carregarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  public excluirCategoria(id: number): void {
    this.categoriaService.excluirCategoria(id).subscribe(() => {
      this.carregarCategorias();
    });
  }
}
