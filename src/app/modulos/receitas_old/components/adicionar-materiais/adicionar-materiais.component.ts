import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceitaService } from '../../services/receita.service';

// TODO - Verificar se é possível não ter dependencia entre os módulos
import { Material } from 'src/app/modulos/material/models/material.model';
import { MaterialService } from 'src/app/modulos/material/services/material.service';

@Component({
  selector: 'app-adicionar-materiais',
  templateUrl: './adicionar-materiais.component.html',
  styleUrls: ['./adicionar-materiais.component.scss']
})
export class AdicionarMateriaisComponent implements OnInit {

  public listaMateriais: Material[] = [];

  constructor(private materialService: MaterialService,
    private receitaService: ReceitaService,
    private router: Router,
  ) {

  }

  public ngOnInit(): void {
    this.listarMateriais();
  }

  private listarMateriais(): void {
    this.materialService.listarMateriais().subscribe((listaMateriais) => {
      this.listaMateriais = listaMateriais;

      this.preencherMateriaisSelecionadosDaTela();
    });
  }

  private preencherMateriaisSelecionadosDaTela(): void {
    this.listaMateriais.forEach(materialDaTela => {
      const materialComIdIgualAoDaTela = this.receitaService.selecionados?.find(materialSelecionado => materialSelecionado.id === materialDaTela.id);
      const materialExiste = materialComIdIgualAoDaTela !== undefined;

      materialDaTela.selecionado = materialExiste;
      materialDaTela.quantidade = materialComIdIgualAoDaTela?.quantidade || 0;
    });
  }

  public adicionarMaterial() {
    this.receitaService.selecionados = [];
    this.listaMateriais.forEach(material => {
      if (material.selecionado) {
        this.receitaService.selecionados?.push(material);

      }
    });

    this.router.navigate(['/receita/criar-receita']);
  }

}
