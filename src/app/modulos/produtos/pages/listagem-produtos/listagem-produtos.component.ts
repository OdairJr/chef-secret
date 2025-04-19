import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutosService } from '../../services/produtos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css']
})
export class ListagemProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtosService: ProdutosService, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  private carregarProdutos(): void {
    this.produtosService.listarProdutos().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  public adicionarProduto(): void {
    this.router.navigate(['/produtos/cadastro']);
  }

  // crie a funcao excluir produto
  public excluirProduto(produtoId: number): void {
    this.produtosService.excluirProduto(produtoId).subscribe(() => {
      this.carregarProdutos();
    });
  }

}