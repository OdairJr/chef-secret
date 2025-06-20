import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelecaoMaterialComponent } from './components/modal-selecao-material/modal-selecao-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ModalSelecaoReceitaComponent } from './components/modal-selecao-receita/modal-selecao-receita.component';
import { ModalDetalhesProdutoComponent } from './components/modal-detalhes-produto/modal-detalhes-produto.component';
import { ModalCalculoLucroComponent } from './components/modal-calculo-lucro/modal-calculo-lucro.component';

@NgModule({
  declarations: [ModalSelecaoMaterialComponent, ModalComponent, ModalSelecaoReceitaComponent, ModalDetalhesProdutoComponent, ModalCalculoLucroComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ModalSelecaoMaterialComponent, ModalComponent, ModalSelecaoReceitaComponent, ModalDetalhesProdutoComponent, ModalCalculoLucroComponent],
})
export class CompartilhadoModule {}
