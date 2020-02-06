import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalSelectorPageComponent } from './arrival-selector-page.component';

describe('ArrivalSelectorPageComponent', () => {
  let component: ArrivalSelectorPageComponent;
  let fixture: ComponentFixture<ArrivalSelectorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrivalSelectorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalSelectorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
