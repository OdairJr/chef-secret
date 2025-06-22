import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaDeComprasService } from '../../services/lista-de-compras.service';
import { ListaDeCompras } from 'src/app/models/lista-de-compras.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DetalheProdutoEventoCompra, EventoCompra } from '../../models/evento-compra.model';

@Component({
  selector: 'app-comprar-lista',
  templateUrl: './comprar-lista.component.html',
  styleUrls: ['./comprar-lista.component.scss'],
})
export class ComprarListaComponent implements OnInit {
  listaDeCompras?: ListaDeCompras;
  carregando = true;
  erro: string | null = null;
  formLista!: FormGroup;
  notaFiscalPreview: string | ArrayBuffer | null = null;

  constructor(private route: ActivatedRoute, private listaDeComprasService: ListaDeComprasService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.carregarLista(id);
      } else {
        this.erro = 'ID da lista não informado.';
        this.carregando = false;
      }
    });
  }

  onSubmit(): void {
    if (this.formLista.valid && this.listaDeCompras) {
      const detalhes_produtos: DetalheProdutoEventoCompra[] =
        this.listaDeCompras.itens?.map((item, index) => {
          const selecionado = this.formLista.get(`selecionado_${index}`)?.value;
          if (!selecionado) {
            return null;
          }
          if (item.produto?.id === undefined) {
            throw new Error(`Produto sem ID no índice ${index}`);
          }
          return {
            id_produto: item.produto.id,
            preco_unitario: this.formLista.get(`preco_${index}`)?.value,
            desconto: this.formLista.get(`desconto_${index}`)?.value || 0,
          };
        }).filter((detalhe) => detalhe !== null) as DetalheProdutoEventoCompra[] || [];

      const eventoCompra: EventoCompra = {
        id_lista_compra: Number(this.listaDeCompras.id),
        detalhes_produtos,
      };

      this.listaDeComprasService.registrarEventoCompra(eventoCompra).subscribe({
        next: () => {
          // Sucesso: redirecione ou mostre mensagem
          console.log('Evento de compra registrado com sucesso!');
        },
        error: (err) => {
          // Erro: trate conforme necessário
          console.error('Erro ao registrar evento de compra:', err);
        },
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.notaFiscalPreview = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  private inicializarFormulario(): void {
    const grupo: { [key: string]: FormControl } = {};

    this.listaDeCompras?.itens?.forEach((item, index) => {
      grupo[`selecionado_${index}`] = new FormControl(item.comprado);
      grupo[`preco_${index}`] = new FormControl(item.produto?.preco_padrao, [Validators.required, Validators.min(0)]);
      grupo[`desconto_${index}`] = new FormControl(item.produto?.preco_padrao, [Validators.required, Validators.min(0)]);
    });

    this.formLista = this.fb.group(grupo);
  }

  private carregarLista(id: string): void {
    this.carregando = true;
    this.listaDeComprasService.buscarListaPorId(id).subscribe({
      next: (lista) => {
        this.listaDeCompras = lista;
        this.carregando = false;
        this.inicializarFormulario();
      },
      error: (err) => {
        this.erro = 'Erro ao carregar a lista de compras.';
        this.carregando = false;
      },
    });
  }
}
