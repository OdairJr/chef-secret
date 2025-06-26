import { Component, OnInit } from '@angular/core';
import { HistoricoCompraService } from 'src/app/core/services/historico-compra.service';

@Component({
  selector: 'app-lista-historico',
  templateUrl: './lista-historico.component.html',
  styleUrls: ['./lista-historico.component.css'],
})
export class ListaHistoricoComponent implements OnInit {
  public historico: any;

  constructor(private historicoCompraService: HistoricoCompraService) {}

  ngOnInit(): void {
    this.historicoCompraService
      .listarHistoricoCompras(this.getUserId()) // Substitua 1 pelo ID do usuário real
      .subscribe({
        next: (data) => {
          this.historico = data;
        },
        error: (error) => {
          console.error('Erro ao carregar histórico de compras:', error);
        },
      });
  }

  private getUserId(): number {
    const currentUserJson = sessionStorage.getItem('currentUser');
    if (currentUserJson) {
      try {
        const currentUser = JSON.parse(currentUserJson);
        return currentUser.id;
      } catch {
        console.error('Erro ao fazer parse do currentUser da sessionStorage');
        return 0;
      }
    }
    return 0;
  }
}
