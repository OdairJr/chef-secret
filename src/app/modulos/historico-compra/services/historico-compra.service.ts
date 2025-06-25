import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from 'src/app/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class HistoricoCompraService {
  constructor(private http: HttpClient) {}

  listarHistoricoCompras(idUsuario: number) {
    return this.http.get(API_ENDPOINTS.produtoHistorico(idUsuario));
  }
}
