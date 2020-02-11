import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalPointInstructionsComponent } from './arrival-point-instructions.component';

describe('ArrivalPointInstructionsComponent', () => {
  let component: ArrivalPointInstructionsComponent;
  let fixture: ComponentFixture<ArrivalPointInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrivalPointInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalPointInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
