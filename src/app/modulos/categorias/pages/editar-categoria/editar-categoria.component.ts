import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss']
})
export class EditarCategoriaComponent implements OnInit {
  formulario!: FormGroup;
  categoriaId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]]
    });
    this.carregarCategoria();
  }

  private carregarCategoria(): void {
    this.categoriaService.obterCategoriaPorId(this.categoriaId).subscribe((categoria) => {
      if (categoria) {
        this.formulario.patchValue(categoria);
      }
    });
  }

  public salvarCategoria(): void {
    if (this.formulario.valid) {
      const categoriaAtualizada: Categoria = {
        id: this.categoriaId,
        ...this.formulario.value
      };
      this.categoriaService.editarCategoria(categoriaAtualizada).subscribe(() => {
        this.router.navigate(['/categorias']);
      });
    }
  }
}
