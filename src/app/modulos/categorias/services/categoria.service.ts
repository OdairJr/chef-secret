import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly STORAGE_KEY = 'categorias';

  constructor() { }

  private getCategoriasFromStorage(): Categoria[] {
    const categorias = localStorage.getItem(this.STORAGE_KEY);
    return categorias ? JSON.parse(categorias) : [];
  }

  private saveCategoriasToStorage(categorias: Categoria[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categorias));
  }

  public listarCategorias(): Observable<Categoria[]> {
    const categorias = this.getCategoriasFromStorage();
    return of(categorias);
  }

  public obterCategoriaPorId(id: number): Observable<Categoria | undefined> {
    const categorias = this.getCategoriasFromStorage();
    const categoria = categorias.find(c => c.id === id);
    return of(categoria);
  }

  public criarCategoria(categoria: Categoria): Observable<Categoria> {
    const categorias = this.getCategoriasFromStorage();
    categoria.id = this.gerarIdUnico(categorias);
    categorias.push(categoria);
    this.saveCategoriasToStorage(categorias);
    return of(categoria);
  }

  public editarCategoria(categoria: Categoria): Observable<Categoria | undefined> {
    const categorias = this.getCategoriasFromStorage();
    const index = categorias.findIndex(c => c.id === categoria.id);
    if (index !== -1) {
      categorias[index] = categoria;
      this.saveCategoriasToStorage(categorias);
      return of(categoria);
    }
    return of(undefined);
  }

  public excluirCategoria(id: number): Observable<boolean> {
    const categorias = this.getCategoriasFromStorage();
    const novasCategorias = categorias.filter(c => c.id !== id);
    if (novasCategorias.length !== categorias.length) {
      this.saveCategoriasToStorage(novasCategorias);
      return of(true);
    }
    return of(false);
  }

  private gerarIdUnico(categorias: Categoria[]): number {
    const ids = categorias.map(c => c.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
}
