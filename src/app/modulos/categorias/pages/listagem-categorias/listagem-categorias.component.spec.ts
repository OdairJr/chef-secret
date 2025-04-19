import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCategoriasComponent } from './listagem-categorias.component';

describe('ListagemCategoriasComponent', () => {
  let component: ListagemCategoriasComponent;
  let fixture: ComponentFixture<ListagemCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListagemCategoriasComponent]
    });
    fixture = TestBed.createComponent(ListagemCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
