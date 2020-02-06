import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalTimeslotMobileComponent } from './arrival-timeslot-mobile.component';

describe('ArriavalTimeslotMobileComponent', () => {
   let component: ArrivalTimeslotMobileComponent;
   let fixture: ComponentFixture<ArrivalTimeslotMobileComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ArrivalTimeslotMobileComponent]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ArrivalTimeslotMobileComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
