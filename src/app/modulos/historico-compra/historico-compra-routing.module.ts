
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaHistoricoComponent } from './pages/lista-historico/lista-historico.component';

const routes: Routes = [
  { path: '', component: ListaHistoricoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricoCompraRoutingModule {}
