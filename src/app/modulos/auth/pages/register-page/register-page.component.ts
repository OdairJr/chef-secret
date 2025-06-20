import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onRegisterSubmit(userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    const usuario = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
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
        if (err.status === 422 && err.error?.errors?.email) {
          alert('Erro: ' + err.error.errors.email[0]);
        } else {
          console.error('Erro ao registrar:', err);
        }
      },
    });
  }
}
