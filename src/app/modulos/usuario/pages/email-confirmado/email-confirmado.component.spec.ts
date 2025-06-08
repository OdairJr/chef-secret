import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmadoComponent } from './email-confirmado.component';

describe('EmailConfirmadoComponent', () => {
  let component: EmailConfirmadoComponent;
  let fixture: ComponentFixture<EmailConfirmadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailConfirmadoComponent]
    });
    fixture = TestBed.createComponent(EmailConfirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
