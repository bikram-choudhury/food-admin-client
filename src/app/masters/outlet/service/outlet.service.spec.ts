import { TestBed, inject } from '@angular/core/testing';

import { OutletService } from './outlet.service';

describe('OutletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutletService]
    });
  });

  it('should ...', inject([OutletService], (service: OutletService) => {
    expect(service).toBeTruthy();
  }));
});
