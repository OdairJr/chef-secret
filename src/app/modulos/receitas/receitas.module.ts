import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReceitasRoutingModule } from './receitas-routing.module';
import { ListagemReceitasComponent } from './pages/listagem-receitas/listagem-receitas.component';
import { ListaIngredientesComponent } from './components/lista-ingredientes/lista-ingredientes.component';
import { ListaEtapasComponent } from './components/lista-etapas/lista-etapas.component';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';
import { FormReceitaComponent } from './pages/form-receita/form-receita.component';
import { TagSelectorComponent } from './components/tag-selector/tag-selector.component';


@NgModule({
  declarations: [
    ListagemReceitasComponent,
    ListaIngredientesComponent,
    ListaEtapasComponent,
    FormReceitaComponent,
    TagSelectorComponent
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
