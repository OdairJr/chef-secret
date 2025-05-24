import { Injectable } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
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

  public listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(API_ENDPOINTS.produtos());
  }

  public obterProdutoPorId(id: number): Observable<Produto | undefined> {
    return this.http.get<Produto>(API_ENDPOINTS.produtoById(id));
  }

  public criarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(API_ENDPOINTS.produtos(), produto);
  }

  public editarProduto(produto: Produto): Observable<Produto | undefined> {
    return this.http.put<Produto>(
      API_ENDPOINTS.produtoById(produto.id),
      produto
    );
  }

  public excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.produtoById(id));
  }
}
