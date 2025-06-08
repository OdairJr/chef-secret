import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaDeComprasService } from '../../services/lista-de-compras.service';
import { ListaDeCompras } from 'src/app/models/lista-de-compras.model';

@Component({
  selector: 'app-comprar-lista',
  templateUrl: './comprar-lista.component.html',
  styleUrls: ['./comprar-lista.component.css'],
})
export class ComprarListaComponent implements OnInit {
  listaDeCompras?: ListaDeCompras;
  itensComprados: { [id: string]: boolean } = {};
  imagemNotaFiscal: string | ArrayBuffer | null = null;

  valoresMateriais: { [id: string]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private listaDeComprasService: ListaDeComprasService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.listaDeComprasService
          .buscarListaPorId(id)
          .subscribe((lista) => {
            this.listaDeCompras = lista;
            if (lista?.itens) {
              lista.itens.forEach((item) => {
                this.itensComprados[item.materialRelacionado.id] = false;
              });
            }
          });
      }
    });
  }

  onNotaFiscalChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagemNotaFiscal = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
