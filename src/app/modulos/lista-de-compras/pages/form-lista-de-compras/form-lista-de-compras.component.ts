import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaDeComprasService } from '../../services/lista-de-compras.service';
import { ItemDaLista } from 'src/app/models/itens-da-lista.model';
import { Material } from 'src/app/models/material.model';
import { Ingrediente, Receita } from 'src/app/models/receita.model';
import { ProdutosService } from 'src/app/modulos/produtos/services/produtos.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-lista-de-compras',
  templateUrl: './form-lista-de-compras.component.html',
  styleUrls: ['./form-lista-de-compras.component.css'],
})
export class FormListaDeComprasComponent implements OnInit {
  formularioCompras!: FormGroup;
  listaId: string | null = null;
  notasFiscais: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private listaDeComprasService: ListaDeComprasService,
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) {
    this.formularioCompras = this.formBuilder.group({
      nomeLista: ['', [Validators.required, Validators.maxLength(30)]],
      itens: this.formBuilder.array([]),
      notasFiscais: [[]],
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

  get itens(): FormArray {
    return this.formularioCompras.get('itens') as FormArray;
  }

  private carregarLista(id: string): void {
    this.listaDeComprasService.buscarListaPorId(id).subscribe((lista) => {
      if (lista) {
        this.formularioCompras.patchValue({ nomeLista: lista.nomeLista });
        lista.itens?.forEach((item) => this.adicionarItem(item));
      }
    });
  }

  public salvarLista(): void {
    if (this.formularioCompras.invalid) {
      this.formularioCompras.markAllAsTouched();
      return;
    }

    const lista = {
      nomeLista: this.formularioCompras.value.nomeLista,
      itens: this.formularioCompras.value.itens,
      notasFiscais: this.notasFiscais,
    };

    if (this.listaId) {
      this.listaDeComprasService
        .atualizarLista(this.listaId, lista)
        .subscribe(() => {
          this.router.navigate(['/lista-de-compras']);
        });
    } else {
      this.listaDeComprasService.criarLista(lista).subscribe(() => {
        this.router.navigate(['/lista-de-compras']);
      });
    }
  }

  public removerItem(index: number): void {
    this.itens.removeAt(index);
  }

  public adicionarItem(item: Partial<ItemDaLista> = {}): void {
    const itemForm = this.formBuilder.group({
      comprado: [item.comprado || false],
      materialRelacionado: [item.materialRelacionado || null],
      quantidade: [
        item.quantidade || 1,
        [Validators.required, Validators.min(1)],
      ],
      valor: [item.valor || 0, [Validators.required, Validators.min(0)]],
    });
    this.itens.push(itemForm);
  }

  onSelecionarMaterial(material: Material): void {
    this.adicionarItem({
      materialRelacionado: material,
      quantidade: 1,
      valor: 0,
    });
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
            materialRelacionado: material,
            quantidade: 1,
            valor: 0,
          });
        }
      }
    }
  }

  private async buscarMaterialPorId(
    id: number
  ): Promise<Material | null | undefined> {
    try {
      const material = await firstValueFrom(
        this.produtosService.obterProdutoPorId(id)
      );

      return material;
    } catch (error) {
      console.error(`Erro ao buscar material com ID ${id}:`, error);
      return null;
    }
  }
}
