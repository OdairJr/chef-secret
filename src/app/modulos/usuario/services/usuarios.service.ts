import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/config/api.config';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  public listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(API_ENDPOINTS.usuarios());
  }

  public grantAdmin(id: number): Observable<any> {
    return this.http.put(API_ENDPOINTS.grantAdmin(id), {});
  }

  public revokeAdmin(id: number): Observable<any> {
    return this.http.put(API_ENDPOINTS.revokeAdmin(id), {});
  }

}
