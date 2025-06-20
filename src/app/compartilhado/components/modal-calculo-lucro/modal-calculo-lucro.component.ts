import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Receita } from 'src/app/models/receita.model';

@Component({
  selector: 'app-modal-calculo-lucro',
  templateUrl: './modal-calculo-lucro.component.html',
  styleUrls: ['./modal-calculo-lucro.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCalculoLucroComponent {
  @Output() fecharModal = new EventEmitter<void>();

  mostrarModal: boolean = false;
  detalhesReceita = [
    { label: 'Custo dos materiais', valor: 'R$33,12' },
    { label: 'Custos adicionais', valor: 'R$9,94' },
    { label: 'Custo por unidade', valor: 'R$2,87' },
    { label: 'Custo total da receita', valor: 'R$43,06' },
    {
      label: 'Valor sugerido de venda',
      valor: 'R$8,61',
      highlight: true,
    },
  ];

  public receita?: Receita;

  /**
   *
   */
  constructor(private cdr: ChangeDetectorRef) {}

  public abrirModal(receita: Receita) {
    this.receita = receita;

    this.detalhesReceita = [
      { label: 'Custo dos materiais', valor: `R$${this.calcularCustoDosMateriais.toFixed(2)}` },
      { label: 'Custos adicionais', valor: 'R$9,94' },
      { label: 'Custo por unidade', valor: 'R$2,87' },
      { label: 'Custo total da receita', valor: `R$${(this.calcularCustoDosMateriais + 9.94).toFixed(2)}` },
      {
        label: 'Valor sugerido de venda',
        valor: `R$${((this.calcularCustoDosMateriais + 9.94) / 5).toFixed(2)}`,
        highlight: true,
      },
    ];

    this.mostrarModal = true;

    this.cdr.markForCheck();
  }

  private get calcularCustoDosMateriais(): number {
    return (
      this.receita?.ingredientes.reduce((total, ingrediente) => {
        return total + Number(ingrediente.quantidade) * (ingrediente.produto?.preco_padrao ?? 0);
      }, 0) ?? 0
    );
  }

  fechar() {
    this.mostrarModal = false;
    this.fecharModal.emit();
    this.cdr.markForCheck();
  }
}
