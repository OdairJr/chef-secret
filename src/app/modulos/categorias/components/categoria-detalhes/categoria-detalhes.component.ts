import { Component, Input } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-categoria-detalhes',
  templateUrl: './categoria-detalhes.component.html',
  styleUrls: ['./categoria-detalhes.component.scss']
})
export class CategoriaDetalhesComponent {
  @Input() categoria!: Categoria;
}
