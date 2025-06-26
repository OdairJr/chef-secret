import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaDeComprasService } from '../../services/lista-de-compras.service';
import { ItemDaLista } from 'src/app/models/lista-de-compras.model';
import { Material } from 'src/app/models/material.model';
import { Ingrediente, Receita } from 'src/app/models/receita.model';
import { ProdutosService } from 'src/app/modulos/produtos/services/produtos.service';
import { firstValueFrom, forkJoin, map } from 'rxjs';
import { ModalDetalhesProdutoComponent, DetalhesProduto } from 'src/app/compartilhado/components/modal-detalhes-produto/modal-detalhes-produto.component';

@Component({
  selector: 'app-form-lista-de-compras',
  templateUrl: './form-lista-de-compras.component.html',
  styleUrls: ['./form-lista-de-compras.component.scss'],
})
export class FormListaDeComprasComponent implements OnInit {
  @ViewChild('modal_detalhes_produto')
  modalDetalhesProduto!: ModalDetalhesProdutoComponent;

  formularioCompras!: FormGroup;
  listaId: string | null = null;
  notasFiscais: File[] = [];
  itens: ItemDaLista[] = [];
  public ingredienteSendoAdicionado?: Partial<Ingrediente>;
  carregando = false;

  constructor(
    private formBuilder: FormBuilder,
    private listaDeComprasService: ListaDeComprasService,
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) {
    this.formularioCompras = this.formBuilder.group({
      nome_lista: ['', [Validators.required, Validators.maxLength(30)]],
      descricao: ['', [Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.listaId = params['id'] || null;
      if (this.listaId) {
        this.carregarLista(this.listaId);
      }
    });
  }

  private carregarInformacoesDosProdutos(produtos: ItemDaLista[]): void {
    const requisicoes = produtos.map((produto) =>
      this.produtosService.obterProdutoPorId(produto.id_produto).pipe(
        map((produto) => ({
          ...produto,
          produto,
        }))
      )
    );

    forkJoin(requisicoes).subscribe((ingredientesComProdutos) => {
      this.itens = ingredientesComProdutos.map((ingredienteComProduto, idx) => {
        // Recupera o produto original da lista para pegar id_produto e unidade
        const original = produtos[idx];
        return {
          ...original,
          produto: ingredienteComProduto.produto,
          id_produto: original.id_produto,
          unidade_medida: original.unidade_medida,
          quantidade: original.quantidade,
          comprado: original.comprado,
        } as ItemDaLista;
      });
    });
  }

  private carregarLista(id: string): void {
    this.carregando = true;
    this.listaDeComprasService.buscarListaPorId(id).subscribe((lista) => {
      if (lista) {
        this.formularioCompras.patchValue({ nome_lista: lista.nome_lista, descricao: lista.descricao });
        this.itens = lista.itens || [];

        this.carregarInformacoesDosProdutos(lista.itens!);
        this.carregando = false;
      }
    });
  }

  public salvarLista(): void {
    if (this.formularioCompras.invalid) {
      this.formularioCompras.markAllAsTouched();
      return;
    }

    this.carregando = true;
    const lista = {
      nome_lista: this.formularioCompras.value.nome_lista,
      descricao: this.formularioCompras.value.descricao,
      itens: this.itens,
      // notasFiscais: this.notasFiscais,
    };

    // console.log(JSON.stringify(lista));

    if (this.listaId) {
      this.listaDeComprasService.atualizarLista(this.listaId, lista).subscribe(() => {
        this.carregando = false;
        this.router.navigate(['/lista-de-compras']);
      });
    } else {
      this.listaDeComprasService.criarLista(lista).subscribe(() => {
        this.carregando = false;

        this.router.navigate(['/lista-de-compras']);
      });
    }
  }

  public removerItem(index: number): void {
    this.itens.splice(index, 1);
  }

  public adicionarItem(item: ItemDaLista): void {
    this.itens.push({
      comprado: false,
      ...item,
    } as ItemDaLista);
  }

  onSelecionarMaterial(material: Material): void {
    this.ingredienteSendoAdicionado = {
      id_produto: material.id,
      produto: material,
    };

    this.modalDetalhesProduto.abrirModal();
  }

  cancelar(): void {
    this.router.navigate(['/lista-de-compras']);
  }

  onNotaFiscalSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => this.notasFiscais.push(file));
    }
  }

  removerNotaFiscal(nota: File): void {
    this.notasFiscais = this.notasFiscais.filter((n) => n !== nota);
  }

  async onSelecionarReceita(receita: Receita) {
    if (receita.ingredientes && Array.isArray(receita.ingredientes)) {
      for (const ingrediente of receita.ingredientes) {
        const material = await this.buscarMaterialPorId(ingrediente.id_produto);
        if (material) {
          this.adicionarItem({
            id_produto: material.id,
            produto: material,
            quantidade: Number(ingrediente.quantidade),
            observacao: ingrediente.observacoes || '',
            unidade_medida: material.unidade_medida!,
          });
        }
      }
    }
  }

  private async buscarMaterialPorId(id: number): Promise<Material | null | undefined> {
    try {
      const material = await firstValueFrom(this.produtosService.obterProdutoPorId(id));

      return material;
    } catch (error) {
      console.error(`Erro ao buscar material com ID ${id}:`, error);
      return null;
    }
  }

  public onConfirmarDetalhesIngrediente(ingrediente: DetalhesProduto): void {
    if (this.ingredienteSendoAdicionado) {
      const index = this.itens.findIndex((item) => item.produto?.id === this.ingredienteSendoAdicionado?.id_produto);

      const itemDaLista: ItemDaLista = {
        id_produto: this.ingredienteSendoAdicionado.id_produto!,
        produto: this.ingredienteSendoAdicionado.produto,
        unidade_medida: ingrediente.unidade_medida,
        quantidade: ingrediente.quantidade,
        observacao: ingrediente.observacao,
        comprado: false,
      };

      if (index !== -1) {
        this.itens[index] = itemDaLista;
      } else {
        this.adicionarItem(itemDaLista);
      }

      this.ingredienteSendoAdicionado = undefined;
    }
  }
}
