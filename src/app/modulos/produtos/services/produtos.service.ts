import { Injectable } from '@angular/core';
import { Material } from 'src/app/models/material.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  constructor(
    private http: HttpClient
  ) {}

  public listarProdutos(): Observable<Material[]> {
    return this.http.get<Material[]>(API_ENDPOINTS.produtos());
  }

  public obterProdutoPorId(id: number): Observable<Material | undefined> {
    return this.http.get<Material>(API_ENDPOINTS.produtoById(id));
  }

  public criarProduto(produto: Material): Observable<Material> {
    return this.http.post<Material>(API_ENDPOINTS.produtos(), produto);
  }

  public editarProduto(produto: Material): Observable<Material | undefined> {
    return this.http.put<Material>(
      API_ENDPOINTS.produtoById(produto.id),
      produto
    );
  }

  public excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.produtoById(id));
  }
}
