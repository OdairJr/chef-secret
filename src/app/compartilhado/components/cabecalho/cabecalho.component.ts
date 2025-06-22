import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modulos/auth/services/auth.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent {

  constructor(private router: Router, public authService: AuthService) {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
