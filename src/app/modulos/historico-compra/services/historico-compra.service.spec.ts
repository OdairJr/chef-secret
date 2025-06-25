import { TestBed } from '@angular/core/testing';

import { HistoricoCompraService } from './historico-compra.service';

describe('HistoricoCompraService', () => {
  let service: HistoricoCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
