import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarListaDeComprasComponent } from './pages/listar-lista-de-compras/listar-lista-de-compras.component';
import { ListaDeComprasPorReceitaComponent } from './pages/lista-de-compras-por-receita/lista-de-compras-por-receita.component';
import { HistoricoDeComprasComponent } from './pages/historico-de-compras/historico-de-compras.component';
import { FormListaDeComprasComponent } from './pages/form-lista-de-compras/form-lista-de-compras.component';

const routes: Routes = [
  { path: '', component: ListarListaDeComprasComponent },
  { path: 'form-lista-de-compras', component: FormListaDeComprasComponent },
  { path: 'form-lista-de-compras/:id', component: FormListaDeComprasComponent },
  { path: 'lista-por-receita', component: ListaDeComprasPorReceitaComponent },
  { path: 'historico-de-compras', component: HistoricoDeComprasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDeComprasRoutingModule {}
