import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArrivalPointComponent } from './update-arrival-point.component';

describe('UpdateArrivalPointComponent', () => {
  let component: UpdateArrivalPointComponent;
  let fixture: ComponentFixture<UpdateArrivalPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateArrivalPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateArrivalPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
