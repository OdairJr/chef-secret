import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalhesProdutoComponent } from './modal-detalhes-produto.component';

describe('ModalDetalhesProdutoComponent', () => {
  let component: ModalDetalhesProdutoComponent;
  let fixture: ComponentFixture<ModalDetalhesProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetalhesProdutoComponent]
    });
    fixture = TestBed.createComponent(ModalDetalhesProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
