import { Component } from '@angular/core';
import { Etapa } from 'src/app/models/receita.model';

@Component({
  selector: 'app-lista-etapas',
  templateUrl: './lista-etapas.component.html',
  styleUrls: ['./lista-etapas.component.scss'],
})
export class ListaEtapasComponent {
  // etapas: Etapa[] = [];
  adicionandoEtapa = false;
  novaEtapa = '';

  adicionarEtapa() {
    this.adicionandoEtapa = true;
    this.novaEtapa = '';
  }

  confirmarAdicionarEtapa() {
    // if (this.novaEtapa.trim()) {
    //   const numero_etapa = this.etapas.length + 1;
    //   this.etapas.push({
    //     numero_etapa,
    //     instrucoes: this.novaEtapa.trim(),
    //   });
    // }
    this.adicionandoEtapa = false;
    this.novaEtapa = '';
  }

  cancelarAdicionarEtapa() {
    this.adicionandoEtapa = false;
    this.novaEtapa = '';
  }

  excluirEtapa(index: number) {
    // this.etapas.splice(index, 1);
    // // Atualiza os números das etapas após exclusão
    // this.etapas.forEach((etapa, i) => etapa.numero_etapa = i + 1);
  }
}
