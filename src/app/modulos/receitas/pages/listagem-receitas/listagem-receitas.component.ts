import { Component, OnInit } from '@angular/core';
import { Receita } from 'src/app/models/receita.model';
import { ReceitasService } from '../../services/receitas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-receitas',
  templateUrl: './listagem-receitas.component.html',
  styleUrls: ['./listagem-receitas.component.css'],
})
export class ListagemReceitasComponent implements OnInit {
  receitas: Receita[] = [];
  erroCarregamento: string | null = null;

  constructor(
    private receitasService: ReceitasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarReceitas();
  }

  carregarReceitas(): void {
    this.receitasService.listarReceitas().subscribe({
      next: (dados) => {
        this.receitas = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar receitas:', erro);
        this.erroCarregamento =
          'Não foi possível carregar as receitas. Tente novamente mais tarde.';
      },
    });
  }

  verDetalhes(id: number): void {
    this.router.navigate(['/receitas', 'editar-receita', id]);
  }
}
