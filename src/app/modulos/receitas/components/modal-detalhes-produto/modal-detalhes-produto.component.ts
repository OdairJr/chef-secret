import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingrediente } from 'src/app/models/receita.model';


@Component({
  selector: 'app-modal-detalhes-produto',
  templateUrl: './modal-detalhes-produto.component.html',
  styleUrls: ['./modal-detalhes-produto.component.css']
})
export class ModalDetalhesProdutoComponent {
  mostrarModal: boolean = false;
  @Output() fecharModal = new EventEmitter<void>();
  @Output() confirmarDetalhes = new EventEmitter<Omit<Ingrediente, 'produto_id'>>();

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      quantidade: [null, [Validators.required, Validators.min(0.01)]],
      unidade: ['', Validators.required],
      observacoes: ['']
    });
  }

  public abrirModal() {
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
