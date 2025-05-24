import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemReceitasComponent } from './listagem-receitas.component';

describe('ListagemReceitasComponent', () => {
  let component: ListagemReceitasComponent;
  let fixture: ComponentFixture<ListagemReceitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListagemReceitasComponent]
    });
    fixture = TestBed.createComponent(ListagemReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
