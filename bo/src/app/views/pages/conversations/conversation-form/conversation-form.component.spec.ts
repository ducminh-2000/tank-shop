import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationFormComponent } from './conversation-form.component';

describe('ConversationFormComponent', () => {
  let component: ConversationFormComponent;
  let fixture: ComponentFixture<ConversationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
