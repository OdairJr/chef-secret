import { Injectable } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly STORAGE_KEY = 'produtos';

  constructor(private categoriaService: CategoriaService) { }

  private getProdutosFromStorage(): Produto[] {
    const produtos = localStorage.getItem(this.STORAGE_KEY);
    return produtos ? JSON.parse(produtos) : [];
  }

  private saveProdutosToStorage(produtos: Produto[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(produtos));
  }

  public listarProdutos(): Observable<Produto[]> {
    const produtos = this.getProdutosFromStorage();
    return this.categoriaService.listarCategorias().pipe(
      map((categorias: Categoria[]) => {
        return produtos.map(produto => ({
          ...produto,
          categoria: categorias.find(c => c.id === produto.idCategoria)
        }));
      })
    );
  }

  public obterProdutoPorId(id: number): Observable<Produto | undefined> {
    const produtos = this.getProdutosFromStorage();
    return this.categoriaService.listarCategorias().pipe(
      map((categorias: Categoria[]) => {
        const produto = produtos.find(p => p.id === id);
        if (produto) {
          produto.categoria = categorias.find(c => c.id === produto.idCategoria);
        }
        return produto;
      })
    );
  }

  public criarProduto(produto: Produto): Observable<Produto> {
    const produtos = this.getProdutosFromStorage();
    produto.id = this.gerarIdUnico(produtos);
    produtos.push(produto);
    this.saveProdutosToStorage(produtos);
    return of(produto);
  }

  public editarProduto(produto: Produto): Observable<Produto | undefined> {
    const produtos = this.getProdutosFromStorage();
    const index = produtos.findIndex(p => p.id === produto.id);
    if (index !== -1) {
      produtos[index] = produto;
      this.saveProdutosToStorage(produtos);
      return of(produto);
    }
    return of(undefined);
  }

  public excluirProduto(id: number): Observable<boolean> {
    const produtos = this.getProdutosFromStorage();
    const novosProdutos = produtos.filter(p => p.id !== id);
    if (novosProdutos.length !== produtos.length) {
      this.saveProdutosToStorage(novosProdutos);
      return of(true);
    }
    return of(false);
  }

  private gerarIdUnico(produtos: Produto[]): number {
    const ids = produtos.map(p => p.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
}
