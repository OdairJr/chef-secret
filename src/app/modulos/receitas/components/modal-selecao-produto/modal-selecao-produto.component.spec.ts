import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelecaoProdutoComponent } from './modal-selecao-produto.component';

describe('ModalSelecaoProdutoComponent', () => {
  let component: ModalSelecaoProdutoComponent;
  let fixture: ComponentFixture<ModalSelecaoProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSelecaoProdutoComponent]
    });
    fixture = TestBed.createComponent(ModalSelecaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
