import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaHistoricoComponent } from './pages/lista-historico/lista-historico.component';
import { HistoricoCompraRoutingModule } from './historico-compra-routing.module';

@NgModule({
  declarations: [
    ListaHistoricoComponent
  ],
  imports: [
    CommonModule,
    HistoricoCompraRoutingModule
  ]
})
export class HistoricoCompraModule { }
