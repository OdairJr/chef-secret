import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface UnidadeMedida {
  codigo: string;
  nome: string;
}

@Component({
  selector: 'app-unidade-medida-dropdown',
  templateUrl: './unidade-medida-dropdown.component.html',
  styleUrls: ['./unidade-medida-dropdown.component.scss']
})
export class UnidadeMedidaDropdownComponent implements OnInit {
  @Input() control!: any;
  @Input() label: string = 'Unidade de Medida';
  @Input() placeholder: string = 'Selecione';

  unidades: UnidadeMedida[] = [
    { codigo: 'g', nome: 'grama' },
    { codigo: 'kg', nome: 'quilograma' },
    { codigo: 'mg', nome: 'miligrama' },
    { codigo: 'ml', nome: 'mililitro' },
    { codigo: 'l', nome: 'litro' },
    { codigo: 'un', nome: 'unidade' },
    { codigo: 'dz', nome: 'dúzia' },
    { codigo: 'pct', nome: 'pacote' },
    { codigo: 'cx', nome: 'caixa' },
    { codigo: 'colher_cha', nome: 'colher de chá' },
    { codigo: 'colher_sopa', nome: 'colher de sopa' },
    { codigo: 'xicara', nome: 'xícara' },
    { codigo: 'pitada', nome: 'pitada' }
  ];

  ngOnInit(): void {
    if (!this.control) {
      throw new Error('O FormControl deve ser passado como input para o componente.');
    }
  }
}
