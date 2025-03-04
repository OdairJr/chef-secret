import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';

const routes: Routes = [
  {
    path: 'chef-price', component: BaseComponent, children: [
      { path: 'material', loadChildren: () => import('./material/material.module').then(m => m.MaterialModule) },
      { path: 'receita', loadChildren: () => import('./receitas/receitas.module').then(m => m.ReceirasModule) },
      { path: 'compras', loadChildren: () => import('./lista-de-compras/lista-de-compras.module').then(m => m.ListaDeComprasModule) },]
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '**', redirectTo: 'login' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
