import { Component, Input } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-produto-card',
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.css']
})
export class ProdutoCardComponent {
  @Input() produto!: Produto;
}