import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfOriginSelectorComponent } from './point-of-origin-selector.component';

describe('PointOfOriginSelectorComponent', () => {
  let component: PointOfOriginSelectorComponent;
  let fixture: ComponentFixture<PointOfOriginSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointOfOriginSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointOfOriginSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
