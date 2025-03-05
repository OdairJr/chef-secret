import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CabecalhoComponent } from './compartilhado/components/cabecalho/cabecalho.component';
import { BaseComponent } from './compartilhado/components/base/base.component';
import { LoginModule } from './modulos/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
