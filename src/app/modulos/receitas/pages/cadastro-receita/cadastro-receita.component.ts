import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceitasService } from '../../services/receitas.service';
import { Ingrediente, Receita } from 'src/app/models/receita.model';
import { Produto } from 'src/app/models/produto.model';
import { ViewChild } from '@angular/core';
import { ModalDetalhesProdutoComponent } from '../../components/modal-detalhes-produto/modal-detalhes-produto.component';

@Component({
  selector: 'app-cadastro-receita',
  templateUrl: './cadastro-receita.component.html',
  styleUrls: ['./cadastro-receita.component.css'],
})
export class CadastroReceitaComponent implements OnInit {
  mostrarModal: boolean = false;
  formulario!: FormGroup;

  @ViewChild('modal_detalhes_produto')
  modalDetalhesProduto!: ModalDetalhesProdutoComponent;

  public ingredientes: Ingrediente[] = [];
  public ingredienteSendoAdicionado?: Partial<Ingrediente>;

  constructor(
    private formBuilder: FormBuilder,
    private receitasService: ReceitasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descricao: [''],
      rendimento: [''],
      tempo_preparo: [''],
    });
  }

  public salvarReceita(): void {
    if (this.formulario.valid) {
      const novaReceita: Receita = this.formulario.value;
      this.receitasService.criarReceita(novaReceita).subscribe(() => {
        this.router.navigate(['/receitas']);
      });
    }
  }

  onExcluirIngrediente($event: number) {
    throw new Error('Method not implemented.');
  }
  onEditarIngrediente($event: number) {
    throw new Error('Method not implemented.');
  }

  onSelecionarProduto(produto: Produto) {
    this.ingredienteSendoAdicionado = {
      id_produto: produto.id,
      produto: produto,
    };

    this.modalDetalhesProduto.abrirModal();
  }

  public onConfirmarDetalhesIngrediente(
    ingrediente: Omit<Ingrediente, 'produto_id'>
  ) {
    if (this.ingredienteSendoAdicionado) {
      this.ingredientes.push({
        ...this.ingredienteSendoAdicionado,
        ...ingrediente,
      });
      this.ingredienteSendoAdicionado = undefined;
    }
  }
}
