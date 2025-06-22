import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeMedidaDropdownComponent } from './unidade-medida-dropdown.component';

describe('UnidadeMedidaDropdownComponent', () => {
  let component: UnidadeMedidaDropdownComponent;
  let fixture: ComponentFixture<UnidadeMedidaDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadeMedidaDropdownComponent]
    });
    fixture = TestBed.createComponent(UnidadeMedidaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
