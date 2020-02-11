import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalTimeslotButtonComponent } from './arrival-timeslot-button.component';

describe('ArriavalTimeslotButtonComponent', () => {
   let component: ArrivalTimeslotButtonComponent;
   let fixture: ComponentFixture<ArrivalTimeslotButtonComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ArrivalTimeslotButtonComponent]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ArrivalTimeslotButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
