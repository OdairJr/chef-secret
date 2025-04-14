import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLoginSubmit(credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    this.authService.login(email, password).subscribe({
      next: (loginSuccess) => {
        if (loginSuccess) {
          alert('Login bem-sucedido!');
          this.router.navigate(['/materiais']);
        } else {
          console.log('Credenciais inválidas.');
        }
      },
      error: (err) => {
        console.error('Erro ao realizar login:', err);
      }
    });
  }
}