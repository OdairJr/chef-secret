import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarListaDeComprasComponent } from './listar-lista-de-compras.component';

describe('ListarListaDeComprasComponent', () => {
  let component: ListarListaDeComprasComponent;
  let fixture: ComponentFixture<ListarListaDeComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarListaDeComprasComponent]
    });
    fixture = TestBed.createComponent(ListarListaDeComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
