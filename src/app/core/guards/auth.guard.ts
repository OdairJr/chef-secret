import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = localStorage.getItem('currentUser');
  return !!currentUser; // Retorna true se o usuário estiver autenticado, caso contrário, false
};