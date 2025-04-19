import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaCardComponent } from './components/categoria-card/categoria-card.component';
import { CategoriaDetalhesComponent } from './components/categoria-detalhes/categoria-detalhes.component';
import { ListagemCategoriasComponent } from './pages/listagem-categorias/listagem-categorias.component';
import { CadastroCategoriaComponent } from './pages/cadastro-categoria/cadastro-categoria.component';
import { EditarCategoriaComponent } from './pages/editar-categoria/editar-categoria.component';


@NgModule({
  declarations: [
    CategoriaCardComponent,
    CategoriaDetalhesComponent,
    ListagemCategoriasComponent,
    CadastroCategoriaComponent,
    EditarCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class CategoriasModule { }
