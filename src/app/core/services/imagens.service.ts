import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imagem, ImagemApiResponse } from 'src/app/models/imagem.model';
import { API_ENDPOINTS } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class ImagensService {

  constructor(private http: HttpClient) {}

  // Listar todas as imagens
  public listarImagens(): Observable<Imagem[]> {
    return this.http.get<Imagem[]>(API_ENDPOINTS.imagens());
  }

  // Obter uma imagem por ID
  public obterImagemPorId(id: number): Observable<Imagem> {
    return this.http.get<Imagem>(`${API_ENDPOINTS.imagens()}/${id}`);
  }

  // Criar uma nova imagem
  public criarImagem(imagem: FormData): Observable<ImagemApiResponse> {
    return this.http.post<ImagemApiResponse>(API_ENDPOINTS.imagens(), imagem);
  }

  // Editar uma imagem existente
  public editarImagem(id: number, imagem: Partial<Imagem>): Observable<Imagem> {
    return this.http.put<Imagem>(`${API_ENDPOINTS.imagens()}/${id}`, imagem);
  }

  // Excluir uma imagem
  public excluirImagem(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.imagens()}/${id}`);
  }

  public viewImagem(id: number): Observable<Blob> {
    return this.http.get(`${API_ENDPOINTS.viewImagem(id)}`, { responseType: 'blob' });
  }
}
