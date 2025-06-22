
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeUsuariosComponent } from './pages/lista-de-usuarios/lista-de-usuarios.component';

const routes: Routes = [
  { path: '', component: ListaDeUsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
