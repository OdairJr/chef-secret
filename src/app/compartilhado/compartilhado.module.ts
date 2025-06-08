import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelecaoMaterialComponent } from './components/modal-selecao-material/modal-selecao-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [ModalSelecaoMaterialComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ModalSelecaoMaterialComponent, ModalComponent]
})
export class CompartilhadoModule { }
