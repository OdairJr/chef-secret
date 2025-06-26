import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaDeComprasService } from '../../services/lista-de-compras.service';
import { ListaDeCompras } from 'src/app/models/lista-de-compras.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DetalheProdutoEventoCompra, EventoCompra } from '../../models/evento-compra.model';
import { ImagensService } from 'src/app/core/services/imagens.service';
import { Imagem } from 'src/app/models/imagem.model';
import { forkJoin } from 'rxjs';
import { HistoricoCompraService } from 'src/app/core/services/historico-compra.service';
import { API_ENDPOINTS } from 'src/app/config/api.config';

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
  imagemNotaFiscal?: Imagem;
  historicosProdutos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private listaDeComprasService: ListaDeComprasService,
    private fb: FormBuilder,
    private imagensService: ImagensService,
    private historicoCompraService: HistoricoCompraService
  ) {}

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
        (this.listaDeCompras.itens
          ?.map((item, index) => {
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
          })
          .filter((detalhe) => detalhe !== null) as DetalheProdutoEventoCompra[]) || [];

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
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image_file', file);
      formData.append('nome_arquivo', file.name);
      formData.append('id_tipo_imagem', '3');
      formData.append('is_publico', '1');

      this.imagensService.criarImagem(formData).subscribe({
        next: (imagem) => {
          // this.imagemNotaFiscal = imagem;
          this.notaFiscalPreview = `/backend/api/imagens/${imagem.imagem.id}/view`;

          const imagemId = imagem.imagem.id;

          this.imagensService.viewImagem(imagemId).subscribe({
            next: (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                this.notaFiscalPreview = reader.result;
              };
              reader.readAsDataURL(blob);
            },
            error: (err) => {
              console.error('Erro ao carregar imagem autenticada:', err);
            },
          });

          // Verifica se há idProdutosHistorico no retorno
          if (imagem.resultadoProcessamentoCupom?.idProdutosHistorico?.length) {
            const ids: number[] = imagem.resultadoProcessamentoCupom.idProdutosHistorico;
            // Busca o histórico de cada produto
            forkJoin(ids.map((id) => this.historicoCompraService.obterHistoricoCompraPorId(id))).subscribe({
              next: (historicos) => {
                this.historicosProdutos = historicos;
                // Atualiza os valores do formulário com base no histórico retornado
                historicos.forEach((historico) => {
                  // Procura o índice do item na lista de compras pelo id_produto
                  const index = this.listaDeCompras?.itens?.findIndex((item) => item.produto?.id === Number(historico.id_produto));
                  if (index !== undefined && index !== -1) {
                    // Atualiza os campos do formulário
                    this.formLista.get(`preco_${index}`)?.setValue(Number(historico.preco_unitario));
                    this.formLista.get(`desconto_${index}`)?.setValue(Number(historico.desconto));
                  }
                });
                console.log('Históricos dos produtos:', historicos);
              },
              error: (err) => {
                console.error('Erro ao buscar históricos dos produtos:', err);
              },
            });
          }
        },
        error: (err) => {
          console.error('Erro ao fazer upload da nota fiscal:', err);
        },
      });
    }
  }

  private inicializarFormulario(): void {
  const grupo: { [key: string]: FormControl } = {};

  // Inicializa todos os campos necessários
  this.listaDeCompras?.itens?.forEach((item, index) => {
    grupo[`selecionado_${index}`] = new FormControl(item.comprado);
    grupo[`desconto_${index}`] = new FormControl(0, [Validators.required, Validators.min(0)]);
    grupo[`preco_${index}`] = new FormControl(0, [Validators.required, Validators.min(0)]); // já adiciona o campo preco
  });

  this.formLista = this.fb.group(grupo);

  // Busca o preço padrão de cada produto via API e atualiza o form
  if (this.listaDeCompras?.itens?.length) {
    const requisicoes = this.listaDeCompras.itens.map((item, index) =>
      this.historicoCompraService
        .opterPrecoPadraoPorId(item.produto?.id!)
        .toPromise()
        .then((res: any) => ({
          index,
          precoPadrao: Number(res?.preco_unitario) || 0,
        }))
        .catch(() => ({ index, precoPadrao: 0 }))
    );

    Promise.all(requisicoes).then((results) => {
      results.forEach(({ index, precoPadrao }) => {
        this.formLista.get(`preco_${index}`)?.setValue(precoPadrao);
      });
    });
  }
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
