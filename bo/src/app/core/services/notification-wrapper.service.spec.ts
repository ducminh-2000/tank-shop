import { TestBed } from '@angular/core/testing';

import { NotificationWrapperService } from './notification-wrapper.service';

describe('NotificationWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationWrapperService = TestBed.get(NotificationWrapperService);
    expect(service).toBeTruthy();
  });
});
