import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutosService } from 'src/app/modulos/produtos/services/produtos.service';

@Component({
  selector: 'app-modal-selecao-produto',
  templateUrl: './modal-selecao-produto.component.html',
  styleUrls: ['./modal-selecao-produto.component.css']
})
export class ModalSelecaoProdutoComponent {
  public mostrarModal: boolean = false;

  produtos: Produto[] = [];

  @Output() produtoSelecionado = new EventEmitter<Produto>();
  @Output() fecharModal = new EventEmitter<void>();

  constructor(private produtosService: ProdutosService) {}

  public abrirModal() {
     this.produtosService.listarProdutos().subscribe(produtos => {
      this.produtos = produtos;
      this.mostrarModal = true;
    });
  }

  selecionarProduto(produto: Produto) {
    this.mostrarModal = false;
    this.produtoSelecionado.emit(produto);
  }

  fechar() {
    this.mostrarModal = false;
    this.fecharModal.emit();
  }
}
