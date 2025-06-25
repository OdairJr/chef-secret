import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './compartilhado/components/base/base.component';
import { authGuard } from './core/guards/auth.guard';
import { EmailConfirmadoComponent } from './modulos/usuario/pages/email-confirmado/email-confirmado.component';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modulos/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'email-confirmado',
    component: EmailConfirmadoComponent
  },
  {
    path: '', component: BaseComponent, canActivate: [authGuard], children: [
      { path: 'receitas', loadChildren: () => import('./modulos/receitas/receitas.module').then(m => m.ReceitasModule) },
      { path: 'lista-de-compras', loadChildren: () => import('./modulos/lista-de-compras/lista-de-compras.module').then(m => m.ListaDeComprasModule) },
      { path: 'historico-de-compras', loadChildren: () => import('./modulos/historico-compra/historico-compra.module').then(m => m.HistoricoCompraModule) },
      { path: 'materiais', loadChildren: () => import('./modulos/produtos/produtos.module').then(m => m.ProdutosModule), canActivate: [adminGuard] },
      { path: 'categorias', loadChildren: () => import('./modulos/categorias/categorias.module').then(m => m.CategoriasModule), canActivate: [adminGuard] },
      { path: 'usuarios', loadChildren: () => import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule), canActivate: [adminGuard] },
    ]
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
