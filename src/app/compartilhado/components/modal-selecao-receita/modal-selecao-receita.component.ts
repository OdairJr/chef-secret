import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReceitasService } from 'src/app/modulos/receitas/services/receitas.service';
import { Receita } from 'src/app/models/receita.model';

@Component({
  selector: 'app-modal-selecao-receita',
  templateUrl: './modal-selecao-receita.component.html',
  styleUrls: ['./modal-selecao-receita.component.css'],
})
export class ModalSelecaoReceitaComponent {
  receitas: Receita[] = [];
  receitasFiltradas: Receita[] = [];
  mostrarModal: boolean = false;
  busca: string = '';

  @Output() receitaSelecionada = new EventEmitter<Receita>();
  @Output() fecharModal = new EventEmitter<void>();

  constructor(private receitasService: ReceitasService) {}

  carregarReceitas(): void {
    this.receitasService.listarReceitas().subscribe((dados) => {
      this.receitas = dados;
      this.receitasFiltradas = dados;
    });
  }

  filtrarReceitas(): void {
    const termo = this.busca.toLowerCase();
    this.receitasFiltradas = this.receitas.filter((receita) =>
      receita.titulo.toLowerCase().includes(termo)
    );
  }

  selecionarReceita(receita: Receita): void {
    this.fechar();
    this.receitaSelecionada.emit(receita);
  }

  abrirModal(): void {
    this.receitasService.listarReceitas().subscribe((dados) => {
      this.receitas = dados;
      this.receitasFiltradas = dados;
      this.mostrarModal = true;
    });
  }

  fechar(): void {
    this.mostrarModal = false;
    this.fecharModal.emit();
  }
}
