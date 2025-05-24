import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authToken = sessionStorage.getItem('authToken');
  if (!!authToken) {
    return true; // Usuário autenticado
  } else {
    const router = inject(Router);
    router.navigate(['/auth/login']); // Redireciona para a tela de login
    return false; // Bloqueia o acesso
  }
};
