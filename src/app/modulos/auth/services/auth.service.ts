import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
// import * as crypto from 'crypto-js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, senha: string): Observable<boolean> {
    const usuarios = this.getUsuariosFromLocalStorage();
    const senhaHash = this.hashPassword(senha);
    const usuario = usuarios.find(user => user.email === email && user.senhaHash === senhaHash);

    if (usuario) {
      localStorage.setItem('currentUser', JSON.stringify(usuario));
      return of(true);
    }
    return of(false);
  }

  register(usuario: Usuario): Observable<boolean> {
    const usuarios = this.getUsuariosFromLocalStorage();
    const emailExists = usuarios.some(user => user.email === usuario.email);

    if (emailExists) {
      return of(false); // Email já registrado
    }

    usuario.id = new Date().getTime(); // Gerar um ID único
    usuario.senhaHash = this.hashPassword(usuario.senhaHash);
    usuarios.push(usuario);
    this.saveUsuariosToLocalStorage(usuarios);
    return of(true);
  }

  forgotPassword(email: string): Observable<boolean> {
    const usuarios = this.getUsuariosFromLocalStorage();
    const usuario = usuarios.find(user => user.email === email);

    if (usuario) {
      // Aqui você pode implementar o envio de email ou outra lógica
      console.log(`Instruções de recuperação de senha enviadas para: ${email}`);
      return of(true);
    }
    return of(false);
  }

  private hashPassword(password: string): string {
    // return crypto.SHA256(password).toString();
    return password;
  }

  private getUsuariosFromLocalStorage(): Usuario[] {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
  }

  private saveUsuariosToLocalStorage(usuarios: Usuario[]): void {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
}
