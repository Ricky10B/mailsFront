import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMailMessageComponent } from './single-mail-message.component';

describe('SingleMailMessageComponent', () => {
  let component: SingleMailMessageComponent;
  let fixture: ComponentFixture<SingleMailMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMailMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMailMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
