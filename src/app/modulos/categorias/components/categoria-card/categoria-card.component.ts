import { Component, Input } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-categoria-card',
  templateUrl: './categoria-card.component.html',
  styleUrls: ['./categoria-card.component.scss']
})
export class CategoriaCardComponent {
  @Input() categoria!: Categoria;
}
