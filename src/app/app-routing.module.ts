import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './compartilhado/components/base/base.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modulos/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '', component: BaseComponent, canActivate: [authGuard], children: [
      { path: 'materiais', loadChildren: () => import('./modulos/material/material.module').then(m => m.MaterialModule) },
      { path: 'receitas', loadChildren: () => import('./modulos/receitas/receitas.module').then(m => m.ReceitasModule) },
      { path: 'lista-de-compras', loadChildren: () => import('./modulos/lista-de-compras/lista-de-compras.module').then(m => m.ListaDeComprasModule) },
      { path: 'produtos', loadChildren: () => import('./modulos/produtos/produtos.module').then(m => m.ProdutosModule) },
      { path: 'categorias', loadChildren: () => import('./modulos/categorias/categorias.module').then(m => m.CategoriasModule) },
    ]
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
