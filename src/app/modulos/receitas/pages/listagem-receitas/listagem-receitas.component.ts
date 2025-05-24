import { Component, OnInit } from '@angular/core';
import { Receita } from 'src/app/models/receita.model';
import { ReceitasService } from '../../services/receitas.service';

@Component({
  selector: 'app-listagem-receitas',
  templateUrl: './listagem-receitas.component.html',
  styleUrls: ['./listagem-receitas.component.css']
})
export class ListagemReceitasComponent implements OnInit {
  receitas: Receita[] = [];
  erroCarregamento: string | null = null;

  constructor(private receitasService: ReceitasService) {}

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
        this.erroCarregamento = 'Não foi possível carregar as receitas. Tente novamente mais tarde.';
      }
    });
  }

  verDetalhes(id: number): void {
    console.log(`Ver detalhes da receita com ID: ${id}`);
    // Implementar navegação ou lógica para exibir detalhes
  }
}
