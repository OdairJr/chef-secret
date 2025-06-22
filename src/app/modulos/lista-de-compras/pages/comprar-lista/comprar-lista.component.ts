import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaDeComprasService } from '../../services/lista-de-compras.service';
import { ListaDeCompras } from 'src/app/models/lista-de-compras.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    if (this.formLista.valid) {
      const dadosLista = this.listaDeCompras?.itens?.map((item, index) => ({
        nome: item.produto?.nome,
        selecionado: this.formLista.get(`selecionado_${index}`)?.value,
        preco: this.formLista.get(`preco_${index}`)?.value,
      }));

      console.log('Dados para salvar:', {
        nomeLista: this.listaDeCompras?.nome_lista,
        itens: dadosLista,
        notaFiscal: this.notaFiscalPreview,
      });

      // Aqui você pode enviar os dados para a API, etc.
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
