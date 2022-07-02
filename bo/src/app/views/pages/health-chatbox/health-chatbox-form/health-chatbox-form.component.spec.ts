import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthChatboxFormComponent } from './health-chatbox-form.component';

describe('HealthChatboxFormComponent', () => {
  let component: HealthChatboxFormComponent;
  let fixture: ComponentFixture<HealthChatboxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthChatboxFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthChatboxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
