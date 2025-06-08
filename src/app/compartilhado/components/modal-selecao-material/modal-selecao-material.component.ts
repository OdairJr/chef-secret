import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Material } from 'src/app/models/material.model';
import { ProdutosService } from 'src/app/modulos/produtos/services/produtos.service';

@Component({
  selector: 'app-modal-selecao-material',
  templateUrl: './modal-selecao-material.component.html',
  styleUrls: ['./modal-selecao-material.component.css'],
})
export class ModalSelecaoMaterialComponent {
  public mostrarModal: boolean = false;
  materiais: Material[] = [];
  materiaisFiltrados: Material[] = [];
  busca: string = '';

  @Output() materialSelecionado = new EventEmitter<Material>();
  @Output() fecharModal = new EventEmitter<void>();

  constructor(private produtosService: ProdutosService) {}

  public abrirModal() {
    this.produtosService.listarProdutos().subscribe((materiais) => {
      this.materiais = materiais;
      this.materiaisFiltrados = materiais;
      this.mostrarModal = true;
    });
  }

  filtrarMateriais(): void {
    const termo = this.busca.toLowerCase();
    this.materiaisFiltrados = this.materiais.filter((material) =>
      material.nome.toLowerCase().includes(termo)
    );
  }

  selecionarMaterial(material: Material) {
    this.mostrarModal = false;
    this.materialSelecionado.emit(material);
  }

  fechar() {
    this.mostrarModal = false;
    this.fecharModal.emit();
  }
}
