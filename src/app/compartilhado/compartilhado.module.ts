import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelecaoMaterialComponent } from './components/modal-selecao-material/modal-selecao-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { ModalSelecaoReceitaComponent } from './components/modal-selecao-receita/modal-selecao-receita.component';



@NgModule({
  declarations: [ModalSelecaoMaterialComponent, ModalComponent, ModalSelecaoReceitaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ModalSelecaoMaterialComponent, ModalComponent, ModalSelecaoReceitaComponent]
})
export class CompartilhadoModule { }
