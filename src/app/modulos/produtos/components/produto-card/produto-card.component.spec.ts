import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCardComponent } from './produto-card.component';

describe('ProdutoCardComponent', () => {
  let component: ProdutoCardComponent;
  let fixture: ComponentFixture<ProdutoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCardComponent]
    });
    fixture = TestBed.createComponent(ProdutoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
