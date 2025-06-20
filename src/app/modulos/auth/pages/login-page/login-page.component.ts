import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLoginSubmit(credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    this.authService.login(email, password).subscribe({
      next: (loginSuccess) => {
        if (loginSuccess) {
          this.router.navigate(['/receitas']);
        } else {
          console.log('Credenciais inválidas.');
        }
      },
      error: (err) => {
        if (err.status === 422 && err.error?.errors?.email) {
          alert('Erro: ' + err.error.errors.email[0]);
        } else {
          console.error('Erro ao realizar login:', err);
        }
      },
    });
  }
}
