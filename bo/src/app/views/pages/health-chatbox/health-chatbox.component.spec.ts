import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthChatboxComponent } from './health-chatbox.component';

describe('HealthChatboxComponent', () => {
  let component: HealthChatboxComponent;
  let fixture: ComponentFixture<HealthChatboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthChatboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
