import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  carregando = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLoginSubmit(credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    this.carregando = true;

    this.authService.login(email, password).subscribe({
      next: (loginSuccess) => {
        if (loginSuccess) {
          this.router.navigate(['/receitas']);
        } else {
          console.log('Credenciais inválidas.');
        }
        this.carregando = false;
      },
      error: (err) => {
        this.carregando = false;
        if (err.status === 422 && err.error?.errors?.email) {
          alert('Erro: ' + err.error.errors.email[0]);
        } else {
          console.error('Erro ao realizar login:', err);
        }
      },
    });
  }
}
