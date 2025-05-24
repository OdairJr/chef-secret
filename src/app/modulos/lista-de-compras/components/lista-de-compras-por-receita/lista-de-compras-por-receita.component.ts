import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// TODO - Verificar se é possível não ter dependencia entre os módulos
// import { Receita } from 'src/app/modulos/receitas/models/receita.model';
// import { ReceitaService } from 'src/app/modulos/receitas/services/receita.service';

@Component({
  selector: 'app-lista-de-compras-por-receita',
  templateUrl: './lista-de-compras-por-receita.component.html',
  styleUrls: ['./lista-de-compras-por-receita.component.css']
})
export class ListaDeComprasPorReceitaComponent implements OnInit {
  // listaDeReceitas: Receita[] = []

  constructor(
    // private receitaservice: ReceitaService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.listarReceitas();
  }

  private listarReceitas(): void {
    // this.receitaservice.listarReceitas().subscribe(receita => {
    //   this.listaDeReceitas = receita
    // })
  }

  public adicionarItensDaReceita(id: string) {
    console.log('adicionarItensDaReceita', id);
    this.router.navigate(['compras/criar-lista-de-compras', id])
    console.log("additem", id)

  }
}
