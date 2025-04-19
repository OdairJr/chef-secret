import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent {
  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  public salvarCategoria(): void {
    if (this.formulario.valid) {
      this.categoriaService.criarCategoria(this.formulario.value).subscribe(() => {
        this.router.navigate(['/categorias']);
      });
    }
  }
}
