import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const currentUserStr = sessionStorage.getItem('currentUser');
  if (currentUserStr) {
    try {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser.is_admin) {
        return true;
      }
    } catch (e) {
      // JSON inválido, trata como não autorizado
    }
  }
  const router = inject(Router);
  router.navigate(['/receitas']);
  return false;
};
