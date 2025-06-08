import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReceitasRoutingModule } from './receitas-routing.module';
import { ListagemReceitasComponent } from './pages/listagem-receitas/listagem-receitas.component';
import { CadastroReceitaComponent } from './pages/cadastro-receita/cadastro-receita.component';
import { EditarReceitaComponent } from './pages/editar-receita/editar-receita.component';
import { ModalDetalhesProdutoComponent } from './components/modal-detalhes-produto/modal-detalhes-produto.component';
import { ListaIngredientesComponent } from './components/lista-ingredientes/lista-ingredientes.component';
import { ListaEtapasComponent } from './components/lista-etapas/lista-etapas.component';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';


@NgModule({
  declarations: [
    ListagemReceitasComponent,
    CadastroReceitaComponent,
    EditarReceitaComponent,
    ModalDetalhesProdutoComponent,
    ListaIngredientesComponent,
    ListaEtapasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReceitasRoutingModule,
    CompartilhadoModule
  ]
})
export class ReceitasModule { }
