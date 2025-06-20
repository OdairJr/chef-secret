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
      { label: 'Custos adicionais', valor: `R$${this.calcularCustoAdicionais.toFixed(2)}` },
      { label: 'Custo por unidade', valor: `R$${this.calcularCustoPorUnidade.toFixed(2)}` },
      { label: 'Custo total da receita', valor: `R$${this.calcularCustoTotalReceita.toFixed(2)}` },
      {
        label: 'Valor sugerido de venda',
        valor: `R$${this.calcularValorSugeridoVenda.toFixed(2)}`,
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

  /**
   * Calcula o valor dos custos adicionais da receita.
   * O valor é obtido aplicando o percentual de custos adicionais (caso definido na receita)
   * sobre o custo total dos materiais. Retorna 0 se não houver percentual definido.
   * @returns {number} Valor dos custos adicionais calculados.
   */
  public get calcularCustoAdicionais(): number {
    const percentual = this.receita?.custosAdicionais ?? 0;
    const custoMateriais = this.calcularCustoDosMateriais;
    return (custoMateriais * percentual) / 100;
  }

  /**
   * Calcula o custo por unidade da receita.
   * O custo total é a soma do custo dos materiais e dos custos adicionais.
   * O rendimento é obtido da receita, e se não estiver definido, assume 1.
   * Retorna 0 se o rendimento for menor ou igual a 0.
   * @returns {number} Custo por unidade calculado.
   */
  public get calcularCustoPorUnidade(): number {
    const custoTotal = this.calcularCustoDosMateriais + this.calcularCustoAdicionais;
    const rendimento = this.receita?.rendimento ? parseFloat(this.receita.rendimento) : 1;
    return rendimento > 0 ? custoTotal / rendimento : 0;
  }

  /**
   * Calcula o custo total da receita.
   * O custo total é a soma do custo dos materiais e dos custos adicionais.
   * @returns {number} Custo total da receita calculado.
   */
  public get calcularCustoTotalReceita(): number {
    return this.calcularCustoDosMateriais + this.calcularCustoAdicionais;
  }

  /**
   * Calcula o valor sugerido de venda da receita.
   * O valor é obtido somando o custo por unidade com o lucro esperado (se definido).
   * Se o lucro esperado for 0, retorna apenas o custo por unidade.
   * @returns {number} Valor sugerido de venda calculado.
   */
  public get calcularValorSugeridoVenda(): number {
    const custoPorUnidade = this.calcularCustoPorUnidade;
    const lucroEsperado = this.receita?.lucroEsperado ? this.receita.lucroEsperado : 0;

    // Se o lucro esperado for 0, retorna o custo por unidade
    if (lucroEsperado === 0) {
      return custoPorUnidade;
    }

    // Calcula o valor sugerido de venda com base no custo por unidade e no lucro esperado
    return custoPorUnidade + (custoPorUnidade * lucroEsperado) / 100;
  }

  /**
   * Calcula o lucro total da receita.
   * O lucro é obtido subtraindo o custo total da receita do valor sugerido de venda.
   * @returns {number} Lucro total calculado.
   */
  public get calcularLucroTotal(): number {
    const rendimento = this.receita?.rendimento ? parseFloat(this.receita.rendimento) : 1;

    debugger
    return (this.calcularValorSugeridoVenda * rendimento) - this.calcularCustoTotalReceita;
  }

  fechar() {
    this.mostrarModal = false;
    this.fecharModal.emit();
    this.cdr.markForCheck();
  }
}
