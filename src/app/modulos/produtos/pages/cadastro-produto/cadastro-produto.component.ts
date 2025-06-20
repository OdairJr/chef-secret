import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { Material } from 'src/app/models/material.model';
import { ProdutosService } from '../../services/produtos.service';
import { CategoriaService } from '../../../categorias/services/categoria.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {
  formulario!: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      codigo_barra: ['', [Validators.required, Validators.maxLength(100)]],
      id_categoria: ['', Validators.required],
      unidade_medida: ['', [Validators.required, Validators.maxLength(50)]],
      quantidade_embalagem: ['', [Validators.required]]
    });

    this.carregarCategorias();
  }

  private carregarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  public salvarProduto(): void {
    if (this.formulario.valid) {
      const novoProduto: Material = this.formulario.value;
      this.produtosService.criarProduto(novoProduto).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    }
  }
}
