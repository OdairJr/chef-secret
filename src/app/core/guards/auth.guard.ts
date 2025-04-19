import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = localStorage.getItem('currentUser');
  if (!!currentUser) {
    return true; // Usuário autenticado
  } else {
    const router = inject(Router);
    router.navigate(['/auth/login']); // Redireciona para a tela de login
    return false; // Bloqueia o acesso
  }
};