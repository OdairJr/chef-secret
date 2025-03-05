import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly BACKEND_URL = "";

  constructor( private httpClient: HttpClient) { }

  public logar(email: string, senha:string): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.BACKEND_URL}`, {
      "email": email,
      "password": senha
  });
  }


  public criarUsuario(usuario:Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.BACKEND_URL}`, usuario);
  }
}
