import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './compartilhado/components/base/base.component';
import { LoginComponent } from './modulos/login/components/login/login.component';
import { CadastrarComponent } from './modulos/cadastrar/cadastrar.component';
import { CadastroAdminComponent } from './modulos/cadastro-admin/cadastro-admin.component';

const routes: Routes = [
  { path: 'entrar', component: LoginComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'cadastro-admin', component: CadastroAdminComponent },
  {
    path: '', component: BaseComponent, children: [
      { path: 'materiais', loadChildren: () => import('./modulos/material/material.module').then(m => m.MaterialModule) },
      { path: 'receitas', loadChildren: () => import('./modulos/receitas/receitas.module').then(m => m.ReceirasModule) },
      { path: 'lista-de-compras', loadChildren: () => import('./modulos/lista-de-compras/lista-de-compras.module').then(m => m.ListaDeComprasModule) },
    ]
  },
  { path: '**', redirectTo: 'entrar' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
