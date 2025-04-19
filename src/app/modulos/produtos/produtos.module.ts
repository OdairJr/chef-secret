import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemProdutosComponent } from './pages/listagem-produtos/listagem-produtos.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { HistoricoPrecosComponent } from './pages/historico-precos/historico-precos.component';
import { ProdutoCardComponent } from './components/produto-card/produto-card.component';
import { ProdutoDetalhesComponent } from './components/produto-detalhes/produto-detalhes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { EditarProdutoComponent } from './pages/editar-produto/editar-produto.component';

@NgModule({
  declarations: [
    ListagemProdutosComponent,
    CadastroProdutoComponent,
    HistoricoPrecosComponent,
    ProdutoCardComponent,
    ProdutoDetalhesComponent,
    EditarProdutoComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class ProdutosModule { }
