import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPrecosComponent } from './historico-precos.component';

describe('HistoricoPrecosComponent', () => {
  let component: HistoricoPrecosComponent;
  let fixture: ComponentFixture<HistoricoPrecosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoPrecosComponent]
    });
    fixture = TestBed.createComponent(HistoricoPrecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
