import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalDateSelectorComponent } from './arrival-date-selector.component';

describe('ArrivalDateSelectorComponent', () => {
   let component: ArrivalDateSelectorComponent;
   let fixture: ComponentFixture<ArrivalDateSelectorComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ArrivalDateSelectorComponent]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ArrivalDateSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
