import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaDeComprasRoutingModule } from './lista-de-compras-routing.module';
import { ListarListaDeComprasComponent } from './pages/listar-lista-de-compras/listar-lista-de-compras.component';
import { ListaDeComprasPorReceitaComponent } from './pages/lista-de-compras-por-receita/lista-de-compras-por-receita.component';
import { HistoricoDeComprasComponent } from './pages/historico-de-compras/historico-de-compras.component';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';
import { FormListaDeComprasComponent } from './pages/form-lista-de-compras/form-lista-de-compras.component';

@NgModule({
  declarations: [
    ListarListaDeComprasComponent,
    ListaDeComprasPorReceitaComponent,
    HistoricoDeComprasComponent,
    FormListaDeComprasComponent,
  ],
  imports: [
    CommonModule,
    ListaDeComprasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CompartilhadoModule
  ],
})
export class ListaDeComprasModule {}
