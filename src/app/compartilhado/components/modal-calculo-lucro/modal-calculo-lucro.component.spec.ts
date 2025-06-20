import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCalculoLucroComponent } from './modal-calculo-lucro.component';

describe('ModalCalculoLucroComponent', () => {
  let component: ModalCalculoLucroComponent;
  let fixture: ComponentFixture<ModalCalculoLucroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCalculoLucroComponent]
    });
    fixture = TestBed.createComponent(ModalCalculoLucroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
