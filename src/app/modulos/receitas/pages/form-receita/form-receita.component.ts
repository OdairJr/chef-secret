import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitasService } from '../../services/receitas.service';
import { Ingrediente, Receita } from 'src/app/models/receita.model';
import { Material } from 'src/app/models/material.model';
import { ModalDetalhesProdutoComponent } from '../../components/modal-detalhes-produto/modal-detalhes-produto.component';

@Component({
  selector: 'app-form-receita',
  templateUrl: './form-receita.component.html',
  styleUrls: ['./form-receita.component.css'],
})
export class FormReceitaComponent implements OnInit {
  formulario!: FormGroup;
  receitaId: number | null = null;
  public ingredientes: Ingrediente[] = [];
  public ingredienteSendoAdicionado?: Partial<Ingrediente>;

  @ViewChild('modal_detalhes_produto')
  modalDetalhesProduto!: ModalDetalhesProdutoComponent;

  constructor(
    private formBuilder: FormBuilder,
    private receitasService: ReceitasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descricao: [''],
      rendimento: [''],
      tempo_preparo: [''],
    });

    this.receitaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.receitaId) {
      this.carregarReceita(this.receitaId);
    }
  }

  private carregarReceita(id: number): void {
    this.receitasService.obterReceitaPorId(id).subscribe((receita: Receita) => {
      this.formulario.patchValue(receita);
      this.ingredientes = receita.ingredientes;
    });
  }

  public salvarReceita(): void {
    if (this.formulario.valid) {
      const receita: Receita = {
        ...this.formulario.value,
        ingredientes: this.ingredientes,
      };

      if (this.receitaId) {
        this.receitasService
          .editarReceita(receita)
          .subscribe(() => {
            this.router.navigate(['/receitas']);
          });
      } else {
        this.receitasService.criarReceita(receita).subscribe(() => {
          this.router.navigate(['/receitas']);
        });
      }
    }
  }

  onExcluirIngrediente(index: number): void {
    this.ingredientes.splice(index, 1);
  }

  onEditarIngrediente(index: number): void {
    const ingrediente = this.ingredientes[index];
    this.ingredienteSendoAdicionado = { ...ingrediente };
    this.modalDetalhesProduto.abrirModal();
  }

  onSelecionarProduto(produto: Material): void {
    this.ingredienteSendoAdicionado = {
      id_produto: produto.id,
      produto: produto,
    };

    this.modalDetalhesProduto.abrirModal();
  }

  public onConfirmarDetalhesIngrediente(
    ingrediente: Omit<Ingrediente, 'produto_id'>
  ): void {
    if (this.ingredienteSendoAdicionado) {
      const index = this.ingredientes.findIndex(
        (ing) => ing.id_produto === this.ingredienteSendoAdicionado?.id_produto
      );

      if (index !== -1) {
        this.ingredientes[index] = {
          ...this.ingredienteSendoAdicionado,
          ...ingrediente,
        };
      } else {
        this.ingredientes.push({
          ...this.ingredienteSendoAdicionado,
          ...ingrediente,
        });
      }

      this.ingredienteSendoAdicionado = undefined;
    }
  }
}
