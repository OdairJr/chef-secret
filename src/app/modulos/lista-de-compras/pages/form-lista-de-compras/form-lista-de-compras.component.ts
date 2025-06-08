import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaDeComprasService } from '../../services/lista-de-compras.service';
import { ItemDaLista } from 'src/app/models/itens-da-lista.model';
import { Material } from 'src/app/models/material.model';

@Component({
  selector: 'app-form-lista-de-compras',
  templateUrl: './form-lista-de-compras.component.html',
  styleUrls: ['./form-lista-de-compras.component.css'],
})
export class FormListaDeComprasComponent implements OnInit {
  formularioCompras!: FormGroup;
  listaDeItensCriados: ItemDaLista[] = [];
  listaId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private listaDeComprasService: ListaDeComprasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioCompras = this.formBuilder.group({
      nomeLista: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.listaId = params['id'] || null;
      if (this.listaId) {
        this.carregarLista(this.listaId);
      }
    });
  }

  private carregarLista(id: string): void {
    this.listaDeComprasService.buscarListaPorId(id).subscribe((lista) => {
      if (lista) {
        this.formularioCompras.patchValue({ nomeLista: lista.nomeLista });
        this.listaDeItensCriados = lista.itens || [];
      }
    });
  }

  public salvarLista(): void {
    if (this.listaId) {
      this.listaDeComprasService
        .atualizarLista(this.listaId, {
          nomeLista: this.formularioCompras.value.nomeLista,
          itens: this.listaDeItensCriados,
        })
        .subscribe(() => {
          this.router.navigate(['/compras']);
        });
    } else {
      this.listaDeComprasService
        .criarLista({
          nomeLista: this.formularioCompras.value.nomeLista,
          itens: this.listaDeItensCriados,
        })
        .subscribe(() => {
          this.router.navigate(['/compras']);
        });
    }
  }

  public removerItem(index: number): void {
    this.listaDeItensCriados.splice(index, 1);
  }

  public adicionarItem(item: ItemDaLista): void {
    this.listaDeItensCriados.push(item);
  }

  onSelecionarMaterial(material: Material) {
    this.adicionarItem({
      materialRelacionado: material,
      quantidade: 0,
      valor: 0,
    });
  }

  cancelar(): void {
    this.router.navigate(['/lista-de-compras']);
  }
}
