import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListaDeComprasComponent } from './form-lista-de-compras.component';

describe('FormListaDeComprasComponent', () => {
  let component: FormListaDeComprasComponent;
  let fixture: ComponentFixture<FormListaDeComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormListaDeComprasComponent]
    });
    fixture = TestBed.createComponent(FormListaDeComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
