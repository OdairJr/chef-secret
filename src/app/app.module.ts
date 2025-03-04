import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CriarReceitaComponent } from './receitas/components/criar-receita/criar-receita.component';
import { EditarReceitaComponent } from './receitas/components/editar-receita/editar-receita.component';
import { ExcluirReceitaComponent } from './receitas/components/excluir-receita/excluir-receita.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LoginComponent } from './login/components/login/login.component';
import { BaseComponent } from './base/base.component';




@NgModule({
  declarations: [
    AppComponent,
    CriarReceitaComponent,
    EditarReceitaComponent,
    ExcluirReceitaComponent,
    CabecalhoComponent,
    BaseComponent,
    
  
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
