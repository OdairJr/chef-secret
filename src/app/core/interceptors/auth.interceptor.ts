import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('authToken');

    // Verifica se a URL é de login ou register
    if (!req.url.includes('/api/login') && !req.url.includes('/api/register') && authToken) {
      // Clona a requisição e adiciona o cabeçalho Authorization
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(clonedReq);
    }

    // Caso contrário, segue com a requisição original
    return next.handle(req);
  }
}
