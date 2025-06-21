import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingrediente } from 'src/app/models/receita.model';

@Component({
  selector: 'app-lista-ingredientes',
  templateUrl: './lista-ingredientes.component.html',
  styleUrls: ['./lista-ingredientes.component.scss'],
})
export class ListaIngredientesComponent {
  @Input() ingredientes: Ingrediente[] = [];
  @Output() editar = new EventEmitter<number>();
  @Output() excluir = new EventEmitter<number>();

  public transformToNumber(value: string): number {
    const numberValue = parseFloat(value);
    return isNaN(numberValue) ? 0 : numberValue;
  }

  editarIngrediente(index: number): void {
    this.editar.emit(index);
  }

  excluirIngrediente(index: number): void {
    this.excluir.emit(index);
  }
}
