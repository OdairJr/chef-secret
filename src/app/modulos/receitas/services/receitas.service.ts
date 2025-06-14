import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita, ReceitaTag } from 'src/app/models/receita.model';
import { API_ENDPOINTS } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  constructor(private http: HttpClient) {}

  public listarReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(API_ENDPOINTS.receitas());
  }

  public obterReceitaPorId(id: number): Observable<Receita> {
    return this.http.get<Receita>(API_ENDPOINTS.receitaById(id));
  }

  public criarReceita(receita: Receita): Observable<Receita> {
    const receitaComTagsIds = {
      ...receita,
      tags: receita.tags.map((tag) => tag.id), // Mapeia para uma lista de IDs
    };

    return this.http.post<Receita>(API_ENDPOINTS.receitas(), receitaComTagsIds);
  }

  public editarReceita(receita: Receita): Observable<Receita> {
    if (!receita.id) {
      throw new Error('Receita ID is required for editing');
    }

    const receitaComTagsIds = {
      ...receita,
      tags: receita.tags.map((tag) => tag.id), // Mapeia para uma lista de IDs
    };

    return this.http.put<Receita>(API_ENDPOINTS.receitaById(receita.id), receitaComTagsIds);
  }

  public excluirReceita(id: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.receitaById(id));
  }

  public listarTagsReceita(): Observable<ReceitaTag[]> {
    return this.http.get<ReceitaTag[]>(API_ENDPOINTS.receitaTags());
  }
}
