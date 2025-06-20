import { Component, OnInit } from '@angular/core';
import { Receita } from 'src/app/models/receita.model';
import { ReceitasService } from '../../services/receitas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-receitas',
  templateUrl: './listagem-receitas.component.html',
  styleUrls: ['./listagem-receitas.component.scss'],
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

  verDetalhes(id?: number): void {
    if (!id) {
      console.error('ID da receita não fornecido para ver detalhes.');
      return;
    }

    this.router.navigate(['/receitas', 'editar-receita', id]);
  }

  deletarReceita(id?: number): void {
    // if (!id) {
    //   console.error('ID da receita não fornecido para deletar.');
    //   return;
    // }

    // this.receitasService.deletarReceita(id).subscribe({
    //   next: () => {
    //     this.carregarReceitas();
    //   },
    //   error: (erro) => {
    //     console.error('Erro ao deletar receita:', erro);
    //     this.erroCarregamento =
    //       'Não foi possível deletar a receita. Tente novamente mais tarde.';
    //   },
    // });
  }
}
