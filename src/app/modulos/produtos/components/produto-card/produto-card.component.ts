import { Component, Input } from '@angular/core';
import { Material } from 'src/app/models/material.model';

@Component({
  selector: 'app-produto-card',
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.css']
})
export class ProdutoCardComponent {
  @Input() produto!: Material;
}
