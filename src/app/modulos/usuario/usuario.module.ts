import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { ListaDeUsuariosComponent } from './pages/lista-de-usuarios/lista-de-usuarios.component';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
  declarations: [PerfilUsuarioComponent, ListaDeUsuariosComponent],
  imports: [CommonModule, UsuarioRoutingModule],
})
export class UsuarioModule {}
