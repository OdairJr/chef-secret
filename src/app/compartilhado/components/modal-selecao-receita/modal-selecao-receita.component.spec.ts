import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelecaoReceitaComponent } from './modal-selecao-receita.component';

describe('ModalSelecaoReceitaComponent', () => {
  let component: ModalSelecaoReceitaComponent;
  let fixture: ComponentFixture<ModalSelecaoReceitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSelecaoReceitaComponent]
    });
    fixture = TestBed.createComponent(ModalSelecaoReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
