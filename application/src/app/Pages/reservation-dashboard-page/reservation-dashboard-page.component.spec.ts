import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDashboardPageComponent } from './reservation-dashboard-page.component';

describe('ReservationDashboardPageComponent', () => {
  let component: ReservationDashboardPageComponent;
  let fixture: ComponentFixture<ReservationDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationDashboardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
