import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitasService } from '../../services/receitas.service';
import { ImagensService } from 'src/app/core/services/imagens.service';
import { Ingrediente, Receita, ReceitaTag } from 'src/app/models/receita.model';
import { Imagem } from 'src/app/models/imagem.model';
import { Material } from 'src/app/models/material.model';
// Importe ou defina DetalhesProduto conforme necessário
import { ModalDetalhesProdutoComponent, DetalhesProduto } from '../../../../compartilhado/components/modal-detalhes-produto/modal-detalhes-produto.component';
import { forkJoin, map } from 'rxjs';
import { ProdutosService } from 'src/app/modulos/produtos/services/produtos.service';
import { ModalCalculoLucroComponent } from 'src/app/compartilhado/components/modal-calculo-lucro/modal-calculo-lucro.component';

@Component({
  selector: 'app-form-receita',
  templateUrl: './form-receita.component.html',
  styleUrls: ['./form-receita.component.scss'],
})
export class FormReceitaComponent implements OnInit {
  formulario!: FormGroup;
  receitaId: number | null = null;
  public receitaOriginal?: Receita; // Armazena o objeto original da receita
  public ingredientes: Ingrediente[] = [];
  public ingredienteSendoAdicionado?: Partial<Ingrediente>;
  public tagsSelecionadas: ReceitaTag[] = [];
  public imagens: Imagem[] = []; // Lista de imagens da receita

  @ViewChild('modal_detalhes_produto')
  modalDetalhesProduto!: ModalDetalhesProdutoComponent;

  @ViewChild('model_calculo_lucro')
  modalCalculoLucro!: ModalCalculoLucroComponent;

  imagemId?: number;
  imagemUrl?: string;

  constructor(
    private formBuilder: FormBuilder,
    private receitasService: ReceitasService,
    private imagensService: ImagensService,
    private produtosService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descricao: [''],
      rendimento: [''],
      tempo_preparo: [''],
      custos_adicionais: [0],
      lucro_esperado: [0],
    });

    this.receitaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.receitaId) {
      this.carregarReceita(this.receitaId);
    }
  }

  private carregarInformacoesDosProdutos(ingredientes: Ingrediente[]): void {
    const requisicoes = ingredientes.map((ingrediente) =>
      this.produtosService.obterProdutoPorId(ingrediente.id_produto).pipe(
        map((produto) => ({
          ...ingrediente,
          produto,
        }))
      )
    );

    forkJoin(requisicoes).subscribe((ingredientesComProdutos) => {
      this.ingredientes = ingredientesComProdutos;
    });
  }

  private carregarReceita(id: number): void {
    this.receitasService.obterReceitaPorId(id).subscribe((receita: Receita) => {
      this.receitaOriginal = receita; // Armazena o objeto original
      this.formulario.patchValue(receita);
      this.ingredientes = receita.ingredientes;
      this.tagsSelecionadas = receita.tags || [];

      // this.imagens = receita.imagens.map((id) => ({
      //   id,
      //   nome: '',
      //   url: `/imagens/${id}`,
      //   id_tipo_imagem: 0,
      //   nome_arquivo: '',
      //   is_publico: true,
      // })) as Imagem[];

      this.carregarInformacoesDosProdutos(receita.ingredientes);
    });
  }

  public construirObjetoReceita(): Receita {
    return {
      ...this.receitaOriginal, // Preserva os valores originais
      ...this.formulario.value, // Sobrescreve apenas os campos editados
      ingredientes: this.ingredientes,
      tags: this.tagsSelecionadas,
      imagens: this.imagemId ? [this.imagemId] : [], // Apenas os IDs das imagens se existir
    };
  }

  public salvarReceita(): void {
    if (this.formulario.valid) {
      const receitaAtualizada = this.construirObjetoReceita();

      this.modalCalculoLucro.atribuirReceita(receitaAtualizada);
      receitaAtualizada.valor_recomendado = this.modalCalculoLucro.calcularCustoPorUnidade;

      if (this.receitaId) {
        this.receitasService.editarReceita(receitaAtualizada).subscribe(() => {
          this.router.navigate(['/receitas']);
        });
      } else {
        this.receitasService.criarReceita(receitaAtualizada).subscribe(() => {
          this.router.navigate(['/receitas']);
        });
      }
    }
  }

  public onAdicionarImagem(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image_file', file);
      formData.append('nome_arquivo', file.name);
      formData.append('id_tipo_imagem', '2');
      formData.append('is_publico', '1');

      this.imagensService.criarImagem(formData).subscribe((res) => {
        this.imagemId = res.imagem.id;
        this.carregarImagemUrl(this.imagemId);
      });
    }
  }

  private carregarImagemUrl(id: number): void {
    this.imagensService.viewImagem(id).subscribe((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemUrl = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
  }

  onExcluirIngrediente(index: number): void {
    this.ingredientes.splice(index, 1);
  }

  onEditarIngrediente(index: number): void {
    const ingrediente = this.ingredientes[index];
    this.ingredienteSendoAdicionado = { ...ingrediente };
    this.modalDetalhesProduto.abrirModal({
      quantidade: Number(ingrediente.quantidade),
      unidade_medida: ingrediente.unidade,
      observacao: ingrediente.observacoes || '',
    });
  }

  onSelecionarProduto(produto: Material): void {
    this.ingredienteSendoAdicionado = {
      id_produto: produto.id,
      produto: produto,
    };

    this.modalDetalhesProduto.abrirModal();
  }

  public onConfirmarDetalhesIngrediente(ingrediente: DetalhesProduto): void {
    if (this.ingredienteSendoAdicionado) {
      const index = this.ingredientes.findIndex((ing) => ing.id_produto === this.ingredienteSendoAdicionado?.id_produto);

      if (index !== -1) {
        this.ingredientes[index] = {
          id_produto: this.ingredienteSendoAdicionado.id_produto!,
          produto: this.ingredienteSendoAdicionado.produto,
          quantidade: String(ingrediente.quantidade),
          unidade: ingrediente.unidade_medida,
          observacoes: ingrediente.observacao || '',
        };
      } else {
        this.ingredientes.push({
          id_produto: this.ingredienteSendoAdicionado.id_produto!,
          produto: this.ingredienteSendoAdicionado.produto,
          quantidade: String(ingrediente.quantidade),
          unidade: ingrediente.unidade_medida,
          observacoes: ingrediente.observacao || '',
        });
      }

      this.ingredienteSendoAdicionado = undefined;
    }
  }

  public onTagsSelecionadas(tags: ReceitaTag[]): void {
    this.tagsSelecionadas = tags;
  }
}
