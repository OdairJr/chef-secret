import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DetalhesProduto {
  quantidade: number;
  unidade_medida: string;
  observacao?: string; // Campo opcional
}

@Component({
  selector: 'app-modal-detalhes-produto',
  templateUrl: './modal-detalhes-produto.component.html',
  styleUrls: ['./modal-detalhes-produto.component.scss']
})
export class ModalDetalhesProdutoComponent {
  mostrarModal: boolean = false;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() confirmarDetalhes = new EventEmitter<DetalhesProduto>();

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      quantidade: [null, [Validators.required, Validators.min(0.01)]],
      unidade_medida: ['', Validators.required],
      observacao: ['']
    });
  }

  public abrirModal() {
    this.formulario.reset();
    this.mostrarModal = true;
  }

  fechar() {
    this.mostrarModal = false;
    this.fecharModal.emit();
  }

  confirmar() {
    if (this.formulario.valid) {
      this.confirmarDetalhes.emit(this.formulario.value);
      this.fechar();
    }
  }
}
