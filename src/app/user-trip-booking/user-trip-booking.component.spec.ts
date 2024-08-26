import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTripBookingComponent } from './user-trip-booking.component';

describe('UserTripBookingComponent', () => {
  let component: UserTripBookingComponent;
  let fixture: ComponentFixture<UserTripBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTripBookingComponent]
    });
    fixture = TestBed.createComponent(UserTripBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

