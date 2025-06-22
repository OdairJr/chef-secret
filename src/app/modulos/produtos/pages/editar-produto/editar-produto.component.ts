import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { Material } from 'src/app/models/material.model';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {
  formulario!: FormGroup;
  categorias: Categoria[] = [];
  produtoId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtoId = Number(this.route.snapshot.paramMap.get('id'));
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      codigo_barra: ['', [Validators.required, Validators.maxLength(100)]],
      id_categoria: ['', Validators.required],
      unidade_medida: ['', [Validators.required, Validators.maxLength(50)]],
      quantidade: [0, [Validators.required, Validators.min(0)]],
      preco_padrao: [0, [Validators.required, Validators.min(0)]],
    });

    this.carregarCategorias();
    this.carregarProduto();
  }

  private carregarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  private carregarProduto(): void {
    this.produtosService.obterProdutoPorId(this.produtoId).subscribe((produto) => {
      if (produto) {
        this.formulario.patchValue({
          ...produto,
          quantidade: Number(produto.quantidade)
        });
      }
    });
  }

  public salvarProduto(): void {
    if (this.formulario.valid) {
      const produtoAtualizado: Material = {
        id: this.produtoId,
        ...this.formulario.value
      };

      this.produtosService.editarProduto(produtoAtualizado).subscribe(() => {
        this.router.navigate(['/materiais']);
      });
    }
  }
}
