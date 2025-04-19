import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemProdutosComponent } from './pages/listagem-produtos/listagem-produtos.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { EditarProdutoComponent } from './pages/editar-produto/editar-produto.component';
import { ProdutoDetalhesComponent } from './components/produto-detalhes/produto-detalhes.component';

const routes: Routes = [
  { path: '', component: ListagemProdutosComponent },
  { path: 'cadastro', component: CadastroProdutoComponent },
  { path: 'editar/:id', component: EditarProdutoComponent },
  { path: 'detalhes/:id', component: ProdutoDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
