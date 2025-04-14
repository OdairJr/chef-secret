import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onRegisterSubmit(userData: { name: string; email: string; password: string }) {
    const usuario = {
      nome: userData.name,
      email: userData.email,
      senhaHash: userData.password,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Usuario;

    this.authService.register(usuario).subscribe({
      next: (registerSuccess) => {
        if (registerSuccess) {
          alert('Registro bem-sucedido!');
            this.router.navigate(['/auth/login']);
        } else {
          console.log('Email já registrado.');
        }
      },
      error: (err) => {
        console.error('Erro ao registrar:', err);
      }
    });
  }
}