import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemReceitasComponent } from './pages/listagem-receitas/listagem-receitas.component';
import { CadastroReceitaComponent } from './pages/cadastro-receita/cadastro-receita.component';
import { EditarReceitaComponent } from './pages/editar-receita/editar-receita.component';

const routes: Routes = [
  { path: '', component: ListagemReceitasComponent },
  { path: 'cadastro', component: CadastroReceitaComponent },
  { path: 'editar/:id', component: EditarReceitaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceitasRoutingModule {}
