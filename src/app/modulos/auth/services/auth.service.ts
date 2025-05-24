import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from 'src/app/config/api.config';

export interface RegisterResponse {
  message: string;
  user: Usuario;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API_ENDPOINTS.login(), { email, password }).pipe(
      tap((response) => {
        sessionStorage.setItem('currentUser', JSON.stringify(response.user));
        sessionStorage.setItem('authToken', response.token);
      })
    );
  }

  register(usuario: Usuario): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API_ENDPOINTS.register(), usuario);
  }

  forgotPassword(email: string): Observable<boolean> {
    // const usuarios = this.getUsuariosFromLocalStorage();
    // const usuario = usuarios.find(user => user.email === email);

    // if (usuario) {
    //   // Aqui você pode implementar o envio de email ou outra lógica
    //   console.log(`Instruções de recuperação de senha enviadas para: ${email}`);
    //   return of(true);
    // }
    return of(false);
  }

}
