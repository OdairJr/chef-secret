import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/config/api.config';
import { ProutoHistorico } from 'src/app/models/prouto-historico.model';

@Injectable({
  providedIn: 'root',
})
export class HistoricoCompraService {
  constructor(private http: HttpClient) {}

  listarHistoricoCompras(idUsuario: number): Observable<ProutoHistorico[]> {
    return this.http.get<ProutoHistorico[]>(API_ENDPOINTS.produtoHistorico(idUsuario));
  }

  obterHistoricoCompraPorId(idProduto: number): Observable<ProutoHistorico> {
    return this.http.get<ProutoHistorico>(API_ENDPOINTS.produtoHistoricoById(idProduto));
  }

  opterPrecoPadraoPorId(idProduto: number): Observable<number> {
    return this.http.get<number>(API_ENDPOINTS.produtoPrecoPadrao(idProduto));
  }
}
