import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemCategoriasComponent } from './pages/listagem-categorias/listagem-categorias.component';
import { CadastroCategoriaComponent } from './pages/cadastro-categoria/cadastro-categoria.component';
import { EditarCategoriaComponent } from './pages/editar-categoria/editar-categoria.component';
import { CategoriaDetalhesComponent } from './components/categoria-detalhes/categoria-detalhes.component';

const routes: Routes = [
  { path: '', component: ListagemCategoriasComponent },
  { path: 'cadastro', component: CadastroCategoriaComponent },
  { path: 'editar/:id', component: EditarCategoriaComponent },
  { path: 'detalhes/:id', component: CategoriaDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
