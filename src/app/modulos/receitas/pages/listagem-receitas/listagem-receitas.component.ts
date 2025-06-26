import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Receita } from 'src/app/models/receita.model';
import { ReceitasService } from '../../services/receitas.service';
import { Router } from '@angular/router';
import { ImagensService } from 'src/app/core/services/imagens.service';

@Component({
  selector: 'app-listagem-receitas',
  templateUrl: './listagem-receitas.component.html',
  styleUrls: ['./listagem-receitas.component.scss'],
})
export class ListagemReceitasComponent implements OnInit {
  receitas: any[] = [];
  erroCarregamento: string | null = null;
  carregando = false;

  constructor(private receitasService: ReceitasService, private router: Router, private imagensService: ImagensService) {}

  ngOnInit(): void {
    this.carregarReceitas();
  }

  carregarReceitas(): void {
    this.carregando = true;
    this.receitasService.listarReceitas().subscribe({
      next: async (dados) => {
        this.receitas = dados;
        for (const receita of this.receitas) {
          if (receita.imagens && receita.imagens.length > 0) {
            receita.imagemUrl = await this.viewImagem$(receita.imagens);
          } else {
            receita.imagemUrl = null;
          }
          receita.valorUnitarioVendaSugerido = this.calcularValorUnitarioVendaSugerido(receita);
        }
        this.erroCarregamento = null; // Limpa a mensagem de erro se a
        this.carregando = false;
      },
      error: (erro) => {
        this.carregando = false;
        console.error('Erro ao carregar receitas:', erro);
        this.erroCarregamento = 'Não foi possível carregar as receitas. Tente novamente mais tarde.';
      },
    });
  }

  verDetalhes(id?: number): void {
    if (!id) {
      console.error('ID da receita não fornecido para ver detalhes.');
      return;
    }

    this.router.navigate(['/receitas', 'editar-receita', id]);
  }

  deletarReceita(id?: number): void {
    if (!id) {
      console.error('ID da receita não fornecido para deletar.');
      return;
    }

    this.carregando = true;

    this.receitasService.excluirReceita(id).subscribe({
      next: () => {
        this.carregarReceitas();
        this.carregando = false;
      },
      error: (erro) => {
        this.carregando = false;

        console.error('Erro ao deletar receita:', erro);
        this.erroCarregamento = 'Não foi possível deletar a receita. Tente novamente mais tarde.';
      },
    });
  }

  /**
   * Calcula o valor unitário de venda sugerido para uma receita.
   * @param receita Objeto Receita
   * @returns Valor sugerido de venda por unidade
   */
  public calcularValorUnitarioVendaSugerido(receita: Receita): number {
    const custoDosMateriais =
      receita.ingredientes.reduce((total, ingrediente) => {
        return total + Number(ingrediente.quantidade) * (ingrediente.produto?.preco_padrao ?? 0);
      }, 0) ?? 0;

    const custosAdicionais = (custoDosMateriais * (receita.custos_adicionais ?? 0)) / 100;
    const custoTotal = custoDosMateriais + custosAdicionais;
    const rendimento = receita.rendimento ? parseFloat(receita.rendimento) : 1;
    const custoPorUnidade = rendimento > 0 ? custoTotal / rendimento : 0;
    const lucro_esperado = receita.lucro_esperado ?? 0;

    if (lucro_esperado === 0) {
      return custoPorUnidade;
    }
    return custoPorUnidade + (custoPorUnidade * lucro_esperado) / 100;
  }

  async viewImagem$(id?: any[]): Promise<string | null> {
    if (!id) {
      return null;
    }
    this.carregando = true;

    try {
      const blob = await this.imagensService.viewImagem(id[0].id).toPromise();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.carregando = false;

          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob!);
      });
    } catch {
      return null;
    }
  }
}
