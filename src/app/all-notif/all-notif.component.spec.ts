import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotifComponent } from './all-notif.component';

describe('AllNotifComponent', () => {
  let component: AllNotifComponent;
  let fixture: ComponentFixture<AllNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllNotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
