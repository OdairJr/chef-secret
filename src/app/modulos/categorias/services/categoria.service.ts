import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(
    private http: HttpClient,
  ) { }

  public listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(API_ENDPOINTS.categorias());
  }

  public obterCategoriaPorId(id: number): Observable<Categoria | undefined> {
    return this.http.get<Categoria>(API_ENDPOINTS.categoriaById(id));
  }

  public criarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(API_ENDPOINTS.categorias(), categoria);
  }

  public editarCategoria(categoria: Categoria): Observable<Categoria | undefined> {
    return this.http.put<Categoria>(API_ENDPOINTS.categoriaById(categoria.id), categoria);
  }

  public excluirCategoria(id: number): Observable<boolean> {
    return this.http.delete<boolean>(API_ENDPOINTS.categoriaById(id));
  }
}
