import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemReceitasComponent } from './pages/listagem-receitas/listagem-receitas.component';
import { EditarReceitaComponent } from './pages/editar-receita/editar-receita.component';
import { FormReceitaComponent } from './pages/form-receita/form-receita.component';

const routes: Routes = [
  { path: '', component: ListagemReceitasComponent },
  { path: 'nova-receita', component: FormReceitaComponent },
  { path: 'editar-receita/:id', component: FormReceitaComponent },
  { path: 'editar/:id', component: EditarReceitaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceitasRoutingModule {}
