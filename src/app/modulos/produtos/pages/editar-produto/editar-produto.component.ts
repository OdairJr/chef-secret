import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { Produto } from 'src/app/models/produto.model';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
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
      codigoBarra: ['', [Validators.required, Validators.maxLength(100)]],
      idCategoria: ['', Validators.required],
      unidadeMedida: ['', [Validators.required, Validators.maxLength(50)]]
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
        this.formulario.patchValue(produto);
      }
    });
  }

  public salvarProduto(): void {
    if (this.formulario.valid) {
      const produtoAtualizado: Produto = {
        id: this.produtoId,
        ...this.formulario.value
      };
      this.produtosService.editarProduto(produtoAtualizado).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    }
  }
}